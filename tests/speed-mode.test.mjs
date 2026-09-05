import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const source = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
function extract(name) {
  const start = source.indexOf(`function ${name}(`);
  const end = source.indexOf('\nfunction ', start + 1);
  return source.slice(start, end);
}

test('speed answers: wrong stays, correct advances once, no equipped geometry', () => {
  const buttons = ['wrong', 'correct'].map(category => ({ dataset: { category }, disabled: false, setAttribute() {} }));
  let transitions = 0;
  const state = { speedMode: true, levelIndex: 0, levelLoadToken: 7, speedAttempts: 0, speedCorrect: 0, score: 0, equipped: false };
  const context = vm.createContext({
    state, levels: [{ correctCategory: 'correct', exerciseNumber: 1 }],
    document: { querySelectorAll: () => buttons },
    $: () => ({}), playCheckShot() {}, playMissSound() {}, pulse() {},
    feedback() {}, t: key => key, updatePlayerRun() {}, nextLevel() {},
    continueAfterCorrectSpeech() { transitions += 1; }
  });
  vm.runInContext(extract('recordSpeedCorrect') + extract('answerSpeedChoice'), context);
  context.answerSpeedChoice(buttons[0]);
  assert.equal(state.speedAttempts, 1);
  assert.equal(state.speedCorrect, 0);
  assert.equal(transitions, 0);
  assert.ok(!state.solved);
  context.answerSpeedChoice(buttons[1]);
  context.answerSpeedChoice(buttons[1]);
  assert.equal(state.speedAttempts, 2);
  assert.equal(state.speedCorrect, 1);
  assert.equal(transitions, 1);
  assert.equal(state.equipped, false);
  assert.equal(state.firstChoiceCorrect, false);
  assert.equal(state.score, 100);
  assert.ok(buttons.every(button => button.disabled));
});

test('manual placement and check are no-ops in speed mode', () => {
  const context = vm.createContext({ state: { speedMode: true } });
  vm.runInContext(extract('placeSelected') + extract('check'), context);
  context.placeSelected({ x: 10, y: 10 });
  context.check();
});

test('mechanical sounds follow actual movement, stay silent on redraw and solved state', () => {
  const calls = [];
  const state = { equipped: true, solved: false, piece: { x: 0, y: 0, rotation: 0, mirrored: false }, degrees: 45, dimensions: { arm: 100 }, quadDimensions: { width: 100, height: 100 }, category: 'acute', levelLoadToken: 1 };
  const context = vm.createContext({ state, playMotionSound: (...args) => calls.push(args) });
  vm.runInContext('let previousPieceSound = null;\n' + extract('trackPieceMotionSound'), context);
  context.trackPieceMotionSound();
  context.trackPieceMotionSound();
  assert.equal(calls.length, 0);
  state.piece.x = 12;
  context.trackPieceMotionSound();
  state.piece.rotation = 15;
  context.trackPieceMotionSound();
  state.dimensions.arm = 110;
  context.trackPieceMotionSound();
  state.degrees = 60;
  context.trackPieceMotionSound();
  state.piece.mirrored = true;
  context.trackPieceMotionSound();
  assert.deepEqual(calls.map(call => call[0]), ['move', 'rotate', 'size', 'angle', 'flip']);
  state.solved = true;
  state.piece.x = 80;
  context.trackPieceMotionSound();
  assert.equal(calls.length, 5);
});

test('mechanical sound respects mute and limits repeated audio bursts', () => {
  const calls = [];
  const audio = { state: 'running', currentTime: 1, destination: {}, createGain: () => ({ connect() {}, gain: { setValueAtTime() {} } }) };
  let muted = true;
  const context = vm.createContext({ activeEffectsContext: () => muted ? null : audio, document: { hidden: false }, speechState: {}, window: {}, noiseBurst: () => calls.push('noise'), toneHit: () => calls.push('tone') });
  vm.runInContext('let motionGain = null; let lastMotionSoundAt = -Infinity;\n' + extract('playMotionSound'), context);
  context.playMotionSound('move');
  assert.equal(calls.length, 0);
  muted = false;
  context.playMotionSound('move');
  context.playMotionSound('move');
  assert.equal(calls.length, 2);
  audio.currentTime += .06;
  context.playMotionSound('move');
  assert.equal(calls.length, 4);
});

test('first-attempt tally counts exercises, not retries', () => {
  const state = { speedMode: true, speedCorrect: 0, speedFirstCorrect: 0, firstChoiceCorrect: false };
  const context = vm.createContext({ state });
  vm.runInContext(extract('recordSpeedCorrect'), context);
  context.recordSpeedCorrect();
  state.firstChoiceCorrect = true;
  context.recordSpeedCorrect();
  assert.equal(state.speedFirstCorrect, 1);
  assert.equal(state.speedCorrect, 2);
});

test('both quick stages stop at results without advancing the level', () => {
  for (const speedMode of [true, false]) {
    let summaries = 0;
    const state = { speedMode, levelIndex: 0 };
    const context = vm.createContext({ state,
      levels: [{ phase: speedMode ? 'master' : 'triangle-lines', exerciseNumber: 10, exerciseCount: 10 }],
      showSpeedResults() { summaries++; }
    });
    vm.runInContext(extract('nextLevel'), context);
    context.nextLevel();
    assert.equal(summaries, 1);
    assert.equal(state.levelIndex, 0);
  }
});

test('bisector arcs follow the short interior angle in either direction', () => {
  const context = vm.createContext({});
  vm.runInContext(extract('polar') + extract('arcBetweenPath'), context);
  assert.match(context.arcBetweenPath({x: 0, y: 0}, 48, 130, 90), /A 48 48 0 0 0 /);
  assert.match(context.arcBetweenPath({x: 0, y: 0}, 48, 90, 130), /A 48 48 0 0 1 /);
});

test('tutorial changes aperture without changing ray length and preserves pauses', () => {
  const context = vm.createContext({});
  vm.runInContext(extract('polar') + extract('tutorialPose') + extract('tutorialContact'), context);
  const before = context.tutorialPose(16000);
  const after = context.tutorialPose(19000);
  assert.equal(before.degrees, 45);
  assert.equal(after.degrees, 105);
  assert.equal(before.active, false);
  assert.equal(after.active, false);
  for (const pose of [before, after]) {
    const contact = context.tutorialContact(pose, context.polar(62, -pose.degrees));
    assert.ok(Math.abs(Math.hypot(contact.x - pose.x, contact.y - pose.y) - 62) < 1e-8);
  }
});

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

test('heatmap records first-choice accuracy per player, stage and practiced concept', () => {
  let player = {};
  let saves = 0;
  const state = { levelIndex: 0, speedMode: false };
  const level = { correctCategory: 'acute' };
  const context = vm.createContext({ state, levels: [level], activePlayer: () => player,
    courseSectionForLevel: () => 'primitives', persistPlayerStore: () => saves++ });
  vm.runInContext(extract('recordPracticeChoice'), context);
  context.recordPracticeChoice({ disabled: true, dataset: { category: 'acute' } });
  assert.equal(saves, 0);
  context.recordPracticeChoice({ dataset: { category: 'obtuse' } });
  context.recordPracticeChoice({ dataset: { category: 'acute' } });
  assert.equal(player.practiceHeatmap.primitives.acute.practiced, 1);
  assert.equal(player.practiceHeatmap.primitives.acute.correct, 0);
  state.heatmapRecorded = false;
  context.recordPracticeChoice({ dataset: { category: 'acute' } });
  assert.equal(player.practiceHeatmap.primitives.acute.correct, 1);
  assert.equal(player.practiceHeatmap.primitives.acute.practiced, 2);
  state.heatmapRecorded = false;
  state.speedMode = true;
  context.recordPracticeChoice({ dataset: { category: 'acute' } });
  assert.equal(player.practiceHeatmap.speed.acute.correct, 1);
  player = {};
  state.heatmapRecorded = false;
  context.recordPracticeChoice({ dataset: { category: 'acute' } });
  assert.equal(player.practiceHeatmap.speed.acute.practiced, 1);
  assert.ok(!player.practiceHeatmap.primitives);
});

test('Hebrew problem terms use fixed synthesized audio, not iPad speech', () => {
  const context = vm.createContext({ recordedSpeechFiles: { 'חדה': 'acute.mp3' } });
  vm.runInContext(extract('recordedSpeechFile'), context);
  assert.equal(context.recordedSpeechFile('גובה', 'he'), 'altitude-ready.mp3');
  assert.equal(context.recordedSpeechFile('חוצה צלע', 'he'), 'side-bisector-ready.mp3');
  assert.equal(context.recordedSpeechFile('גובה', 'en'), undefined);
  assert.equal(context.recordedSpeechFile('חדה', 'he'), 'acute.mp3');
  for (const name of ['altitude-ready.mp3', 'side-bisector-ready.mp3']) {
    const original = readFileSync(new URL(`../audio/he/${name}`, import.meta.url));
    assert.ok(original.length > 1000);
    assert.deepEqual(original, readFileSync(new URL(`../public/legacy/audio/he/${name}`, import.meta.url)));
  }
});

test('given angle label follows its arc bisector rather than a fixed location', () => {
  const nodes = [];
  const context = vm.createContext({ sceneLayer: { append: node => nodes.push(node) },
    svgEl: (tag, attrs, text) => ({ tag, attrs, text }),
    normalizeSignedAngle: angle => ((angle + 540) % 360) - 180 });
  vm.runInContext(extract('polar') + extract('arcBetweenPath') + extract('drawGivenAngle'), context);
  for (const missing of [20, 90, 160]) {
    nodes.length = 0;
    context.drawGivenAngle({x: 360, y: 220}, -180, -missing, 180 - missing, 52);
    assert.equal(nodes[0].attrs.class, 'given-arc');
    assert.equal(nodes[1].text, `${180 - missing}°`);
    const actual = Math.atan2(nodes[1].attrs.y - 220, nodes[1].attrs.x - 360) * 180 / Math.PI;
    assert.ok(Math.abs(actual - (-180 - missing) / 2) < 1e-8);
  }
});

test('F tutorial preserves parallel arms and attaches controls to geometry', () => {
  const context = vm.createContext({});
  vm.runInContext(extract('polar') + extract('tutorialPose') + extract('mouseFTutorialGeometry'), context);
  for (const time of [0, 6000, 10000, 14000, 18000, 20000]) {
    const pose = context.tutorialPose(time);
    const geometry = context.mouseFTutorialGeometry(pose);
    assert.equal(geometry.top.y, geometry.topEnd.y);
    assert.ok(Math.abs(geometry.topEnd.x - geometry.top.x - 100) < 1e-8);
    assert.ok(Math.abs(Math.hypot(geometry.angle.x, geometry.angle.y) - 62) < 1e-8);
    assert.equal(geometry.height.x, geometry.top.x * .72);
    assert.equal(geometry.height.y, geometry.top.y * .72);
  }
});

test('supplementary and triangle targets cover acute, right, and obtuse geometry', () => {
  const context = vm.createContext({ classifyAngle: d => d < 90 ? 'acute' : d === 90 ? 'right' : 'obtuse' });
  vm.runInContext(extract('prepareDynamicLevel'), context);
  for (const scene of ['adjacent', 'triangle']) {
    const types = new Set();
    for (let i = 0; i < 300; i++) {
      vm.runInContext(`Math.random = () => ${(i + .5) / 300}`, context);
      const level = { scene };
      context.prepareDynamicLevel(level);
      const target = level.choices[0];
      types.add(target.subtitle);
      assert.equal(target.id, level.correctChoice);
      assert.ok(target.degrees >= 20 && target.degrees <= 160);
      if (scene === 'triangle') {
        assert.equal(level.triangleAngles.reduce((a, b) => a + b, 0), 180);
        assert.equal(level.triangleAngles[2], target.degrees);
        assert.ok(level.triangleAngles.every(degrees => degrees > 0 && degrees < 180));
      }
    }
    assert.deepEqual([...types].sort(), ['acute', 'obtuse', 'right']);
  }
});

test('vertical and alternate-angle snapping keeps the nearest half-turn orientation', () => {
  const state = { piece: { rotation: 178 } };
  const normalizeAngle = angle => (angle % 360 + 360) % 360;
  const context = vm.createContext({ state, normalizeAngle, toolMarkerRotation: () => 0,
    angleDistance: (a, b) => Math.abs(((a - b + 540) % 360) - 180) });
  vm.runInContext(extract('placementRotationForTarget'), context);
  assert.equal(context.placementRotationForTarget('קודקודיות', 60, 0, false), 180);
  assert.equal(context.placementRotationForTarget('מתחלפות', 60, 0, false), 180);
  assert.equal(context.placementRotationForTarget('מתחלפות', 60, 0, true), 180);
  state.piece.rotation = 358;
  assert.equal(context.placementRotationForTarget('קודקודיות', 60, 0, false), 0);
  assert.equal(context.placementRotationForTarget('מתחלפות', 60, 0, false), 0);
  assert.equal(context.placementRotationForTarget('קודקודיות', 60, 0, true), 0);
  state.piece.rotation = 178;
  assert.equal(context.placementRotationForTarget('מתאימות', 60, 0, false), 0);
});

test('master probabilities are 10% primitives, 10% triangle, 20% each relationship', () => {
  const primitiveTemplates = ['acute', 'right', 'flat', 'obtuse'].map(correctCategory => ({ correctCategory }));
  const allTemplates = [...primitiveTemplates, ...['משולש', 'מתאימות', 'מתחלפות', 'קודקודיות', 'צמודות'].map(correctCategory => ({ correctCategory }))];
  const context = vm.createContext({ primitiveTemplates, allTemplates });
  vm.runInContext(extract('chooseMasterTemplate').split('\nconst masterPractice')[0], context);
  const counts = {};
  for (let i = 0; i < 1000; i++) {
    let draw = 0;
    const result = context.chooseMasterTemplate(() => draw++ === 0 ? (i + .5) / 1000 : .5);
    const key = primitiveTemplates.includes(result) ? 'primitives' : result.correctCategory;
    counts[key] = (counts[key] || 0) + 1;
  }
  assert.deepEqual(counts, { primitives: 100, 'משולש': 100, 'מתאימות': 200, 'מתחלפות': 200, 'קודקודיות': 200, 'צמודות': 200 });
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

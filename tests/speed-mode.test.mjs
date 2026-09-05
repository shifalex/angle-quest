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

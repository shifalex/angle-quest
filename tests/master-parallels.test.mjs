import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const source = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
function extract(name) {
  const start = source.indexOf(`function ${name}(`);
  return source.slice(start, source.indexOf('\nfunction ', start + 1));
}

test('Master triangles, vertical and adjacent pairs always use parallels without random distractors', () => {
  const context = vm.createContext({});
  // Stop before the top-level event listeners following this function.
  vm.runInContext(extract('prepareProLevel').split('\n$("category-list")')[0], context);
  for (const scene of ['vertical', 'adjacent', 'triangle', 'primitive', 'alternate', 'corresponding']) {
    for (const mode of ['master', 'practice', 'tutorial']) {
      let count = 0;
      for (let i = 0; i < 100; i++) {
        vm.runInContext(`Math.random = () => ${(i + .5) / 100}`, context);
        const level = { scene, mode, target: { x: 360, y: 220 }, parallelContext: true };
        context.prepareProLevel(level);
        count += Number(level.parallelContext);
        if (['triangle', 'vertical', 'adjacent', 'corresponding'].includes(scene)) assert.equal(level.distractors.length, 0);
      }
      assert.equal(count, mode === 'master' && ['triangle', 'vertical', 'adjacent'].includes(scene) ? 100 : 0);
    }
  }
});

test('parallel scenes preserve the target and triangle vertices lie on the two lines', () => {
  const lines = [];
  const layer = { replaceChildren() {}, removeAttribute() {}, append() {} };
  const context = vm.createContext({ sceneLayer: layer, targetLayer: layer,
    line: (_layer, x1, y1, x2, y2) => lines.push({ x1, y1, x2, y2 }),
    svgEl: () => ({ append() {} }), drawGivenAngle() {}, label() {},
    renderDistractorLines() {}, applyProSceneTransform() {}, sectorPath() {},
    normalizeAngle: a => (a % 360 + 360) % 360,
    unit: a => ({ x: Math.cos(a * Math.PI / 180), y: Math.sin(a * Math.PI / 180) }) });
  vm.runInContext(extract('polar') + extract('renderScene'), context);
  for (const scene of ['vertical', 'adjacent', 'triangle', 'corresponding']) {
    for (const degrees of (scene === 'corresponding' ? [40, 60, 90, 130, 140] : [20, 60, 75, 90, 130, 160])) {
      lines.length = 0;
      const level = { scene, parallelContext: true, target: { x: 360, y: scene === 'corresponding' ? 280 : 220, rotation: 0 },
        choices: [{ id: 'target', degrees }], correctChoice: 'target',
        triangleAngles: [(180 - degrees) / 2, (180 - degrees) / 2] };
      context.renderScene(level);
      const first = lines[0], second = lines[scene === 'vertical' ? 2 : 1];
      const cross = (first.x2 - first.x1) * (second.y2 - second.y1)
        - (first.y2 - first.y1) * (second.x2 - second.x1);
      assert.ok(Math.abs(cross) < 1e-7, 'background lines must be parallel');
      if (scene === 'triangle') {
        assert.equal(lines[2].y1, first.y1);
        assert.equal(lines[3].y2, first.y1);
        assert.equal(lines[2].y2, second.y1);
        assert.equal(lines[3].y1, second.y1);
        assert.equal(level.target.y, second.y1);
      } else {
        assert.equal(level.target.x, 360);
        assert.equal(level.target.y, scene === 'corresponding' ? 280 : 220);
        const transversal = lines[scene === 'vertical' ? 1 : 2];
        for (const parallel of [first, second]) {
          const dx = transversal.x2 - transversal.x1, dy = transversal.y2 - transversal.y1;
          const px = parallel.x2 - parallel.x1, py = parallel.y2 - parallel.y1;
          const qx = parallel.x1 - transversal.x1, qy = parallel.y1 - transversal.y1;
          const denominator = dx * py - dy * px;
          const t = (qx * py - qy * px) / denominator;
          const u = (qx * dy - qy * dx) / denominator;
          assert.ok(t >= 0 && t <= 1 && u >= 0 && u <= 1,
            `${scene}: the visible transversal must cross both visible parallels`);
        }
      }
    }
  }
});

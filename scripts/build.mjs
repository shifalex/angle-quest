import { cp, mkdir, rm, writeFile } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist/server", { recursive: true });
await mkdir("dist/public", { recursive: true });

for (const file of ["index.html", "app.js", "styles.css"]) {
  await cp(file, `dist/public/${file}`);
}
await cp("audio", "dist/public/audio", { recursive: true });
await writeFile(
  "dist/server/index.js",
  `export default { async fetch(request, env) { return env.ASSETS.fetch(request); } };\n`
);

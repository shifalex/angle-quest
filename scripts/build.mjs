import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist/server", { recursive: true });
await mkdir("dist/public", { recursive: true });

for (const file of ["index.html", "app.js", "styles.css"]) {
  await cp(file, `dist/public/${file}`);
}
await cp("audio", "dist/public/audio", { recursive: true });
const embeddedFiles = {
  "/": { body: await readFile("index.html", "utf8"), type: "text/html; charset=utf-8" },
  "/index.html": { body: await readFile("index.html", "utf8"), type: "text/html; charset=utf-8" },
  "/app.js": { body: await readFile("app.js", "utf8"), type: "text/javascript; charset=utf-8" },
  "/styles.css": { body: await readFile("styles.css", "utf8"), type: "text/css; charset=utf-8" }
};

await writeFile(
  "dist/server/index.js",
  `const files = ${JSON.stringify(embeddedFiles)};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const file = files[url.pathname];
    if (file) return new Response(file.body, { headers: { "content-type": file.type } });
    return env.ASSETS.fetch(request);
  }
};\n`
);

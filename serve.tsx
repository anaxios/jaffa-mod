import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import type { FC } from "hono/jsx";
import { css, cx, keyframes, Style } from "hono/css";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { readdir } from "node:fs/promises";
import { html } from "hono/html";
import { $ } from "bun";
import Path from "path";
import { basicAuth } from "hono/basic-auth";
import { appendTrailingSlash } from "hono/trailing-slash";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { eq } from "drizzle-orm";
import { screenshots, usersTable } from "./db/schema";
import { blob } from "node:stream/consumers";

const client = createClient({ url: process.env.DB_FILE_NAME! });
const db = drizzle({ client });

const app = new Hono();

app.use(logger());
// // app.use("/", serveStatic({ path: "./website/index.html" }));
app.use("*", serveStatic({ root: "./website" }));
app.use("/modpack/*", serveStatic({ root: "./modpack" }));
// app.use(appendTrailingSlash());

app.get(
  "/favicon.ico",
  serveStatic({ path: "./website/assets/orange-minecraft.png" })
);
app.get("/oneko.gif", serveStatic({ path: "./website/oneko.gif" }));
const title = "Daedalist Server";
app.use(
  "*",
  jsxRenderer(
    ({ children }) => {
      return (
        <html lang="en">
          <head>
            <link
              rel="stylesheet"
              href="https://anaxios.github.io/css-reset/reset.css"
            />
            <link rel="stylesheet" href="/css/style.css" />
            <script src="/js/background-random.js"></script>

            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>{title}</title>
          </head>
          <body>{children}</body>
        </html>
      );
    },
    {
      docType:
        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">',
    }
  )
);

app.get("/", (c) => {
  return c.render(
    <div
      class="flex container bg-dark"
      style="  --font-family-base: Minecraft;
  --font-family-base-line-height: var(--l);
  --font-family-heading: Minecraft;
  --font-family-heading-line-height: var(--m);"
    >
      <script>backgroundRandom()</script>
      <div class="text-container glass flow text-dark ff-minecraft link">
        <h1
          class="rainbow-text fs-xxl ff-minecrafter"
          style="line-height: var(--xl);"
        >
          {title}
        </h1>
        <a href="/screenshots/">Screenshot Gallery</a>
        <h2 class="" id="installation">
          Installation
        </h2>
        <ol>
          <li>
            <h3>Download Prism Launcher</h3>
            <ul>
              <li>
                Go to
                <a style="padding: 0.6rem;" href="https://prismlauncher.org/">
                  prismlauncher.org
                </a>
                and download the latest version of Prism Launcher for your
                operating system.
              </li>
            </ul>
          </li>
          <li>
            <h3>Log In to Your Minecraft Account</h3>
            <ul>
              <li>Open Prism Launcher.</li>
              <li>Log in with your Minecraft account credentials.</li>
            </ul>
          </li>
          <li>
            <h3>Create a New Instance</h3>
            <ul>
              <li>In Prism Launcher, click on the "Instances" tab.</li>
              <li>Select "Add Instance" to create a new instance.</li>
            </ul>
          </li>
          <li>
            <h3>Choose Import</h3>
            <ul>
              <li>
                In the instance creation window, select "Import" as the source
                for modpacks.
              </li>
              <li>
                Paste this URL into the input field.
                <code style="padding: 0.6rem;letter-spacing:normal;">
                  <strong>
                    https://yog.daedalist.net/modpack/Jaffa-Factory-2-prism.zip
                  </strong>
                </code>
              </li>
            </ul>
          </li>
        </ol>
        <p>You are now set up to play on our modded Minecraft server!</p>
      </div>
      <script src="/oneko.js"></script>
    </div>
  );
});

app.get("/screenshots/", async (c) => {
  return c.render(
    <div class="text-white">
      <a class="text-white" href="/">
        Home
      </a>
      <a class="text-white" href="/screenshots/upload/">
        Upload
      </a>
      <div className="flex-group" style="justify-content:center;">
        {(await getScreenshots()).map((e) => {
          return html`<a href="/assets/screenshots/${e}"
            ><img style="" src="/assets/screenshots/${e}" alt="" height="100px"
          /></a>`;
        })}
      </div>
    </div>
  );
});

app.get("/screenshots/upload/", async (c) => {
  return c.render(
    <div class="text-white flex-group flow" style="flex-direction: column;">
      <h1 class="text-white">Upload</h1>
      <a class="text-white" href="/">
        Home
      </a>
      <a class="text-white" href="/screenshots/">
        Screenshots
      </a>
      <form
        action="/screenshots/upload/"
        method="post"
        enctype="multipart/form-data"
      >
        <label for="image">Image</label>
        <input
          id="img-input"
          type="file"
          name="image"
          accept="image/*"
          multiple
        />
        <button>Submit</button>
      </form>
    </div>
  );
});

app.use(
  "/screenshots/upload/",
  basicAuth({
    username: "upload",
    password: process.env.UPLOAD_AUTH,
  })
);

app.post("/screenshots/upload/", async (c) => {
  const screenshots = "./website/assets/screenshots/";
  const body = await c.req.parseBody();

  Bun.write(`${screenshots}${body?.image?.name}`, body?.image);

  await $`ffmpeg -y -i ${
    screenshots + body.image.name
  } -c:v libwebp -quality 85 ${
    screenshots + Path.parse(screenshots + body.image.name).name
  }.webp`;
  await $`rm ${screenshots}${body.image.name}`;
  // return c.json(images[0]);
  return c.redirect("/screenshots/upload/");
});

async function getScreenshots() {
  try {
    return await readdir("./website/assets/screenshots/");
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default app;

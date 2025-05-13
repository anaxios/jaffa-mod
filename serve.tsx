import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import type { FC } from "hono/jsx";
import { css, cx, keyframes, Style } from "hono/css";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";

// import styles from "./website/css/style.css";

const app = new Hono();

app.use(logger());
// // app.use("/", serveStatic({ path: "./website/index.html" }));
// app.get("/website/*", serveStatic({ path: "./website" }));
app.use("*", serveStatic({ root: "./website" }));

app.get(
  "/favicon.ico",
  serveStatic({ path: "./assets/orange-minecraft.png" })
);
app.get("/oneko.gif", serveStatic({ path: "./oneko.gif" }));
// app.get("/", (c) => c.text("You can access: /static/hello.txt"));
// // app.get("*", serveStatic({ path: "./dist/index.html" }));

// export default app;

// const Layout: FC = (props) => {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="stylesheet" href="/website/css/reset.css" />
//         <link rel="stylesheet" href="/website/css/style.css" />
//         <script src="website/js/background-random.js"></script>

//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Document</title>
//       </head>
//       <body onload="backgroundRandom()">
//         <div class="flex container bg-dark" onclick="backgroundRandom()">
//           <div class="text-container glass flow text-dark link ff-minecraft">
//             <h1 class="rainbow-text ff-minecrafter fs-xxl">Minecraft Server</h1>
//             <h2 class="" id="installation">
//               Installation
//             </h2>
//             <ol>
//               <li>
//                 <h3>Download Prism Launcher</h3>
//                 <ul>
//                   <li>
//                     Go to
//                     <a href="https://prismlauncher.org/">
//                       https://prismlauncher.org/;
//                     </a>
//                     and download the latest version of Prism Launcher for your
//                     operating system.
//                   </li>
//                 </ul>
//               </li>
//               <li>
//                 <h3>Log In to Your Minecraft Account</h3>
//                 <ul>
//                   <li> Open Prism Launcher.</li>
//                   <li> Log in with your Minecraft account credentials.</li>
//                 </ul>
//               </li>
//               <li>
//                 <h3>Create a New Instance</h3>
//                 <ul>
//                   <li>
//                     In Prism Launcher, click on the &#8220;Instances&#8221; tab.
//                   </li>
//                   <li>Select "Add Instance" to create a new instance.</li>
//                 </ul>
//               </li>
//               <li>
//                 <h3>Choose Import</h3>
//                 <ul>
//                   <li>
//                     In the instance creation window, select "Import" as the
//                     source for modpacks.
//                   </li>
//                   <li>
//                     Paste this URL into the input field.
//                     <code>
//                       https:&#47;&#47;yog.daedalist.net&#47;Jaffa-Factory-2-prism.zip
//                     </code>
//                   </li>
//                 </ul>
//               </li>
//             </ol>
//             <p>You are now set up to play on our modded Minecraft server!</p>
//           </div>
//         </div>
//         <script src="./oneko.js"></script>
//       </body>
//     </html>
//   );
// };

// const Top: FC<{ messages: string[] }> = (props: { messages: string[] }) => {
//   return (
//     <Layout>
//       <h1>Hello Hono!</h1>
//       <ul>
//         {props.messages.map((message) => {
//           return <li>{message}!!</li>;
//         })}
//       </ul>
//     </Layout>
//   );
// };

// app.get("/", (c) => {
//   const messages = ["Good Morning", "Good Evening", "Good Night"];
//   return c.html("<!DOCTYPE html>" + <Top messages={messages} />);
// });

app.use(
  "*",
  jsxRenderer(
    ({ children }) => {
      return (
        <html lang="en">
          <head>
            <link rel="stylesheet" href="/css/reset.css" />
            <link rel="stylesheet" href="/css/style.css" />
            <script src="/js/background-random.js"></script>

            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Document</title>
          </head>
          <body onload="backgroundRandom()">{children}</body>
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
    <div class="flex container bg-dark" onclick="backgroundRandom()">
      <div class="text-container glass flow text-dark link ff-minecraft">
        <h1 class="rainbow-text ff-minecrafter fs-xxl">Daedalist Server</h1>
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
                    https://yog.daedalist.net/Jaffa-Factory-2-prism.zip
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

export default app;

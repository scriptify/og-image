import { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import { createOgImageFromHipster } from "../../_og-image-creator";

const isDev = !process.env.AWS_REGION;
const isHtmlDebug = false;

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    const splitted = req.url?.split("/") ?? [];
    const ipfsHash = splitted[splitted.length - 1].replace(".png", "");
    const fileOutPath = `./public/og/${ipfsHash}.png`;
    await createOgImageFromHipster(ipfsHash, fileOutPath);

    const file = await fs.promises.readFile(fileOutPath);

    res.statusCode = 200;
    res.setHeader("Content-Type", `image/png`);
    res.setHeader(
      "Cache-Control",
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
    );
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
}

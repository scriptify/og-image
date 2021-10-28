import path from "path";
import fs from "fs";
import sharp from "sharp";
import { exists } from "./fs";
import { downloadFromIpfs } from "./node-download";

export async function createOgImageFromHipster(
  ipfsHash: string,
  fileOutPath: string
) {
  if (await exists(fileOutPath)) {
    return;
  }

  if (!(await exists("./temp"))) {
    await fs.promises.mkdir("./temp");
  }

  const downloadedImgPath = path.join("./temp", `${ipfsHash}.png`);

  if (!(await exists(downloadedImgPath))) {
    await downloadFromIpfs(ipfsHash, downloadedImgPath);
  }

  const hipsterImg = sharp(downloadedImgPath);
  const bgImage = sharp("./public/og-bg.png");

  const { height: bgHeight = 0, width: bgWidth = 0 } = await bgImage.metadata();

  const newHipsterHeight = bgHeight * 0.9;
  hipsterImg.resize(undefined, newHipsterHeight);
  const { height: hipsterHeight = 0, width: hipsterWidth = 0 } =
    await hipsterImg.metadata();
  const hipsterLeft = bgWidth - hipsterWidth - bgWidth * 0.05;
  const hipsterTop = bgHeight * 0.05;

  bgImage.composite([
    {
      input: await hipsterImg.toBuffer(),
      top: Math.round(hipsterTop),
      left: Math.round(hipsterLeft),
    },
  ]);

  await bgImage.toFile(fileOutPath);
}

import path from "path";
import fs from "fs";
import sharp from "sharp";

import { exists } from "./fs";
import { downloadFromIpfs, downloadImage } from "./node-download";

export async function createOgImageFromHipster(
  ipfsHash: string,
  fileOutPath: string
) {
  const TMP_FOLDER = "/tmp";

  if (await exists(fileOutPath)) {
    return fs.promises.readFile(fileOutPath);
  }

  if (!(await exists(TMP_FOLDER))) {
    await fs.promises.mkdir(TMP_FOLDER);
  }

  const bgImagePath = path.join(TMP_FOLDER, "og-bg.png");
  if (!(await exists(bgImagePath))) {
    // Download image once
    console.info(`Download bg image as it does not exist yet...`);
    await downloadImage("https://ogster.vercel.app/og-bg.png", bgImagePath);
  }

  const downloadedImgPath = path.join(TMP_FOLDER, `${ipfsHash}.png`);

  if (!(await exists(downloadedImgPath))) {
    await downloadFromIpfs(ipfsHash, downloadedImgPath);
  }

  const hipsterImg = sharp(downloadedImgPath);
  const bgImage = sharp(bgImagePath);

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

  const buffer = await bgImage.toBuffer();

  (async () => {
    // Save file to cache it for later usage
    try {
      await fs.promises.writeFile(fileOutPath, buffer);
    } catch (e) {
      console.error("Failed to persist file", fileOutPath, e);
    }
  })();

  return buffer;
}

import path from "path";
import fs from "fs";
import sharp from "sharp";
import { exists } from "./fs";
import { downloadFromIpfs } from "./node-download";

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

  const downloadedImgPath = path.join(TMP_FOLDER, `${ipfsHash}.png`);

  if (!(await exists(downloadedImgPath))) {
    await downloadFromIpfs(ipfsHash, downloadedImgPath);
  }

  const hipsterImg = sharp(downloadedImgPath);
  const bgImage = sharp(path.join(__dirname, "public/og-bg.png"));

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

  (async () => {
    // Save file to cache it for  late usage
    try {
      await bgImage.toFile(fileOutPath);
    } catch (e) {
      console.error("Failed to persist file", fileOutPath, e);
    }
  })();

  return bgImage.toBuffer();
}

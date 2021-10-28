import fs from "fs";
import { https as client } from "follow-redirects";
import { exists } from "./fs";

const IPFS_URLS = [
  "https://ipfs.infura.io/ipfs",
  "https://gateway.ipfs.io/ipfs",
];

export function downloadImage(url: string, filepath: string) {
  return new Promise((resolve, reject) => {
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        res
          .pipe(fs.createWriteStream(filepath))
          .on("error", reject)
          .once("close", () => resolve(filepath));
      } else {
        // Consume response data to free up memory
        res.resume();
        reject(
          new Error(`Request Failed With a Status Code: ${res.statusCode}`)
        );
      }
    });
  });
}

/**
 * Tries all providers if one fails
 */
export async function downloadFromIpfs(ipfsHash: string, filePath: string) {
  let currentProvider: undefined | number;

  const currentUrl = () => {
    if (currentProvider === undefined) {
      currentProvider = 0;
    } else {
      currentProvider = currentProvider + 1;
    }

    return `${IPFS_URLS[currentProvider]}/${ipfsHash}`;
  };

  do {
    try {
      await downloadImage(currentUrl(), filePath);
      break;
    } catch (e: any) {
      console.error(
        `Could not download file with hash: ${ipfsHash} from ${
          IPFS_URLS[currentProvider ?? 0]
        }.`
      );
    }
  } while ((currentProvider ?? 0) < IPFS_URLS.length);

  if (!(await exists(filePath))) {
    throw new Error(`Failed downloading ${ipfsHash}`);
  }
}

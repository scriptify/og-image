// import marked from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";

export function getHtml(parsedReq: ParsedRequest) {
  const { imageUrl } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
    body {
        background-image: url(https://www.cardanohipsters.io/og/og-bg.png);
        background-size: cover;
        background-repeat: no-repeat;
    }
    img {
        position: absolute;
        right: 2%;
        bottom: 5%;
        height: 90%;
        width: auto;
    }
    </style>
    <body>
        <img src="${sanitizeHtml(imageUrl)}" />
    </body>
</html>`;
}

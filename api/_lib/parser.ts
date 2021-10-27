import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest, Theme } from "./types";

export function parseRequest(req: IncomingMessage) {
  const { query } = parse(req.url || "/", true);
  const { imageUrl } = query || {};

  const parsedRequest: ParsedRequest = {
    imageUrl: imageUrl?.toString() ?? "",
  };

  return parsedRequest;
}

function getArray(stringOrArray: string[] | string | undefined): string[] {
  if (typeof stringOrArray === "undefined") {
    return [];
  } else if (Array.isArray(stringOrArray)) {
    return stringOrArray;
  } else {
    return [stringOrArray];
  }
}

function getDefaultImages(images: string[], theme: Theme): string[] {
  const defaultImage =
    theme === "light"
      ? "https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg"
      : "https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-white.svg";

  if (!images || !images[0]) {
    return [defaultImage];
  }

  return images;
}

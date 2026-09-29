/**
 * Utility to detect and extract QR code links (api.qrserver.com)
 * or standard image URLs from backend text responses.
 */

export function parseMessageContent(rawText) {
  if (!rawText || typeof rawText !== "string") {
    return {
      hasMedia: false,
      textBefore: rawText || "",
      mediaUrl: null,
      textAfter: "",
      isQrCode: false,
    };
  }

  // 1. Check for Markdown image: ![alt](url)
  const markdownImgRegex = /!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/i;
  const mdMatch = rawText.match(markdownImgRegex);
  if (mdMatch) {
    const mediaUrl = mdMatch[2];
    const splitIndex = mdMatch.index;
    const textBefore = rawText.substring(0, splitIndex).trim();
    const textAfter = rawText.substring(splitIndex + mdMatch[0].length).trim();
    const isQrCode =
      mediaUrl.includes("api.qrserver.com") ||
      mediaUrl.toLowerCase().includes("qr");
    return {
      hasMedia: true,
      mediaUrl,
      textBefore,
      textAfter,
      isQrCode,
    };
  }

  // 2. Check for api.qrserver.com URL or standard image URLs (.png, .jpg, .jpeg, .webp, .svg, .gif)
  const urlRegex = /(https?:\/\/[^\s]*api\.qrserver\.com[^\s]*|https?:\/\/[^\s]+\.(?:png|jpg|jpeg|webp|svg|gif)(?:\?[^\s]*)?)/i;
  const match = rawText.match(urlRegex);

  if (match) {
    let mediaUrl = match[1];
    // Clean trailing punctuation if matched inadvertently (e.g. trailing period, comma, paren, quote)
    mediaUrl = mediaUrl.replace(/[.,;!?)"']+$/, "");

    const splitIndex = match.index;
    const textBefore = rawText.substring(0, splitIndex).trim();
    const textAfter = rawText.substring(splitIndex + match[0].length).trim();
    const isQrCode =
      mediaUrl.includes("api.qrserver.com") ||
      mediaUrl.toLowerCase().includes("qr");

    return {
      hasMedia: true,
      mediaUrl,
      textBefore,
      textAfter,
      isQrCode,
    };
  }

  // No media link detected
  return {
    hasMedia: false,
    textBefore: rawText,
    mediaUrl: null,
    textAfter: "",
    isQrCode: false,
  };
}

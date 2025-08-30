import DOMPurify from "dompurify";

export const purify =
  typeof window !== "undefined" ? DOMPurify(window) : DOMPurify;

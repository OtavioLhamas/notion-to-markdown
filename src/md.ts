import type { AnnotationResponse } from './types';

export const bold = (text: string) => `**${text}**`;

export const italic = (text: string) => `_${text}_`;

export const strikethrough = (text: string) => `~~${text}~~`;

export const underline = (text: string) => `<u>${text}<u>`;

export const inlineCode = (text: string) => `\`${text}\``;

export const link = (text: string, href: string) => `[${text}](${href})`;

export const image = (alt: string, href: string) => `![${alt}](${href})`;

export const annotatePlainText = (text: string, annotations: AnnotationResponse) => {
  // check if text is only spaces
  if (text.match(/^\s*$/)) return text;

  let result = text;

  if (result.trim() !== '') {
    if (annotations.code) result = inlineCode(text);
    if (annotations.bold) result = bold(text);
    if (annotations.italic) result = italic(text);
    if (annotations.strikethrough) result = strikethrough(text);
    if (annotations.underline) result = underline(text);
  }

  return result;
};

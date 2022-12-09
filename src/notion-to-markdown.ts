import { Client } from '@notionhq/client';
import { BlockResponse, NotionToMarkdownOptions } from './types/index.js';
import * as md from './md.js';

export default class NotionToMarkdown {
  private notionClient: Client;

  constructor(options: NotionToMarkdownOptions) {
    this.notionClient = options.notionClient;
  }

  /**
   * Converts a single Notion block to Markdown text.
   * @param {BlockResponse} block - single Notion block
   * @returns {string} markdown string
   */
  static async blockToMarkdown(block: BlockResponse): Promise<string> {
    if (typeof block !== 'object' || !('type' in block)) return '';

    let result = '';

    const { type } = block;

    switch (type) {
      case 'image': {
        const content = block.image;
        const imageCaption = content.caption
          .map((item) => item.plain_text)
          .join('');
        const blockType = content.type;
        if (blockType === 'external') { result = md.image(imageCaption, content.external.url); }
        if (blockType === 'file') { result = md.image(imageCaption, content.file.url); }
        break;
      }

      case 'paragraph': {
        const content = block[type].rich_text;
        result = content.reduce((previousValue, currentValue) => {
          const plainText = md.annotatePlainText(currentValue.plain_text, currentValue.annotations);
          return previousValue + plainText;
        }, '');
        return result;
      }
      default: {
        return '';
      }
    }

    return result;
  }
}

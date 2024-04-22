import { Marked, MarkedOptions } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { HtmlAttributeSerializer } from '../../../shared/utils/HtmlAttributeSerializer';
import hljs from 'highlight.js';

export class MarkdownDisplayUtils {
  static parseMarkdownToHTML(markdown: string): string {
    const marked = new Marked();
    const renderer = {
      code(code: string, infostring: string | undefined) {
        return `
              <copyable-snippet
              language="${infostring ?? 'plaintext'}"
              code-snippet="${HtmlAttributeSerializer.serialize(
                code
              )}"></copyable-snippet>
      `;
      },
    };
    marked.use({ renderer });
    const options: MarkedOptions = {
      async: false,
    };
    return marked.parse(markdown, options) as string;
  }
}

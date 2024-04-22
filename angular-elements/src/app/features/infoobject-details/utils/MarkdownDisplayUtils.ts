import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';

export class MarkdownDisplayUtils {
    static parseMarkdownToHTML(markdown: string): string {
        const marked = new Marked(
            markedHighlight({
                langPrefix: 'hljs language-',
                highlight(code, lang, info) {
                    const language = hljs.getLanguage(lang) ? lang : 'jsx';
                    return hljs.highlight(code, { language }).value;
                }
            })
        );
        return marked.parse(markdown, { async: false }) as string;
    }
}
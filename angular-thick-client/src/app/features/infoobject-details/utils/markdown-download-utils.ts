import { Todo } from '../../../core/models/todo.model';

export class MarkdownUtils {
  static formatAsMarkdown(infoObject: {
    authorIp: string;
    topic?: string;
    content: string;
    tag?: string;
    todos?: Todo[];
    markdownContent?: string;
  }): string {
    let markdown = `# ${infoObject.topic ?? 'No Title'}\n\n`;
    markdown += `### Author: ${infoObject.authorIp}\n`;
    if (infoObject.tag) markdown += `### Tag: ${infoObject.tag}\n`;
    if (infoObject.markdownContent)
      markdown += `\n${infoObject.markdownContent}`;
    if (infoObject.content)
      markdown += `\n${infoObject.content.replace(/(?:\r\n|\r|\n)/g, '\n\n')}`;
    if (infoObject.todos && infoObject.todos.length > 0) {
      markdown += `\n### Todos\n`;
      infoObject.todos.forEach((todo) => {
        const statusIcon = todo.isDone ? '[x]' : '[ ]';
        markdown += `- ${statusIcon} ${todo.content}\n`;
      });
    }
    return markdown;
  }

  static downloadMarkdown(
    markdown: string,
    filename: string = 'infoobject.md'
  ) {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  static getTitleFromContent(text: string) {
    const words = text.split(/[^a-zA-Z]+/).filter((word) => word !== '');
    const firstFiveWords = words.slice(0, 5);
    let result = firstFiveWords.join('-').toLowerCase();
    if (result.length > 240) result = result.substring(0, 240);
    if (result === '') return 'empty';
    return result;
  }

  static getTitleFromTopic(text: string) {
    const words = text.split(/[^a-zA-Z]+/).filter((word) => word !== '');
    let result = words.join('-').toLowerCase();
    if (result.length > 240) result = result.substring(0, 240);
    if (result === '') return 'empty';
    return result;
  }
}

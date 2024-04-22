export class HtmlAttributeSerializer {
  static serialize(obj: any): string {
    const escapedHtml = obj
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    return escapedHtml;
  }

  static deserialize(escapedHtml: string): string {
    const jsonString = escapedHtml
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    return jsonString;
  }
}

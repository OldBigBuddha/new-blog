import MarkdownIt from "markdown-it";
import HighlightJs from "markdown-it-highlightjs";

const markdownToHtml = (markdown: string) => {
  const markdownItOption = {
    html: true,
  };
  const result = MarkdownIt(markdownItOption).use(HighlightJs).render(markdown);
  return result.toString();
};
export default markdownToHtml;

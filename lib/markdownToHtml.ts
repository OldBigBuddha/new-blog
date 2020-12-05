import MarkdownIt from "markdown-it";
import HighlightJs from "markdown-it-highlightjs";

// export const markdownToHtml = async (markdown: string) => {
//   const result = await remark().use(html).process(markdown);
//   return result.toString();
// };

const markdownToHtml = (markdown: string) => {
  const markdownItOption = {
    html: true,
  };
  const result = MarkdownIt(markdownItOption).use(HighlightJs).render(markdown);
  return result.toString();
};
export default markdownToHtml;

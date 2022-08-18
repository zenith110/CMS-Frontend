/* eslint-disable no-console */
import escapeHtml from "escape-html";
import { Text } from "slate";

const HTMLSerializer = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold)
      string = `<b>${string}</b>`;
    else if(node.underline)
      string = `<u>${string}</u>`
    else if(node.italic)
      string = `<i>${string}</i>`
    return string;
  }

  const children = node.children.map((n) => HTMLSerializer(n)).join("");
  switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "link":
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    case "bold":
      return `<b>${children}</b>`
    case "italic":
      return `<i>${children}</i>`
    case "underline":
      return `<u>${children}</u>`
    default:
      return children;
  }
};
export default HTMLSerializer;

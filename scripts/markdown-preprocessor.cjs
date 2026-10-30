// Docusaurus 3's heading-ID compatibility pass also rewrites headings inside
// fenced code. Apply the same compatibility conversion only to prose.
const {escapeMarkdownHeadingIds} = require('@docusaurus/utils');
module.exports = function preprocessMarkdown({fileContent}) {
  let marker = ''; let length = 0;
  return fileContent.split('\n').map(line => {
    const fence = line.match(/^\s{0,3}(`{3,}|~{3,})(.*)$/);
    if (!length && fence) {
      marker = fence[1][0]; length = fence[1].length;
      return line;
    }
    if (length) {
      if (fence && fence[1][0] === marker && fence[1].length >= length && !fence[2].trim()) length = 0;
      return line;
    }
    return escapeMarkdownHeadingIds(line);
  }).join('\n');
};

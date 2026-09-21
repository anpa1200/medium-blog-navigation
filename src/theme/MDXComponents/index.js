import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';

// Infima makes Markdown tables horizontally scrollable. Keep them keyboard
// reachable even in browsers that do not automatically focus scroll regions.
function KeyboardTable(props) {
  return <table tabIndex={0} {...props} />;
}

export default {...MDXComponents, table: KeyboardTable};

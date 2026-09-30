import React, {useState} from 'react';
import OriginalCodeBlock from '@theme-original/CodeBlock';

const MAX_HIGHLIGHTED_LINES = 150;
const MAX_HIGHLIGHTED_CHARACTERS = 12000;

function rawText(children) {
  if (typeof children === 'string') return children;
  if (Array.isArray(children) && children.every((part) => typeof part === 'string')) {
    return children.join('');
  }
  return null;
}

function lineCount(text) {
  let lines = 1;
  for (let index = 0; index < text.length; index += 1) {
    if (text.charCodeAt(index) === 10) lines += 1;
  }
  return lines;
}

function PlainLargeCode({text, title, lines}) {
  const [copyStatus, setCopyStatus] = useState('Copy raw text');
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('Copied');
    } catch {
      setCopyStatus('Copy unavailable');
    }
  }
  return <details className="plain-large-code" data-plain-code-lines={lines}>
    <summary>{title || 'Large code or log block'} · {lines} lines · expand raw text</summary>
    <button type="button" onClick={copy}>{copyStatus}</button>
    <pre tabIndex={0}><code>{text}</code></pre>
  </details>;
}

export default function CodeBlock(props) {
  const text = rawText(props.children);
  if (text === null) return <OriginalCodeBlock {...props} />;
  const lines = lineCount(text);
  if (lines <= MAX_HIGHLIGHTED_LINES && text.length <= MAX_HIGHLIGHTED_CHARACTERS) {
    return <OriginalCodeBlock {...props} />;
  }
  return <PlainLargeCode text={text} title={props.title} lines={lines} />;
}

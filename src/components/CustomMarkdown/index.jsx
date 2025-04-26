/* eslint-disable */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';

function CustomMarkdown({ content }) {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[gfm]}
      components={{
        a({ node, ...props }) {
          return <a {...props} target="_blank" rel="noopener noreferrer" />;
        },
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={coldarkDark}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
    />
  );
}

export default CustomMarkdown;

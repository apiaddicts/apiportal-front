/* eslint-disable */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

function Markdown({ content }) {
  return (
    <div className='markdown'>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
   			>
					{content}
			</ReactMarkdown> 
		</div>
  );
}

export default Markdown;

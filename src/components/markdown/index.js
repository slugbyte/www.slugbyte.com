import React from 'react'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

let Markdown = ({content}) => 
  <div 
    className='markdown' 
    dangerouslySetInnerHTML={{__html: md.render(content)}} />

export default Markdown

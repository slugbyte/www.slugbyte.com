import React from 'react'
import './_for-the-lulz.scss'
import content from './index.md'
import metadata from './metadata.js'
import BlogMarkdownPost from '../../../blog-markdown-post'
export default () => <BlogMarkdownPost metadata={metadata} content={content} />

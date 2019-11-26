import React from 'react'
import {Link} from 'gatsby'

import allPostMetadata from '../blog-posts/all-post-metadata.js'

const BlogNav = ({metadata}) => {
  let currentPostIndex = allPostMetadata.reduce((r, post, i) => {
    if (metadata.url == post.metadata.url) return i 
      return r
  }, -1)

  let prevIndex = currentPostIndex > 0 ? currentPostIndex - 1 : allPostMetadata.length - 1
  let nextIndex = currentPostIndex < allPostMetadata.length - 1 ? currentPostIndex + 1 : 0
  
  let prev = allPostMetadata[nextIndex].metadata.url
  let next = allPostMetadata[prevIndex].metadata.url
  return (
    <footer className='blog-nav'>
      <nav>
        <Link to={prev} className='back-btn'> Prev Post </Link>
        <Link to='/blog' className='back-btn'> Blog </Link>
        <Link to={next} className='back-btn'> Next Post </Link>
      </nav>
    </footer>
  )
}

export default BlogNav


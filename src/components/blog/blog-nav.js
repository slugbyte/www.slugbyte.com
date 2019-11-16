import React from 'react'
import {Link} from 'gatsby'
const postData =  require('./create-blog-post-data.js')()

const BlogNav = ({metadata}) => {
  let currentPostIndex = postData.reduce((r, post, i) => {
    if (metadata.url == post.metadata.url) return i 
      return r
  }, -1)

  let prevIndex = currentPostIndex > 0 ? currentPostIndex - 1 : postData.length - 1
  let nextIndex = currentPostIndex < postData.length - 1 ? currentPostIndex + 1 : 0
  
  let prev = postData[nextIndex].metadata.url
  let next = postData[prevIndex].metadata.url
  return (
    <footer>
      <nav>
        <Link to={prev} className='back-btn'> Prev </Link>
        <Link to='/blog' className='back-btn'> Blog </Link>
        <Link to={next} className='back-btn'> Next </Link>
      </nav>
    </footer>
  )
}

export default BlogNav


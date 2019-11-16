import React from 'react'

import {Link} from 'gatsby'
import Layout from '../layout'
import Markdown from '../markdown'

// TODO previos next and back button (fixed at bottom of page)
const createMarkdownPost = ({metadata, content}) => () => (
  <Layout metadata={metadata}>
    <Link to='/blog' className='back-btn'> Back </Link>
    <div className={metadata.url.slice(1).replace(/\//g, '-')}>
      <Markdown content={content} />
    </div>
    <Link to='/blog' className='back-btn'> Back </Link>
  </Layout>
)

export default createMarkdownPost 

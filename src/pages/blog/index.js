import './_blog.scss' 

import React from 'react'
import { Link } from 'gatsby'

import Layout from '../../components/layout'
import Image from '../../components/image'

import forTheLulz from './for-the-lulz/metadata.json'
import forTheLulzImage from './for-the-lulz/for-the-lulz.jpg'

import daySix from './day-6-with-the-space-heater/metadata.json'
import daySixImage from './day-6-with-the-space-heater/day-6-with-the-space-heater.jpg'

import fiveVim from './5-curtial-vim-plugins/metadata.json'
import fiveVimImage from './5-curtial-vim-plugins/5-crutial-vim-plugins.jpg'

const BlogPostItem = ({imageURL, metadata}) => (
  <div className='blog-post-item'>
    <img src={imageURL}/>
    <h2>{metadata.title}</h2>
    <p>{metadata.description}</p>
    <Link to={metadata.url}>Read Post</Link>
  </div>
)

const IndexPage = () => (
  <Layout >
    <div className='blog-page'>
      <div className='blog-container'>
         <BlogPostItem metadata={forTheLulz} imageURL={forTheLulzImage} />
         <BlogPostItem metadata={fiveVim} imageURL={fiveVimImage} />
         <BlogPostItem metadata={daySix} imageURL={daySixImage} />
      </div>
    </div>
  </Layout>
)

export default IndexPage

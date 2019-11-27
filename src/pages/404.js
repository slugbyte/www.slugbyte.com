import './_404.scss'
import React from 'react'
import Layout from '../components/layout'
import LazyImage from '../components/lazy-image'
import metadata from '../metadata/404-metadata.js'

let image = {
  url: require('../asset/image/art/1000/grimlin-garden-1000.png'),
  thumbnail: require('../asset/image/art/50/grimlin-garden-50.png'),
  description: 'What you seek, was not found. Sorry!',
}

const NotFoundPage = () => (
  <Layout metadata={metadata}>
    <main className='four-oh-four'>
      <h1>DARN! What you seek was not found.</h1> 
      <h2>aka. Sorry, but 404</h2>
      <LazyImage image={image}/>
    </main>
  </Layout>
)

export default NotFoundPage

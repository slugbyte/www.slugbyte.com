import './_contact.scss'
import React from 'react'
import { Link } from 'gatsby'

import Layout from '../../components/layout'

import headShot from './head-shot.png'

const IndexPage = () => (
  <Layout >
    <div className='contact-page'>
      <img alt='Duncan Marsh' src={headShot}/>
      <div className='info'>
        <h2>Duncan Wolf Marsh</h2>
        <h3>email:</h3><p>duncan@slugbyte.com</p>
        <h3>github</h3> <a href='https://github.com/slugbyte'>slugbyte</a>
        <h3>instagram</h3> 
        <a href='https://www.instagram.com/dunkdunkdunkdunkdunk'>@dunkdunkdunkdunkdunk</a>
        <h3>twitter</h3> 
        <a href='https://twitter.com/unicodescraps'>@unicodescraps</a>
        <h3>linkedin</h3> <a href='https://www.linkedin.com/in/dwolfm/'>dwolfm</a>
      </div>
    </div>
  </Layout>
)

export default IndexPage


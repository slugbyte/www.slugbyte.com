import './contact.scss'

import React from 'react'
import { Link } from 'gatsby'

import Layout from '../../components/layout'

const SlugIcon = ({name, width='20px', height=''}) => {
  console.log('naname', name)
   return (
    <img alt={name} style={{width, height}} className='slug-icon' src={require('../../images/icon/' + name)} /> 
   )
}

const SecondPage = () => (
  <Layout>
    <div className='contact'>
      <main>
        <h1> Hi Y'all, I'm Duncan Marsh. Feel free to drop me a message any time.</h1>
        <div className='github'>
           <a alt='github' href="https://github.com/slugbyte">
             <SlugIcon name='github.svg' />
             slugbyte
           </a>
        </div>
        <div className='twitter'>
           <a href="https://twitter.com/slugbyte">
              <SlugIcon name='twitter.svg' />
              @slugbyte
           </a>
        </div>
        <div className='instagram'> 
          <a alt='instagram' href="https://www.instagram.com/dunkdunkdunkdunkdunk/">
            <SlugIcon name='instagram.svg' />
            @dunkdunkdunkdunkdunk
          </a>
        </div>
        <div className='youtube'> 
          <a alt='youtube' href="https://www.youtube.com/channel/UC3xazNh2a08gUACTtwgROwA">
            <SlugIcon name='youtube.svg' />
            Happy Hackin with Slugbyte
          </a>
        </div>
        <div className='email'><strong>Email:</strong> slugbyte@slugbyte.com</div>
        <div className='public-key'><a href='https://assets.slugbyte.com/public-key.asc'><strong>Download slugbyte@slugbyte.com's public pgp key</strong></a></div>
      </main>
      <img className='profile-pic' alt='Duncan Marsh' src={require('../../images/profile-pic.png')} />
    </div>
  </Layout>
)

export default SecondPage

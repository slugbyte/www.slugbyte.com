import './_index.scss'
import React from 'react'
import {Link} from 'gatsby'

import Layout from '../components/layout'
import LazyImage from '../components/lazy-image'
import AudioPlayer from '../components/audio-player'

import metadata from '../metadata/landing-metadata.js'

const featuredTuneURI = require('../asset/tune/Untitled-06.wav')

let head = {
  description: 'Stetch head',
  url: require('../asset/image/landing/1000/streach-head-1000.png'),
  thumbnail: require('../asset/image/landing/50/streach-head-50.png'),
}

let featuredArt = [
  {
    description: 'grocery fashion', 
    url: require('../asset/image/art/500/grocey-fashion-500.png'),
    thumbnail: require('../asset/image/art/50/grocey-fashion-50.png'),
  },
  {
    description: 'laundry', 
    url: require('../asset/image/art/500/laundry-500.png'),
    thumbnail: require('../asset/image/art/50/laundry-50.png'),
  },
  {
    description: 'photo-shoot', 
    url: require('../asset/image/art/500/photo-shoot-500.png'),
    thumbnail: require('../asset/image/art/50/photo-shoot-50.png'),
  },
  {
    description: 'cook-out', 
    url: require('../asset/image/art/500/cook-out-500.png'),
    thumbnail: require('../asset/image/art/50/cook-out-50.png'),
  }, 
]

class Landing extends React.Component {
  render(){
    return (
      <Layout metadata={metadata} >
        <main className='landing'>

          <section className='feature blog-feature for-the-lulz'> 
            <h2>For the Lulz</h2>
            <p>The power of taking good breaks to keep your focus + a hand full of command-line games and tools to help you.</p>
            <Link to='/blog/for-the-lulz'> Read Post </Link>
          </section>

          <section className='feature head'>
            <LazyImage  image={head} />
          </section>

          <section className='feature blog-feature needy-for-speedy'>
            <h2>Needy for Speedy</h2>
            <p>A deep dive into the runtime speeds of javascript's different object creation methods.</p>
            <Link to='/blog/needy-for-speedy'> Read Post </Link>
          </section>

          <section className='feature tune'> 
            <div className='audio-container'>
              <AudioPlayer audioURI={featuredTuneURI} title={'Untitled-06.wav'} />
            </div>
            <Link to='/audio'>More Audio</Link>
          </section>

          <section className='feature blog-feature crucial-vim-plugins'> 
            <h2>5 Crucial Vim Plugins</h2>
            <p>Five Vim plugins that will unlock powerful modern text editor functionalities.</p>
            <Link to='/blog/5-crucial-vim-plugins'> Read Post </Link>
          </section>

          <section className='feature art'> 
            <div className='image-container'>
              {featuredArt.map((art, key) => <LazyImage key={key} image={art} />)}
            </div>
            <Link to='/art'>More Art</Link>
          </section>

          <section className='feature blog-feature abstract-data-type'> 
            <h2>Wut, Abstrat Data Type, Huh?</h2>
            <p>Breaking down the meaning of Abstract Data Type in a no-undefined-jargon no-nonsense way!</p>
            <Link to='/blog/wut-abstract-data-type-huh'> Read Post </Link>
          </section>
      
        </main>
      </Layout>
    )
  }
}

export default Landing

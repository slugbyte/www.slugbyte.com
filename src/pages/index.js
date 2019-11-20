import '../style/_reset.scss'
import './_index.scss'

import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import LazyImage from '../components/lazy-image'

let artA = {
  description: 'laundry', 
  url: require('../asset/image/art/500/laundry-500.png'),
  thumbnail: require('../asset/image/art/50/laundry-50.png'),
}

let artB = {
  description: 'grocery fashion', 
  url: require('../asset/image/art/500/grocey-fashion-500.png'),
  thumbnail: require('../asset/image/art/50/grocey-fashion-50.png'),
}

let artC = {
  description: 'cook-out', 
  url: require('../asset/image/art/500/cook-out-500.png'),
  thumbnail: require('../asset/image/art/50/cook-out-50.png'),
}

let artD = {
  description: 'photo-shoot', 
  url: require('../asset/image/art/500/photo-shoot-500.png'),
  thumbnail: require('../asset/image/art/50/photo-shoot-50.png'),
}

let head = {
  description: 'Stetch head',
  url: require('../asset/image/landing/1000/streach-head-1000.png'),
  thumbnail: require('../asset/image/landing/50/streach-head-50.png'),
}

import AudioPlayer from '../components/audio-player'
import tune from '../asset/tune/Untitled-06.wav'

const Landing = () => (
  <Layout >
    <div className='landing'>
      <div className='bio'> 
        <h2>For the Lulz</h2>
        <p>The power of taking breaks to keep your focus and a hand full of command line games and tools to help you.</p>
        <Link to='/blog/for-the-lulz'> Read Post </Link>
      </div>
      
      <LazyImage className='head' image={head} />

      <div className='feature-container'>
        <div className='feature feature-a'>
          <h2>Day 6 with the space heater</h2>
          <p>-- An exploration // runtime analysis of Javascript's different object creation methods --</p>
          <Link to='/blog/day-6-with-the-space-heater'> Read Post </Link>
        </div>
        <div className='feature feature-b'></div>
      </div>

      <div className='tune'>
        <div className='player-container'>
          <AudioPlayer audioURI={tune} title={'Untitled-06.wav'} />
        </div>
        <Link to='/audio'> More Audio </Link>
      </div>
      <div className='art-container'>
        <LazyImage className='art art-a' image={artA} />
        <LazyImage className='art art-b' image={artB} />
        <LazyImage className='art art-c' image={artC} />
        <LazyImage className='art art-d' image={artD} />
        <Link to='/art'> More Art </Link>
      </div>
    </div>
  </Layout>
)

export default Landing

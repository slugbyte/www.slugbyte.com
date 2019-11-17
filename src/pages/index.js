import '../style/_reset.scss'
import './_index.scss'

import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

import artA from '../asset/image/art/laundry.png'
import artB from '../asset/image/art/grocey-fashion.png'
import artC from '../asset/image/art/cook-out.png'
import artD from '../asset/image/art/photo-shoot.png'

import AudioPlayer from '../components/audio-player'
import tune from '../asset/tune/Untitled-06.wav'
console.log('tune', tune)

const Landing = () => (
  <Layout >
    <div className='landing'>
      <div className='bio'> 
        <h2>For the Lulz</h2>
        <p>The power of taking breaks to keep your focus and a hand full of command line games and tools to help you.</p>
        <Link to='/blog/for-the-lulz'> Read Post </Link>
      </div>
      <div className='head'></div>
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
        <img src={artA} className='art art-a'/>
        <img src={artB} className='art art-b'/>
        <img src={artC} className='art art-c'/>
        <img src={artD} className='art art-d'/>
        <Link to='/art'> More Art </Link>
      </div>
    </div>
  </Layout>
)

export default Landing

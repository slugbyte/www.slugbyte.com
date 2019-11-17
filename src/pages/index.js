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
        <h2>Unlockn' <br/>ANSIICodes</h2>
        <button>Read Post --&gt;</button>
      </div>
      <div className='feature-container'>
        <div className='feature feature-a'></div>
        <div className='feature feature-b'></div>
      </div>
      <div className='head'></div>
      <div className='tune'>
        <div className='player-container'>
          <AudioPlayer audioURI={tune} title={'Untitled-06.wav'} />
        </div>
      </div>
      <div className='art-container'>
        <img src={artA} className='art art-a'/>
        <img src={artB} className='art art-b'/>
        <img src={artC} className='art art-c'/>
        <img src={artD} className='art art-d'/>
      </div>
    </div>
  </Layout>
)

export default Landing

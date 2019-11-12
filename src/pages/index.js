import './_index.scss'

import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

const Landing = () => (
  <Layout >
    <div className='landing'>
      <div className='bio'></div>
      <div className='feature-container'>
        <div className='feature feature-a'></div>
        <div className='feature feature-b'></div>
      </div>
      <div className='tune'></div>
      <div className='art-container'>
        <div className='art art-a'></div>
        <div className='art art-b'></div>
        <div className='art art-c'></div>
        <div className='art art-d'></div>
      </div>
    </div>
  </Layout>
)

export default Landing

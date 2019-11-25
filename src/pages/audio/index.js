//import './_art.scss'

import './_audio.scss'

import React from 'react'
import { graphql } from "gatsby"

import Layout from '../../components/layout'
import AudioPlayer from '../../components/audio-player'
import squigles from './U-250.png'

const IndexPage = ({data}) => {
  let tunes = data.allFile.edges.map(e => e.node)
  return (
  <Layout >
    <div className='audio-page'>
      <header>
        <img className='squigles' src={squigles} />
        <h2 className='title'>ntitled compositions</h2>
        <p className='about'>Tension and resolution, chance and repetition, harmony and dissonance, savory and sweet, loud and quiet, monochromatic and complimentary, clean and distorted. These compositions are dedicated to the beautiful and strange late-night radio DJ(s) from my childhood. On nights when I secretly stayed up to draw they poured strange sounds into my room. Windshield wipers, synthesizers, speeches played in reverse, strange organic ambient landscapes, and the subtle non-silence of radio static, these were the audible backdrop of so many adventures with creativity in my youth. Much later I discovered the rich history of experimental music composition and eventually began to scrap together my own ruckus.</p>
    </header>
    <div className='audio-container'> 
        { tunes.map((tune, i) => <AudioPlayer audioURI={tune.publicURL} title={tune.base} />)}
      </div>
    </div>
  </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query TuneQuery {
    allFile(filter: { sourceInstanceName: { eq: "tune" } }) {
        edges {
          node {
            publicURL
            extension
            base
          }
        }
      }    
  }

`

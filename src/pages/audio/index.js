//import './_art.scss'

import './_audio.scss'

import React from 'react'
import { graphql } from "gatsby"

import Layout from '../../components/layout'
import AudioPlayer from '../../components/audio-player'

const IndexPage = ({data}) => {
  let tunes = data.allFile.edges.map(e => e.node)
  return (
  <Layout >
    <div className='audio-page'>
      <div className='audio-container'> 
        { tunes.map((tune, i ) => <AudioPlayer audioURI={tune.publicURL} title={tune.base} />)}
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

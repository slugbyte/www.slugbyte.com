//import './_art.scss'

import React from 'react'
import { graphql } from "gatsby"

import Layout from '../../components/layout'
import AudioPlayer from '../../components/audio-player'

const IndexPage = ({data}) => {
  console.log('data', data)
  let tuneTest = data.allFile.edges[0].node
  console.log({tuneTest})
  return (
  <Layout >
    <div className='audio-page'>
      <div className='audio-container'> </div>
      <AudioPlayer audioURI={tuneTest.publicURL} fileName={tuneTest.base} /> 
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

import './_art.scss'

import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

import Layout from '../../components/layout'
import Image from '../../components/image'

const IndexPage = ({data}) => {
  console.log('data', data, data.all)
  let publicPaths = data.allFile.edges.map(edge => edge.node.publicURL)
  console.log({publicPaths})
  return (
  <Layout >
    <div className='art-page'>
      <div className='art-container'>
        {publicPaths.map((path, i) => ( 
          <img className='art' src={path}/>
        ))}
      </div>
  </div>
  </Layout>
  )
}

export const query = graphql`
  query ArtImageQuery {
    allFile(filter: { sourceInstanceName: { eq: "art" } }) {
        edges {
          node {
            publicURL
            extension
          }
        }
      }    
  }

`

export default IndexPage

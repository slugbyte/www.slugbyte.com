import './_art.scss'

import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

import Layout from '../../components/layout'
import ArtBrowser from '../../components/art-browser'

const IndexPage = () => {
  return (
    <Layout >
      <div className='art-page'>
        <ArtBrowser />
      </div>
    </Layout>
  )
}

export default IndexPage

//export const query = graphql`
  //query ArtImageQuery {
    //allFile(filter: { sourceInstanceName: { eq: "art" } }) {
        //edges {
          //node {
            //publicURL
            //extension
          //}
        //}
      //}    
  //}

//`


    //<div className='art-page'>
      //<div className='art-container'>
        //{publicPaths.map((path, i) => ( 
          //<img key={i} className={'art ' + (i === 3 ? 'focused' : '')} src={path}/>
        //))}
      //</div>
  //</div>

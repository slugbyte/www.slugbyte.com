import React from 'react'
import {get} from 'lodash/fp'
import Layout from '../layout'
import {graphql} from 'gatsby'

export default ({data}) => {
  let html = get('blogPost.content', data)
  return (
    <Layout>
       <main>
          <div dangerouslySetInnerHTML={{__html: html}} />
       </main>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostQuery ($daSlug: String!) {
    blogPost(url: {eq: $daSlug}){
      id
      content
    }
  }
`

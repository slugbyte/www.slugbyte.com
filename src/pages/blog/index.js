import './blog.scss'
import React from 'react'
import {get, map} from 'lodash/fp'
import {format} from 'date-fns'
import {Link, graphql} from 'gatsby'

import Layout from '../../components/layout'
import SlugIcon from '../../components/slug-icon'

const BlogItem  = ({blogPost}) => {
  let date = format(new Date(blogPost.timestamp), 'MM/DD/YYYY')
  return (
    <div className='blog-item'>
      <a alt='github repo' href={blogPost.url}>
        <h2>{blogPost.title}</h2> <span>{date}</span>
        <p>{blogPost.description}</p>
      </a>
    </div>
  )
}

const Blog = ({data}) => {
  const blogPostData = map(get('node'), get('allBlogPost.edges', data))
  console.log({data, blogPostData})
  return (
    <Layout>
      <div className='blog'>
        <h1>Blogs</h1>
        <main>
          {blogPostData.map((blogPost, i) => <BlogItem blogPost={blogPost} key={i} />)}
        </main>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query BlogPageQuery {
		allBlogPost {
			edges {
				node {
					title
					description
					url
          timestamp
				}
			}
		}
  }
`

export default Blog

import './project.scss'
import React from 'react'
import {get, map} from 'lodash/fp'
import { Link, graphql } from 'gatsby'

import Layout from '../../components/layout'
import SlugIcon from '../../components/slug-icon'

const ProjectItem  = ({project}) => {
  return (
    <div className='project-item'>
      <a alt='github repo' href={project.url}>
        <SlugIcon name='github.svg' />
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </a>
    </div>
  )
}

const Project = ({data}) => {
  const projectData = map(get('node'), get('allProjectPost.edges', data))
  console.log({data, projectData})
  return (
    <Layout>
      <div className='project'>
        <h1>Projects</h1>
        <main>
          {projectData.map((project, i) => <ProjectItem project={project} key={i} />)}
        </main>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ProjectPageQuery {
		allProjectPost {
			edges {
				node {
					title
					description
					url
				}
			}
		}
  }
`

export default Project

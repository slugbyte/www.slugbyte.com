import './_project.scss' 

import React from 'react'
import { Link } from 'gatsby'

import Layout from '../../components/layout'
import Image from '../../components/image'

const ProjectPostItem = () => (
  <div className='project-post'>
    <h2></h2>
    <img />
    <p> cool </p>
  </div>
)

const IndexPage = () => (
  <Layout >
    <div className='project-page'>
      <div className='project-container'>
         <ProjectPostItem />
         <ProjectPostItem />
         <ProjectPostItem />
         <ProjectPostItem />
         <ProjectPostItem />
      </div>
    </div>
  </Layout>
)

export default IndexPage

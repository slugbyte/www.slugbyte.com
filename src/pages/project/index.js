import './_project.scss' 

import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/layout'

let projects = [
  {
    name: 'toy', 
    imageURL: require('../../asset/image/project/dusk.png'),
    description: 'A micro virtual machine and assembly language.',
    website: 'https://slugbyte.github.io/toy',
    github: 'https://www.github.com/slugbyte/toy',
  },
  {
    name: 'mold', 
    imageURL: require('../../asset/image/project/lime.png'),
    description: 'A tool for managing dotfiles',
    website: null,
    github: 'https://www.github.com/slugbyte/mold',
  },
  {
    name: 'slugtina', 
    imageURL: require('../../asset/image/project/peach.png'),
    description: 'a paint web application',
    demo: 'https://slugbyte.github.io/slugtina',
    website: 'https://slugbyte.github.io/slugtina',
    github: 'https://www.github.com/slugbyte/slugtina',
  },
  {
    name: 'config', 
    imageURL: require('../../asset/image/project/yellow.png'),
    description: 'my dotfiles and tons of custom scripts and tooling',
    demo: 'https://slugbyte.github.io/slugtina',
    website: 'https://slugbyte.github.io/',
    github: 'https://www.github.com/slugbyte/config',
  },
  {
    name: 'slugular', 
    imageURL: require('../../asset/image/project/sky.png'),
    description: 'a proof of concept web component archatecture',
    demo: 'https://slugbyte.github.io/slugtina',
    website: 'https://slugbyte.github.io/slugtina',
    github: 'https://www.github.com/slugbyte/slugtina',
  },
  {
    name: 'yuejiu', 
    imageURL: require('../../asset/image/project/teal.png'),
    description: 'a personal vim colorscheme',
    demo: 'https://slugbyte.github.io/slugtina',
    website: 'https://slugbyte.github.io/slugtina',
    github: 'https://www.github.com/slugbyte/yuejiu',
  },
  {
    name: 'bash and gpp', 
    imageURL: require('../../asset/image/project/pink.png'),
    description: 'a proof of concept for coupling the gnu preprocessor with bash scripts for scripting exppierence taht suports modules.',
    demo: 'https://slugbyte.github.io/slugtina',
    website: 'https://slugbyte.github.io/slugtina',
    github: 'https://www.github.com/slugbyte/yuejiu',
  },
  {
    name: 'lawnjunk', 
    imageURL: require('../../asset/image/project/creamsicle.png'), 
    description: 'a junkyard of over 100 repositories of my old projects and teaching demos.',
    demo: '',
    website: '',
    github: 'https://www.github.com/lawnjunk',
  },

]
const ProjectPostItem = ({project}) => (
  <div className='project-item'>
    <h2>{project.name}</h2>
    <p> {project.description}</p>
    <a href={project.website} >website</a>
    <a href={project.github} >github</a>
    <span className='clearfix' />
    <img src={project.imageURL}/>
  </div>
)

const IndexPage = () => (
  <Layout >
    <div className='project-page'>
      <div className='project-container'>
         {projects.map((project, i ) => <ProjectPostItem key={i} project={project} />)}
      </div>
    </div>
  </Layout>
)

export default IndexPage

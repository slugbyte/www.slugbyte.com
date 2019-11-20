import './_project.scss' 

import React from 'react'
import { Link } from 'gatsby'
import Layout from '../../components/layout'
import LazyImage from '../../components/lazy-image'

let projects = [
  {
    name: 'toy', 
    imageURL: require('../../asset/image/project/500/dusk-500.png'),
    thumbnail: require('../../asset/image/project/50/dusk-50.png'),
    description: 'A micro virtual machine and assembly language with a WebUI to visulize registers and memory.',
    website: 'https://slugbyte.github.io/toy',
    github: 'https://www.github.com/slugbyte/toy',
  },
  {
    name: 'mold', 
    imageURL: require('../../asset/image/project/500/lime-500.png'),
    thumbnail: require('../../asset/image/project/50/lime-50.png'),
    description: 'A powerful system confiuration tool designed with programers in mind.',
    website: null,
    github: 'https://www.github.com/slugbyte/mold',
  },
  {
    name: 'slugtina', 
    imageURL: require('../../asset/image/project/500/peach-500.png'),
    thumbnail: require('../../asset/image/project/50/peach-50.png'),
    description: 'A fun paint application.',
    website: 'https://slugbyte.github.io/slugtina',
    github: 'https://www.github.com/slugbyte/slugtina',
  },
  {
    name: 'config', 
    imageURL: require('../../asset/image/project/500/yellow-500.png'),
    thumbnail: require('../../asset/image/project/50/yellow-50.png'),
    description: 'My dotfiles and tons of custom scripts and tooling.',
    website: null,
    github: 'https://www.github.com/slugbyte/config',
  },
  {
    name: 'slugular', 
    imageURL: require('../../asset/image/project/500/sky-500.png'),
    thumbnail: require('../../asset/image/project/50/sky-50.png'),
    description: 'A proof of concept component architecture for building web applications.',
    website: 'https://slugbyte.github.io/slugular/docs/',
    github: 'https://www.github.com/slugbyte/slugular/docs',
  },
  {
    name: 'yuejiu', 
    imageURL: require('../../asset/image/project/500/teal-500.png'),
    thumbnail: require('../../asset/image/project/50/teal-50.png'),
    description: 'a personal vim colorscheme.',
    website: null,
    github: 'https://www.github.com/slugbyte/yuejiu',
  },
  {
    name: 'bash and gpp', 
    imageURL: require('../../asset/image/project/500/pink-500.png'),
    thumbnail: require('../../asset/image/project/50/pink-50.png'),
    description: 'A proof of concept for coupling the gnu preprocessor with bash scripts for scripting exppierence taht suports modules.',
    website: null,
    github: 'https://www.github.com/slugbyte/yuejiu',
  },
  {
    name: 'lawnjunk', 
    imageURL: require('../../asset/image/project/500/creamsicle-500.png'), 
    thumbnail: require('../../asset/image/project/50/creamsicle-50.png'), 
    description: 'A junkyard of well over 100 repositories of my old projects and teaching demos.',
    website: null,
    github: 'https://www.github.com/lawnjunk',
  },
]

const ProjectPostItem = ({project}) => (
  <div className='project-item'>
    <h2>{project.name}</h2>
    <p> {project.description}</p>
    {project.website ? <a href={project.website} >website</a> : ''}
    {project.github? <a href={project.github} >github</a> : '' }
    <span className='clearfix' />
    <LazyImage image={{
      url: project.imageURL,
      thumbnail: project.thumbnail,
      description: project.description,
    }} />
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

import React from 'react'
import { Link } from 'gatsby'

import Layout from '../../components/layout'

const SecondPage = () => (
  <Layout>
    <div className='project'>
      <h1>Projects</h1>
      <div className='dot'>
        <h2>Dot</h2>
        <p className='description'></p>
        <a className='github' alt="link to dot's github repository" href="https://github.com/slugbyte/config"><i class="fab fa-github"></i></a>
  <i class="fab fa-github fa-5x"></i>
  <i class="fab fa-github"></i>
      </div>
      <div className='toy'></div>
      <div className='data-structures'></div>
      <div className='slugtina'></div>

    </div>
  </Layout>
)

export default SecondPage

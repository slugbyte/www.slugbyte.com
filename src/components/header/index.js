import './header.scss'

import PropTypes from 'prop-types'
import React from 'react'
import {Link} from 'gatsby'

import Hamburger from '../hamburger'
const Header = ({ siteTitle }) => (
  <header className='site-header'>
    <main>
      <div className='site-logo'>
        <img className='site-logo-image' src={require('../../images/slugbyte-icon.png')} alt='slugbyte.com logo' />
        <p className='site-title'><Link style={{display: 'inline'}} tabIndex={-1} to='/'><span>s</span><span>l</span><span>u</span><span>g</span><span>b</span><span>y</span><span>t</span><span>e</span><span>.</span><span>c</span><span>o</span></Link><span><Link tabIndex={-1} to='/cmFjZXRvdGhlZGVhdGgK'>m</Link></span></p>
      </div>
      <Hamburger />
    </main>
  </header>
)

export default Header

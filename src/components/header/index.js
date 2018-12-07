import './header.scss'

import PropTypes from 'prop-types'
import React from 'react'

import Hamburger from '../hamburger'

const Header = ({ siteTitle }) => (
  <header className='site-header'>
    <main>
      <div className='site-logo'>
        <img className='site-logo-image' src={require('../../images/slugbyte-icon.png')} alt='slugbyte.com logo' />
        <p className='site-title'>slugbyte.com </p>
      </div>
      <Hamburger />
    </main>
  </header>
)

export default Header

import React from 'react'
import {Link} from 'gatsby'

class Hamburger extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
    }
  }

  toggleHamburger = () => {
    this.setState(state => ({
      open: !state.open,
    }))
  }
  

  render() {
    return (
      <nav className='site-nav'>
        <div className={'hamburger' + (this.state.open ? ' selected' : '')} >
          <button aria-label='toggle navigation menu button' onClick={this.toggleHamburger} tabIndex='0' className='button'>
             <div />
             <div />
             <div />
          </button>
        </div>
        <ul className={this.state.open ? '' : 'hide'}>
          <li><Link tabIndex={this.state.open ? '0' : '-1'} to='/art'>art_</Link> </li>
          <li><Link tabIndex={this.state.open ? '0' : '-1'} to='/blog'>blog_</Link> </li>
          <li><Link tabIndex={this.state.open ? '0' : '-1'} to='/'>home_</Link> </li>
          <li><Link tabIndex={this.state.open ? '0' : '-1'} to='/contact'>contact_</Link> </li>
          <li><Link tabIndex={this.state.open ? '0' : '-1'} to='/project'>projects_</Link> </li>
        </ul>
      </nav>
    )
  }
}

export default Hamburger

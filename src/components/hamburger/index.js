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
        <div onClick={this.toggleHamburger} className={'hamburger' + (this.state.open ? ' selected' : '')} >
          <div className='button'>
             <div />
             <div />
             <div />
          </div>
        </div>
        <ul className={this.state.open ? '' : 'hide'}>
          <li><Link to='/page-2'>art_</Link> </li>
          <li><Link to='/page-2'>blog_</Link> </li>
          <li><Link to='/page-2'>home_</Link> </li>
          <li><Link to='/page-2'>contact_</Link> </li>
          <li><Link to='/page-2'>projects_</Link> </li>
        </ul>
      </nav>
    )
  }
}

export default Hamburger

import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

import logo from "./images/logo.png"

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      username: '',
      showHostingMenu: false,
    }
  }

  componentDidMount() {
    fetch('/api/authenticated')
    .then(handleErrors)
    .then(data => {
      this.setState({
        authenticated: data.authenticated,
        username: data.username,
      })
    })
  }

  showHostingMenuFunction = () => {
    this.setState({
      showHostingMenu: !this.state.showHostingMenu,
    })
  }
  logOut = e => {
    e.preventDefault();
    fetch('/api/sessions/', safeCredentials({
      method: 'DELETE',
    }))
    .then(handleErrors)
    .then(data => {
      if(data.success) {
        this.setState({
          authenticated: false,
        })
        const params = new URLSearchParams(window.location.search);
        const redirect_url = params.get('redirect_url') || '/';
        window.location = redirect_url;
      }
    })
    .catch(error => {
      this.setState({
        error: "I'm sorry you cannot sign out. Please try again.",
      })
    })
  }

  render() {
    const {authenticated, username, showHostingMenu} = this.state;
    return (
      <>
      {(authenticated) ? 
        
        <nav className='navbar navbar-expand d-flex justify-content-between' id="navbar">
          <a className="navbar-brand text-danger" href="/">
          <img src={logo} width="80" height="60" alt="Logo"/> 
          </a>
          <div>
            <a className='btn btn-my-bookings p-2 mx-2' role='button' href={`/${username}/bookings`}>Bookings</a>
            <button type='submit' className='btn btn-hosting-menu p-2 mx-2' onClick={this.showHostingMenuFunction}>
              Become a Host  
              {(showHostingMenu) ?
              (<div className='hosting-menu'>
                <ul className='list-unstyled'>
                  <li><a href={`/${username}/add-property`}>Add a new property</a></li>
                  <li><a href={`/${username}/listings`}>Listings</a></li>
                  <li><a href={`/${username}/reservations`}>Reservations</a></li>
                </ul>
              </div>) 
              : <div></div>
              }
            </button>
          </div>
          <button type='submit' className=' btn btn-danger btn-sm b-0 rounded-pill mx-4' onClick={this.logOut}>Log out @{username}</button>
        </nav>
        :
        <nav className='navbar navbar-expand d-flex justify-content-between' id='navbar'>
        <img src={logo} width="80" height="60" alt="Logo"/> 
          <a className=' btn btn-danger btn-sm b-0 rounded-pill mx-4' href='/login'>Log in</a>
        </nav>
      }

      <div className="content">
          {this.props.children}
        </div>

        <footer>
          <div className="container">
            <div className="row no-gutters mt-5 pt-5 pt-xl-5">
              <div className="col-12 col-xl-3 footerColumn_wrap">
                <h5 className="footerColumn_title my-0"><b>Support</b></h5> 
              </div>
              <div className="col-12 col-xl-3 footerColumn_wrap">
                <h5 className="footerColumn_title my-0"><b>Community</b></h5>

              </div>
              <div className="col-12 col-xl-3 footerColumn_wrap">
                <h5 className="footerColumn_title my-0"><b>Hosting</b></h5>
              </div>
              <div className="col-12 col-xl-3 footerColumn_wrap">
                <h5 className="footerColumn_title my-0"><b>About</b></h5>
              </div>
            </div>
            
              <div className="col-12 col-xl-auto order-1 order-xl-2">
                <div className="text-left text-md-center">
                </div>
              </div>
            </div>
        </footer>
      </>
    );
  }
  
}

export default Layout;
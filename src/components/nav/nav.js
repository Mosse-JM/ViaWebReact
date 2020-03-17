import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { history, Role } from '../../_helpers';
import { authenticationService, productService } from '../../_services';


import './nav.scss';

class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.isChecked || false,
      currentUser: null,
      isAdmin: false,
      isEntpnr: false,
      cartItemCount: productService.cartItemCountValue
    };
    
    this.myToggleHandler = this.myToggleHandler.bind(this);
    this.myEscHandler = this.myEscHandler.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.myEscHandler,false);
    this.subscription1 = authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x,
      isAdmin: x && x.role === Role.Admin,
      isEntpnr: x && x.role === Role.Entpnr
    })); 
    this.subscription2 = productService.cartItemCount.subscribe(x => this.setState({cartItemCount:x})) 
  }


  componentWillUnmount() {
     document.removeEventListener("keydown", this.myEscHandler,false);
     // unsubscribe to ensure no memory leaks
     this.subscription1.unsubscribe();
     this.subscription2.unsubscribe();
  }


  logout() {
    authenticationService.logout();
    history.push("/login");
    window.location.reload(true);
  }

  myToggleHandler() {
    this.setState({ isChecked: !this.state.isChecked }); 
  }
  myEscHandler(event) {
    if(event.keyCode === 27 && this.state.isChecked === true){
      this.setState({ isChecked: false });
    }
  }


  render(){
    const { currentUser, isAdmin, cartItemCount, isEntpnr } = this.state;
    const toggleDisplay = this.state.isChecked ? { display: 'block'} : { display: 'none'};
    return (
      <div onKeyPress={this.handleKeyPress}>

              {/*<!-- ************************ the top container which includes the preview(image,script)**************************************************** --> */}  
        <div id="topbar">
          <div id="menu_main">			
            <div id="menuToggle">
                <input id="check" type="checkbox" checked={this.state.isChecked} onChange={this.myToggleHandler} />
                <span></span>
                <span></span>
                <span></span>
            </div>
          </div>       
          <div id="title">
            <h1><Link to="/">Via Web</Link></h1>
          </div>
          <div id="navbar">
          {currentUser &&
            <div className="navbar navbar-expand-sm float-right h-75 mt-1" id="navbarSupported">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <Link to="/mycart" className="dropdown-item">
                      <b>Cart </b> <span className="badge badge-light">{cartItemCount}</span>
                      <span className="sr-only">unread messages</span>
                    </Link>
                  </li>
                  <div className="nav-item btn-group mr-3" >
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">profile</button>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link to="/profile" className="dropdown-item">Profile</Link>
                        {isAdmin && <Link to="/admin" className="dropdown-item">Admin</Link>}
                        {isAdmin && <Link to="/adminDashboard" className="dropdown-item"  className="dropdown-item" >Dashboard</Link>}
                        {isEntpnr && <Link to="/dashboard" className="dropdown-item"  className="dropdown-item" >Dashboard</Link>}
                        <button className="dropdown-item" onClick={this.logout}>LogOut</button>
                      </div>
                    </div>
                  </div>
                  {/*<div id="logo">
                    <h2><Link to="/">VW</Link></h2>
                  </div>*/}
                </ul>
              </div>
            </div>
            }
          </div>
        </div>
                {/*<!-- ************************ the menu **************************************************** --> */}
        <div id="menu_visard" style={toggleDisplay}>
          <div id="menu_position">
            <ul id="menu_ul">
              <li className="menu_li" onClick={this.myToggleHandler}><Link to="/productDisplay">Products</Link></li>
              <li className="menu_li" onClick={this.myToggleHandler}><Link to="/duplicates">Promotions</Link></li>
              <li className="menu_li" onClick={this.myToggleHandler}><Link to="/designs">Films</Link></li>
              <li className="menu_li" onClick={this.myToggleHandler}><Link to="/technologies">Community</Link></li>
              <li className="menu_li" onClick={this.myToggleHandler}><Link to="/about">About</Link></li>
              <li id="li_contactus" onClick={this.myToggleHandler}><Link to="/contact"><p>Leave a Post</p></Link></li>
            </ul>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Nav;

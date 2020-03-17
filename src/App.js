import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Nav from './components/nav/nav'
import {Home} from './components/home/home'
import {Login} from './components/login/login'
import {Admin} from './components/admin/admin'
import {AdminDashboard} from './components/admin/adminDashboard/adminDashboard'
import {Register} from './components/register/register'
import {Contact} from './components/contact/contact'
import {About} from './components/about/about'
import {Designs} from './components/designs/designs'
import {Profile} from './components/profile'
import {Duplicates} from './components/duplicates/duplicates'
import {Technologies} from './components/technologies/technologies'
import {Content1} from './components/content1/content1'
import {ProductDisplay} from './components/shop/productdisplay/productdisplay'
import {MyCart} from './components/shop/mycart/mycart'
import {Dashboard} from './components/shop/dashboard/dashboard'
//import Shop from './components/shop/shop'
import { history, Role } from './_helpers';
import { PrivateRoute } from './components/PrivateRoute';

import './App.css';



class App extends Component {


  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll, true);
  }


  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
  }
  
  render(){

    return (
      <Router history={history}>
        <div className="App">
        
          <Route exact Path="/" render={props => (
            <React.Fragment>
              <Nav />
            </React.Fragment>
          )}/>
          <PrivateRoute exact path="/" component = {Home}/>
          <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
          <Route path="/login" component = {Login}/> 
          <Route path="/register" component = {Register}/> 
          <Route path="/contact" component = {Contact}/>
          <Route path="/about" component = {About}/>
          <Route path="/designs" component = {Designs}/>
          <Route path="/duplicates" component = {Duplicates}/>
          <Route path="/technologies" component = {Technologies}/>
          <Route path="/content1" component = {Content1}/>
          <Route path="/profile" component = {Profile}/>
          <Route path="/productDisplay" component = {ProductDisplay}/>
          <Route path="/mycart" component = {MyCart}/>
          <Route path="/dashboard" component = {Dashboard}/>
          <Route path="/adminDashboard" component = {AdminDashboard}/>
  
        </div>
      </Router>
    );
  }

  handleScroll = () => {
    
    if(document.getElementById("myImg")){
      if (document.documentElement.clientWidth > 970){
        if (document.body.scrollTop > 130 || document.documentElement.scrollTop > 130) {
          document.getElementById("myImg").className = "blur";
          } else {
          document.getElementById("myImg").className = "";
          }
        } else{
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 30) {
          document.getElementById("myImg").className = "blur";
          } else {
          document.getElementById("myImg").className = "";
        }
      }
    }
  };

  
}

export default App;

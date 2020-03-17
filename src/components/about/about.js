import React from 'react'
import { communicationService, alertService, formValidationService} from '../../_services';
import './about.scss';
import photo4 from '../../assets/images/photo4.jpg';
import { Alert } from '../alert/Alert';
import {Foot} from '../foot/foot'; 
import { Link } from 'react-router-dom';

class About extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          Email: '',
          Name: '',
          Message: '',
          Subscribed: false,
          formErrors: {Email:'', Name:'', Message:''},
          formValid: {emailValid:false, messageValid:false, nameValid:false },
          fValid:false
        };
        this.OnSend = this.OnSend.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.alertCheck = this.alertCheck.bind(this);
    }

    handleInputChange(event) {
        this.setState({fValid: false})
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState(
          {[name]: value},//callback function
          () => { formValidationService.validateField(name, value)});
          this.setState({fValid: false})       
        if(this.state.formValid.emailValid && this.state.formValid.messageValid && this.state.formValid.nameValid ){
        this.setState({fValid: true})};
    }

    componentDidMount(){
        this.subscription1 = formValidationService.formIsValid.subscribe(x => this.setState({formValid:x}));
        this.subscription2 = formValidationService.formErrrs.subscribe(x => this.setState({formErrors:x}))  
    }

    componentWillUnmount(){
        this.setState({formErrors:{},formIsValid:false})
        this.subscription1.unsubscribe();
        this.subscription2.unsubscribe();
    }

    alertCheck(e){
        alertService.warn(this.state.formErrors[e.target.name], { id: 'formAlert', autoClose: true })
    }
       
    OnSend(){
        let formData = new FormData();
        formData.append('Name', this.state.Name);
        formData.append('Email', this.state.Email);
        formData.append('Text', this.state.Message);
        formData.append('Subscribed', this.state.Subscribed);
        if (!formData) return;
        communicationService.sendMessage(formData)
                .then((res) => {  
                console.log(res);
                this.refs.input.value = '' ;
                this.refs.inpu.value = '' ;
                this.refs.inp.value = '' ;      
                });
        alertService.success('Success!!', { id: 'formAlert', autoClose: true })
    }

    render(){
    return(
        <div id="about_menu">
          <div>
            <div id="brief">
                <h4 >
                  <b>Employed Technologies:</b>
                </h4>
                <br/>
                    The <Link to="/" ><b>Home Page</b></Link>  was writen in pure HTML, CSS and JQuery + WebPack & Gulp.
                    Clone the files from my Github ripository here: <a href="https://github.com/Mosse-JM/ViaWeb.git" target="_blank" rel="noopener noreferrer" className="btn btn-link">HTML,CSS,JQuery</a>
                    <br/>
                    The rest was developed first in Angular then by React, beside Bootstrap, Sass + WebPack and you can clone the
                    <a href="https://github.com/Mosse-JM/ViaWebAngular.git" target="_blank" rel="noopener noreferrer" className="btn btn-link">Angular Files</a> &
                    <a href="https://github.com/Mosse-JM/ViaWebReact.git" target="_blank" rel="noopener noreferrer" className="btn btn-link">React Files</a>
                    <button type="button" className="btn btn-link">Angular Files</button>
                    <br/> Finally the API was developed by ASP.Net and C# + SQL and SQlite, find the files here:
                    <a href="https://github.com/Mosse-JM/ViaWebAPI.git" target="_blank" rel="noopener noreferrer" className="btn btn-link">API Files</a> 
            </div>
            <div id="mid">
                <div id="pic">
                  <img src={photo4} alt="icon"/>
                </div>
                <table className="table table-responsive" style={{display: "inline", marginleft:"5px"}} >
                  <tbody>
                  <tr>
                  </tr>
                  <tr>
                    
                    <td> <Link to="/register" className="btn btn-link"><b>Register/Login </b></Link></td>
                    <td>JWT and Role Based Authentication and Autorization</td>
                  </tr>
                  <tr>
                    
                    <td> <Link to="/adminDashboard" className="btn btn-link"><b>Dashboard</b></Link></td>
                    <td>A dashboard to upload the products and receive the order details</td>
                  </tr>
                  <tr>
                    
                    <td> <Link to="/productDisplay" className="btn btn-link"><b>Products</b></Link></td>
                    <td> display products</td>
                  </tr>
                  <tr>
                    
                    <td> <Link to="/mycart" className="btn btn-link"><b>Cart </b></Link></td>
                    <td>the cart to proceed the payment</td>
                  </tr>
                  <tr>
                    
                    <td> <Link to="/contact" className="btn btn-link"><b>Comment </b></Link></td>
                    <td>Post component: Users can Comment + Admin can Reply and Delete</td>
                  </tr>
                  <tr>
                    
                    <td> <Link to="/admin" className="btn btn-link"><b>Admin </b></Link></td>
                    <td>AdminDashboard to manage the Users and recieves the Mesages</td>
                  </tr>
                  <tr>
                    
                    <td> <Link to="/profile" className="btn btn-link"><b>profile</b></Link></td>
                    <td>User's page + TodoLists</td>
                  </tr>
                  
                  </tbody>
              </table>
            </div>

            <div id="last_column">
                
                <br />
                <br />
                <a href="https://www.linkedin.com/in/mohsen-janmohammadi-86060697" target="_blank" rel="noopener noreferrer" className="btn btn-link">Visit My Linkedin</a>
                <br />
                <br />
                <form>
                <div>
                    <h4 >Write to Me</h4>
                </div>
                <div >
                    <div >
                    <label>
                        Name
                        <input
                        name="Name"
                        type="text"
                        ref="input"
                        placeholder= "required"
                        value={this.state.Name}
                        onBlur={this.alertCheck}
                        onChange={this.handleInputChange}/>
                    </label>
                    </div>

                    <div >
                    <label>
                        Email
                        <input
                        ref="inpu"
                        name="Email"
                        type="text"
                        placeholder= "required"
                        value={this.state.Email}
                        onBlur={this.alertCheck}
                        onChange={this.handleInputChange}/>
                    </label>
                    </div>

                    <div >
                    <label>
                        Message
                        <textarea 
                        ref="inp"
                        name="Message"
                        type="text"
                        placeholder= "required"
                        onBlur={this.alertCheck}
                        value={this.state.Message}
                        onChange={this.handleInputChange}/>
                    </label>
                    </div>

                    <div >
                    <label>
                        Subsscribe
                        <input
                        name="Subscribed"
                        type="checkbox"
                        checked={this.state.Subscribed}
                        onChange={this.handleInputChange}/>
                    </label>
                    </div>

                </div>
                <Alert id="formAlert"/>
                </form>
                <button type="button" onClick={this.OnSend} disabled={!this.state.fValid} className="btn btn-primary btn-sm">Send</button >
            </div>
            </div>
            <Foot />
        </div>

    )
}
}
export { About};


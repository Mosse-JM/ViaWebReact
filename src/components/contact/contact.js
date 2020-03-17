import React from 'react'
import './contact.scss';
import {Posts} from '../posts/posts'
import {communicationService, alertService } from '../../_services';
//import PropTypes from 'prop-types'
import { Alert } from '../alert/Alert';
import {Foot} from '../foot/foot'; 

class Contact extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
        
          Link: '',
          Post: '',
    
        };
        this.OnSend = this.OnSend.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    

    OnSend(){
        let formData = new FormData();
        formData.append('Link', this.state.Link);
        formData.append('Text', this.state.Post);

        communicationService.sendComment(formData)
                .then((res) => {  
                console.log(res);
                this.refs.child.loadAllComments();
                alertService.success('posted', { id: 'formAlert', autoClose: true }); 
                this.setState({
                    Link: '',
                    Post: '',
                  });          
                });
    }

    render() {
        //const { comments} = this.state;
        return (
        <div id="contact">
        <div>
            <div id="posts">
                <Posts ref="child"/>
            </div>
            <div id="postIt">
                <h3>Leave a Post</h3>
                <br/>
                <form  >
                    <div >
                    <label>
                        Head:
                        <input
                        name="Link"
                        type="text"
                        value={this.state.Link}
                        onChange={this.handleInputChange}/>
                    </label>
                    </div>

                    <div >
                    <label>
                        body:
                        <textarea 
                        name="Post"
                        type="text"
                        maxLength={50}
                        value={this.state.Post}
                        onChange={this.handleInputChange}/>
                    </label>
                    </div>

                    <button type="button" onClick={this.OnSend}  className="btn btn-primary btn-sm">Post</button >
                    <Alert id="formAlert"/>
                </form>
            </div>
            </div>
            <Foot />
        </div>
    );
    }
}
Contact.propTypes = {
    //comments: PropTypes.array.isRequired,
    //functionName: PropTypes.func.isRequired,
    //functionName: PropTypes.func.isRequired,
}

export { Contact};

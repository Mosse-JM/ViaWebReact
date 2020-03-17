import React from 'react'
import './posts.scss';
import {communicationService, authenticationService} from '../../_services';
import { Role } from '../../_helpers/role';
//import PropTypes from 'prop-types'
//import { Alert } from '../alert/Alert';


class Posts extends React.Component  {

    constructor(props) {
        super(props);
    
        this.state = {
          RComment:[],
          Link: '',
          Post: '',
          currentUser: null,
          isAdmin: false,
          comments:null,
    
        };
        this.OnDelete = this.OnDelete.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.loadAllComments = this.loadAllComments.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    //this.sharedService.isThereNewComment.subscribe( value => {
      //this.isThereNewComment = value;
    handleInputChange(event) {
      const target = event.target;
      const rply = target.value;
      //const name = target.name;
      const id = target.id;
      this.setState({
        RComment: {...this.state.RComment, id,rply}
      });
      //let res = {...this.state.RComment};
      //console.log(res)
    }  

    componentDidMount() {
        this.loadAllComments();
        this.subscription1 = authenticationService.currentUser.subscribe(x => this.setState({
          currentUser: x,
          isAdmin: x && x.role === Role.Admin
        }));
    }

    componentWillUnmount(){
      this.subscription1.unsubscribe();
      this.setState({ 
        comments: null,
      })
    }


    loadAllComments() {
        communicationService.getAllComments()
        .then(comments => this.setState({ comments }));
    }
    OnDelete(id){
        communicationService.deleteComment(id)
            .then(() => this.loadAllComments());
    }
  
    updateComment(comment){
      communicationService.getCommentById(comment.id)
      .then((comment) => {
        comment.rComment = this.state.RComment.rply;
        communicationService.updateComment(comment)
        .then((comment) =>{
          this.loadAllComments();
          this.refs.input.value = '';
          this.setState({ RComment:[] });
          console.log(comment)})
      })
      
    }


    render() {
      const { comments, isAdmin, currentUser} = this.state;
      //const { comments} = this.props;

      return (

        <div id="posts">
          <h3>Posts</h3>
          {comments &&
          <ul>
            {comments.map(cmt =>
            <li key={cmt.id}>
              <div>
                <button type="button" className="btn btn-link"><h3>{ cmt.link }</h3></button>
                <p>{cmt.text}</p>
                {cmt.rComment && <p><b>admin replied: </b>{cmt.rComment}</p>}
              </div>
              {currentUser && isAdmin && 
              <div>
                <div >
                    <label >
                        <input
                        ref="input" 
                        id={cmt.id}
                        name="RComment"
                        type="text" 
                        onChange={this.handleInputChange} 
                        onFocus={this.state.RComment.id === cmt.id ? this.state.RComment.rply : undefined}//{this.value = this.state.RComment.id == cmt.id && this.state.RComment.rply}
                        />
                        <button type="button" className="btn btn-primary btn-sm" onClick={this.updateComment.bind(this, cmt)}><b>Reply</b></button>
                        <button type="button" className="btn btn-danger btn-sm" onClick={this.OnDelete.bind(this, cmt.id)}><b>Delete</b></button>
                    </label>
                </div>
              </div>
              }
            </li>
            )}
          </ul>
          }
        </div>

      )
    }
}
Posts.propTypes = {
  //comments: PropTypes.array.isRequired,
  //functionName: PropTypes.func.isRequired,
  //functionName: PropTypes.func.isRequired,
}
export { Posts};

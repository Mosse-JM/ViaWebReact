import React from 'react';
import './admin.scss';
import { userService, communicationService, alertService } from '../../_services';
import { Alert } from '../alert/Alert';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
            messages: null
        };
        this.deleteUser = this.deleteUser.bind(this);
        this.loadAllUsers = this.loadAllUsers.bind(this);
        this.OnDelete = this.OnDelete.bind(this);
        this.loadAllMessages = this.loadAllMessages.bind(this);
    }

    componentDidMount() {
        this.loadAllUsers();
        this.loadAllMessages() ;
    }
    componentWillUnmount(){
        this.setState({ 
            users: null,
            messages: null
         })
    }

    loadAllMessages() {
        communicationService.getAllMessages()
        .then(messages => this.setState({ messages }))
    }

    deleteUser(id) {
        if(id)
        userService.delete(id)
            .then(() => this.loadAllUsers(),
            alertService.error('user Deleted!', { id: 'userAlert',autoClose: true }));
        
    }
    loadAllUsers() {
        userService.getAll()
        .then(users => this.setState({ users }));
    }
    OnDelete(id){
        if(id)
        communicationService.deleteMessage(id)
            .then(() => this.loadAllMessages(),
            alertService.error('message Deleted!', { id: 'messageAlert',autoClose: true }));
        
    }

    render() {
        const { users, messages } = this.state;
        return (
            <div id="adminTag" >
            <br/>
                <h1>Admin</h1>
                <p>This page can only be accessed by administrators.</p>
                <div id="accordion" >
                    <div className="card" title="Users" >
                        <div className="card-header" id="headingOne">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            &#9733; <b>Users</b>&#9733;
                        </button>
                        </div>
                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                            <div className="tab-content">
                                <div>
                                {users &&
                                    <ul>
                                        {users.map(user =>
                                            <li key={user.id}>
                                                {user.firstName} {user.lastName}
                                                - <button onClick={this.deleteUser.bind(this, user.id)} className="text-danger">Delete</button>
                                            </li>
                                        )}
                                    </ul>
                                }
                                <Alert id="userAlert"/>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                
                
                <div id="accordion" >
                    <div className="card" title="messages" >
                        <div className="card-header" id="headingTwo">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                &#9733; <b>Messages</b>&#9733;
                            </button>
                        </div>
                        <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div className="card-body">
                            <div className="tab-content">
                            <table>
                                <thead>
                                <tr className="col-md-12">
                                    <td className="col-md-6"><h2>Messages</h2></td>        
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="col-md-12">
                                    <td className="col-md-12">
                                    <table className="table table-bordered  table-hover">
                                        <thead className="thead-light">
                                        <tr>
                                        <th>Name </th>
                                        <th>Email</th>
                                        <th>Text</th>
                                        <th>Is Subscribed</th>
                                        </tr>
                                        </thead>
                                        {messages &&
                                        <tbody >
                                        {messages.map(msg =>
                                        <tr key={msg.id}>
                                            <td className="text-center">{msg.name}</td>
                                            <td>{msg.email}</td>
                                            <td>{msg.text}</td>
                                            <td>{msg.subscribed.toString()}</td>
                                            <td >
                                                <button type="button" className="btn btn-outline-success" onClick={this.OnDelete.bind(this, msg.id)}><b>Delete</b></button>
                                            </td>
                                        </tr>
                                        )}
                                        </tbody>
                                        }
                                    </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <Alert id="messageAlert"/>
                            </div>
                            </div > 
                        </div > 
                    </div >
                </div >
            </div>
        );
    }
}

export { Admin };
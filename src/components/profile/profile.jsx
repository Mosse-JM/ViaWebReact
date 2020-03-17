import React from 'react';
import './profile.scss';
import { userService, authenticationService, alertService } from '../../_services';
import Todo from '../todo/todo'
import { Alert } from '../alert/Alert';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            user: null
        };
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {

    }


    deleteUser(id) {
        userService.delete(id)
        .then(
            () => {authenticationService.logout();
            this.props.history.push('/login')
            },
            alertService.error('user Deleted!', { id: 'userAlert',autoClose: true }));
    }

    render() {
        const { currentUser} = this.state;
        return (
            <div id="profileTag">
                <h1>Hi {currentUser.firstName}!</h1>
                - you can delete your account: <button onClick={this.deleteUser.bind(this, currentUser.id)} className="text-danger">Delete</button>
                <Alert id="userAlert"/>
                <div>
                    <Todo/>
                </div> 
            </div>
        );
    }
}

export { Profile };
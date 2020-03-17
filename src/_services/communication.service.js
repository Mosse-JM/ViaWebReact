import { BehaviorSubject } from 'rxjs';
//import axios from 'axios';
//import axios, { post } from 'axios';
import { authHeader, handleResponse } from '../_helpers';

const addedCommentSubject = new BehaviorSubject("");

export const communicationService = {

    sendMessage,
    getAllMessages,
    deleteMessage,
    sendComment,
    getAllComments,
    getCommentById,
    deleteComment,
    updateComment,
    addedComment: addedCommentSubject.asObservable(),
    get addedCommentValue () { return addedCommentSubject.value },
    updateCommentAfterAdd
};

const commentApiURL=`http://localhost:4000/api/Communication/Comments`;
const messageApiURL=`http://localhost:4000/api/Communication/Message`;



function getAllMessages(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(messageApiURL, requestOptions).then(handleResponse);
}

function sendMessage (formData) {
    const requestOptions = {
        method: 'POST',
        //headers: {...authHeader(), 'Content-Type': 'multipart/form-data' },
        body: formData
    };
    return fetch(messageApiURL, requestOptions)
            .then(handleResponse);

    //return  post(`http://localhost:4000/api/Product`, prod,requestOptions)
}


function deleteMessage(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`http://localhost:4000/api/Communication/Message/${id}`, requestOptions).then(handleResponse);
}

function getAllComments(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(commentApiURL, requestOptions).then(handleResponse);
}

function getCommentById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost:4000/api/Communication/Comments/${id}`, requestOptions).then(handleResponse);
}

function sendComment (formData) {
    const requestOptions = {
        method: 'POST',
        //headers: {...authHeader(), 'Content-Type': 'multipart/form-data' },
        body: formData
    };
    return fetch(commentApiURL, requestOptions)
            .then(handleResponse);
}

function deleteComment(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`http://localhost:4000/api/Communication/Comments/${id}`, requestOptions).then(handleResponse);
}

function updateComment(comment) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    };

    return fetch(commentApiURL, requestOptions).then(handleResponse);;
}

function updateCommentAfterAdd(cmt) {
    addedCommentSubject.next(cmt)
}

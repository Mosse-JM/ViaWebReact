import { BehaviorSubject } from 'rxjs';
//import axios from 'axios';
//import axios, { post } from 'axios';
import { authHeader, handleResponse } from '../_helpers';

let count = 0;
if(localStorage.getItem('product') != null){
    count = JSON.parse(localStorage.getItem('product')).length
}
const cartItemCountSubject = new BehaviorSubject(count);

export const productService = {

    placeOrder,
    getAllOrders,
    saveProductInfo,
    getAllProducts,
    getById,
    update,
    delete: _delete,
    addProductToCart,
    getProductFromCart,
    removeAllProductFromCart,
    cartItemCount: cartItemCountSubject.asObservable(),
    get cartItemCountValue () { return cartItemCountSubject.value },
    updateCartCount
};


function placeOrder (orderDetail)
{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetail)
    };
    console.log(orderDetail + ": placed succussfully");
    return fetch(`http://localhost:4000/api/OrderDetail`, requestOptions)
            .then(handleResponse);
}

function getAllOrders()
{
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:4000/api/OrderDetail`, requestOptions).then(handleResponse);
}


function getAllProducts() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:4000/api/Product`, requestOptions).then(handleResponse);
}



function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost:4000/api/Product/${id}`, requestOptions).then(handleResponse);
}

function saveProductInfo(prod) {
    const requestOptions = {
        method: 'POST',
        //headers: {...authHeader(), 'Content-Type': 'multipart/form-data' },
        body: prod
    };
    return fetch(`http://localhost:4000/api/Product`, requestOptions)
            .then(handleResponse);

    //return  post(`http://localhost:4000/api/Product`, prod,requestOptions)
}

function update(prod) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(prod)
    };

    return fetch(`http://localhost:4000/api/Product/${prod.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`http://localhost:4000/api/Product/${id}`, requestOptions).then(handleResponse);
}

function updateCartCount(num) {
    cartItemCountSubject.next(num)
}

function addProductToCart(product) {
    localStorage.setItem("product", JSON.stringify(product));
}

function getProductFromCart() {
    //return localStorage.getItem("product");
    return JSON.parse(localStorage.getItem("product"));
}

function removeAllProductFromCart() {
    localStorage.removeItem("product");
    this.updateCartCount(0);
}
/*  
function  errorHandler(error: Response) {  
    console.log(error);  
    return throwError(error);  
} */


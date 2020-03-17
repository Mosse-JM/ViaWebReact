import React from 'react';
import { productService, alertService, formValidationService } from '../../../_services';
import './mycart.scss';
import { Alert } from '../../alert/Alert';

class MyCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productsAddedTocart: [],
      cartHasProduct : false,
      cartItemCount: productService.cartItemCountValue,
      formErrors: {Email:'', Name:'', Address:'',Phone:''},
      formValid: {emailValid:false, addressValid:false, nameValid:false, phoneValid:false },
      fValid:false,
      //deliveryForm: {
          Name: '',
          Address: '',
          Phone: '',
          Email: '',
          Message: '',
          Amount: 0,
      //},
      orderItem : []
    };

    this.ContinueToPay = this.ContinueToPay.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.ContinueToPay = this.ContinueToPay.bind(this);
    this.calculteAllTotal = this.calculteAllTotal.bind(this);
    this.onAddQuantity = this.onAddQuantity.bind(this);
    this.onRemoveQuantity = this.onRemoveQuantity.bind(this);
    this.mapOrderItem = this.mapOrderItem.bind(this);
    this.alertCheck = this.alertCheck.bind(this);
  }

  componentDidMount() {     
    let prods = productService.getProductFromCart();
    if(prods != null) {
    for (let i in prods) {
      prods[i].orderedQuantity=1;
    };
    this.calculteAllTotal(prods);
    this.setState({ productsAddedTocart:prods, cartHasProduct:true});
    }
    this.subscription1 = formValidationService.formIsValid.subscribe(x => this.setState({formValid:x}));
    this.subscription2 = formValidationService.formErrrs.subscribe(x => this.setState({formErrors:x}))
  }



  componentWillUnmount(){
    this.setState({formErrors:{},formIsValid:false, productsAddedTocart: [],orderItem : []})
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
}

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    },//callback function
    () => { formValidationService.validateField(name, value)});
    this.setState({fValid: false})     
    if(this.state.formValid.emailValid && this.state.formValid.nameValid && this.state.formValid.phoneValid && this.state.formValid.addressValid ){
    this.setState({fValid: true})};
  }

  alertCheck(e){
    alertService.warn(this.state.formErrors[e.target.name], { id: 'formAlert', autoClose: true })
  }

  mapOrderItem(){  
    this.setState({orderItem : []});
    for (let i in this.state.productsAddedTocart) {
      this.state.orderItem.push({
        productId:this.state.productsAddedTocart[i].id,
        sellerId:this.state.productsAddedTocart[i].sellerId,
        productName:this.state.productsAddedTocart[i].name,
        orderedQuantity:this.state.productsAddedTocart[i].orderedQuantity,
        perUnitPrice:this.state.productsAddedTocart[i].unitPrice,
      });
    }
  }

  ContinueToPay()
  { 
    const date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var seconds = date.getSeconds();
    var dateTimeStamp=day.toString()+monthIndex.toString()+year.toString()+minutes.toString()+hours.toString()+seconds.toString();

    if(this.state.productsAddedTocart[0]!==null){
      //Assigning the ordered item details
      this.mapOrderItem();


      //So now compelte object of order is
      let orderDetail={};  
      orderDetail.orderItems=this.state.orderItem;

      //Orderdetail is object which hold all the value, which needs to be saved into database

      orderDetail.CustomerName = this.state.Name;
      orderDetail.DeliveryAddress = this.state.Address;
      orderDetail.Phone = this.state.Phone;
      orderDetail.Email = this.state.Email;
      orderDetail.Message = this.state.Message;
      orderDetail.PaymentRefrenceId = orderDetail.orderItems +"-"+"orderId"+"-"+orderDetail.CustomerName+"-"+dateTimeStamp;
      orderDetail.orderPayMethod = "ByCard";

      productService.placeOrder(orderDetail)
              .then((res) => {
                console.log(res);
                this.refs.input.value = '' ;
                this.refs.inpu.value = '' ;
                this.refs.inp.value = '' ;
                this.refs.inpp.value = '' ;
                this.refs.inppp.value = '' ;              
              });
      alertService.info('your order Placed, you can proceed to pay', { id: 'continueToPayAlert', autoClose: true })
      productService.removeAllProductFromCart();
      this.setState({fValid: false,cartHasProduct : false})
    }else
    alertService.info('Cart Empty!', { id: 'continueToPayAlert', autoClose: true })
  }

  onAddQuantity(prod)
  { 
    this.state.productsAddedTocart.find(p=>p.id===prod.id).orderedQuantity = prod.orderedQuantity+1;
    //productService.removeAllProductFromCart();
    productService.addProductToCart(this.state.productsAddedTocart);
    this.calculteAllTotal(this.state.productsAddedTocart);
    //this.mypersonalinput.dispatchEvent(new Event('input', { bubbles: true }));
  }
  onRemoveQuantity(prod)
  { 

    this.state.productsAddedTocart.find(p=>p.id===prod.id).orderedQuantity = prod.orderedQuantity-1;
    //productService.removeAllProductFromCart();
    productService.addProductToCart(this.state.productsAddedTocart);
    this.calculteAllTotal(this.state.productsAddedTocart);
  }
  calculteAllTotal(allItems)
  {
    let total=0;
    for (let i in allItems) {
      total= total+(allItems[i].orderedQuantity *allItems[i].unitPrice);
    }
    this.setState({Amount:total});
  }

  render(){
    const { productsAddedTocart, cartHasProduct } = this.state;
    return(

      <div id="mycart">
        <div id="accordion">
          <div className="card" >
            <div className="card-header" id="headingOne"> 
              <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  <h3 style={{color:"rgb(110, 61, 26)"}}>Items in your cart</h3>
              </button>
            </div>
            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div className="card-body">
                <table className="table table-bordered table-responsive table-hover">
                  <thead className="thead-light">
                  <tr>
                    <th>Image</th>
                    <th>Name & Description</th>
                    <th>Price</th>
                    <th>AvailableQuantity</th>
                    <th>OrderedNumber</th>
                    <th>Total For Item</th>
                  </tr>
                  </thead>
                  {cartHasProduct && productsAddedTocart.map(prod =>
                  <tbody key={prod.id}>
                  <tr >
                    <td><img src={'data:image/jpeg;base64,' + prod.images}  alt="poduct N" width="150px;" height="170px;"/></td>
                    <td className="text-center">{prod.name}-{prod.description}</td>
                    <td>{prod.unitPrice}</td>
                    <td>{prod.quantity}</td>
                    <td>
                      <div className="form-inline">
                      <button type="button" className="btn btn-success" onClick={this.onAddQuantity.bind(this, prod)}>+</button> 
                      <input type="text"  readOnly className="form-control form-inline" id="count" value={prod.orderedQuantity}></input>
                      <button type="button" className="btn btn-danger" onClick={this.onRemoveQuantity.bind(this, prod)}>-</button>
                      </div>
                    </td>
                    <td>{prod.unitPrice * prod.orderedQuantity}</td>
                  </tr>
                  </tbody>
                  )}
                </table>
              </div>   
            </div>
          </div >
          <div className="card">
            <div className="card-header" id="headingTwo">
              <button className="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  &#9733; <b>Delivery Address</b>&#9733;
              </button>
            </div>
            <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
              <div className="card-body">
                <div className="tab-content">
                    <form>
                        <div className="form-group">
                          <div className="col-md-12">
                            <label>
                              Name:
                              <input
                                name="Name"
                                type="text"
                                ref="input"
                                placeholder= "required"
                                onBlur={this.alertCheck}
                                value={this.state.Name}
                                onChange={this.handleInputChange} />
                            </label>
                          </div>
                          <div className="col-md-12">
                            <label>
                            Delivery Address:
                              <textarea
                                name="Address"
                                id="textarea"
                                ref="inpu"
                                placeholder= "required"
                                onBlur={this.alertCheck}
                                value={this.state.DeliveryAddress}
                                onChange={this.handleInputChange} />
                            </label>
                          </div>
                          <div className="col-md-12">
                            <label>
                              Phone:
                              <input
                                name="Phone"
                                type="text"
                                ref="inp"
                                placeholder= "required"
                                onBlur={this.alertCheck}
                                value={this.state.Phone}
                                onChange={this.handleInputChange} />
                            </label>
                          </div>
                          <div className="col-md-12">
                            <label>
                            Email:
                              <input
                                name="Email"
                                type="text"
                                ref="inpp"
                                placeholder= "required"
                                onBlur={this.alertCheck}
                                value={this.state.Email}
                                onChange={this.handleInputChange} />
                            </label>
                          </div>
                          <div className="col-md-12">
                            <label>
                              Special Message/ Instructions:
                              <input
                                name="Message"
                                type="text"
                                ref="inppp"
                                value={this.state.Message}
                                onChange={this.handleInputChange} />
                            </label>
                          </div>
                          <div className="col-md-12">
                            <label>
                              Total Amount To Pay:
                              <input
                                name="Amount"
                                readOnly
                                type="text"
                                value={this.state.Amount}/>
                            </label>
                          </div>
                        </div>
                        <button type="button"  className="btn btn-outline-success" disabled={!this.state.fValid} onClick={this.ContinueToPay} ><b>ContinueToPay</b></button>
                        <Alert id="formAlert"/>
                    </form>
                    <Alert id="continueToPayAlert"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }     
}
export { MyCart };



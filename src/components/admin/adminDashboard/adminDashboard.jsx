import React from 'react';
import { authenticationService,productService, alertService, formValidationService } from '../../../_services';
import './adminDashboard.scss';
import { Alert } from '../../alert/Alert';

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
      currentUser: authenticationService.currentUserValue,
      orders: [],
      orderIts:[],
      files: [],
      Address: '',
      Name: '',
      Description: '',
      Price: 0,
      Category: 'Cloths',
      Quantity: 0,
      Conditions: '',
      image_file : null,
      image_preview: '',
      formErrors: {Name:'', Address:'', Quantity:''},
      formValid: {addressValid:false, nameValid:false },
      fValid:false

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlefile = this.handlefile.bind(this);
    this.OnSaveProduct = this.OnSaveProduct.bind(this);
    this.loadOrders = this.loadOrders.bind(this);
    this.fileInput = React.createRef();
    this.alertCheck = this.alertCheck.bind(this);
  }


  componentDidMount(){
    this.loadOrders();
    this.subscription1 = formValidationService.formIsValid.subscribe(x => this.setState({formValid:x}));
    this.subscription2 = formValidationService.formErrrs.subscribe(x => this.setState({formErrors:x}))  
  }

  componentWillUnmount(){
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
      this.setState({ 
        orders: [],
        formErrors:{},
        formIsValid:false
      })
  }

  loadOrders(){
    productService.getAllOrders()
            .then(orders => {
            this.setState({ orders});
            orders.map(ord=>console.log(ord))}
            );  
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {[name]: value},//callback function
      () => { formValidationService.validateField(name, value)}
    );

    this.setState({fValid: false})    
    if(this.state.formValid.addressValid && this.state.formValid.nameValid ){
    this.setState({fValid: true})};
  }
  
  handlefile(event) {
    event.preventDefault();
    let image_as_base64 = URL.createObjectURL(event.target.files[0])
    let image_as_files = event.target.files[0];
    this.setState({
      image_preview: image_as_base64,
      image_file: image_as_files
    })
    
  }
  alertCheck(e){
    alertService.warn(this.state.formErrors[e.target.name], { id: 'formAlert', autoClose: true })
  }


  OnSaveProduct()
  {
    if (!this.state.image_file) 
    return (alertService.error('not valid formdata/imageFile', { id: 'formAlert',autoClose: true }));

    let formData = new FormData();
    formData.append(this.state.image_file.name, this.state.image_file);
    /*for (let file of this.state.image_file){
      formData.append(file.name, file);
      console.log(file.name)
    }*/
    formData.append('Name', this.state.Name);
    formData.append('Description', this.state.Description);
    formData.append('UnitPrice', this.state.Price);
    formData.append('Category', this.state.Category);
    formData.append('Quantity', this.state.Quantity);
    formData.append('BillingAddress', this.state.Address);
    formData.append('TC', this.state.Conditions);
    formData.append('SellerId', this.state.currentUser.id.toString());
    formData.append('SellerName', this.state.currentUser.firstName);
    

    productService.saveProductInfo(formData)
            .then((res) => {  
              console.log(res);
              this.refs.input.value = '' ;
              this.refs.inpu.value = '' ;
              this.refs.inp.value = '' ;            
            });
    alertService.success('Success!!', { id: 'formAlert',autoClose: true });
    this.setState({fValid: false})
  }
  

  ConfirmOrder(){
    alertService.info('order already confirmed, the button is a demo', { id: 'ConfirmOrder',autoClose: true })
  }

  render(){
    const { currentUser, orders} = this.state;
    return(

      <div id="dashboard">
        <div id="accordion">
          <div className="card" title="Confirm Your Order" >
              <div className="card-header" id="headingOne">
                  <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                      &#9733; <b>Orders</b>&#9733;
                  </button>
                </div>
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                  <div className="card-body">
                    <div className="tab-content">
                    <table>
                      <thead className="thead-light">
                      <tr className="col-md-12">
                        <th className="col-md-6"><h2>Item Details</h2></th>
                        <th className="col-md-6"><h2>Delivery Details</h2></th>          
                      </tr>
                      </thead>
                      <tbody>
                      <tr className="col-md-12">
                        <td className="col-md-6">
                          <table className="table table-bordered  table-hover">
                              <thead className="thead-light">
                              <tr>
                                <th>Name & Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total paid</th>
                              </tr>
                              </thead>
                              <tbody>
                                {orders && orders.map(ords => ords.orderItems.map(ordIt =>
                                <tr key={ordIt.orderItemId}>
                                  <td className="text-center">{ordIt.productName}</td>
                                  <td>{ordIt.perUnitPrice}</td>
                                  <td>{ordIt.orderedQuantity}</td>
                                  <td>total paid</td>
                                </tr>
                                ))}
                              </tbody>
                            </table>
                        </td>
                        <td className="col-md-6">
                            <table className="table table-bordered  table-hover">
                              <thead className="thead-light">
                              <tr>
                                <th>Name</th>
                                <th>Delivery Address</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Message</th>
                              </tr>
                              </thead>
                              <tbody >
                              {orders && orders.map(ord =>
                              <tr key={ord.orderDetailId}>
                                <td>{ord.customerName}</td>
                                <td>{ord.deliveryAddress}</td>
                                <td>{ord.phone}</td>
                                <td>{ord.email}</td>
                                <td>{ord.message}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-success btn-sm" onClick={this.ConfirmOrder} ><b>Confirm</b></button>
                                </td>
                              </tr>
                              )}
                              </tbody>
                              <Alert id="ConfirmOrder"/>
                            </table>
                          </td>
                      </tr>
                      </tbody>
                    </table>

                    </div>
                  </div > 
              </div > 
            </div >
        </div >
        <div id="accordion">
          <div className="card" title="ProductDashboard" >
              <div className="card-header" id="headingTwo">
                  <button className="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      &#9733; <b>Upload Product Detail</b>&#9733;
                  </button>
                </div>
                <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                  <div className="card-body">
                    <div className="tab-content">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" >
                          <div ><b>Add Admin Products</b> </div>
                          <div className="tab-content">
                            <br/>
                            <form  encType="multipart/form-data" >
                              <div className="form-group">
                                  <div className="row">
                                    <div className="col-md-2">
                                      <label  style={{color: "lightseagreen",fontsize: "medium"}} ><b>Seller Name-Id*:</b></label>
                                    </div>
                                    {currentUser &&
                                    <div className="col-md-6" >{currentUser.firstName} {currentUser.lastName} {currentUser.id}
                                    </div> }
                                    <div className="col-md-4">
                                    </div> 
                                  </div>
                                  <br/>
                                  <div className="row">
                                    <label>
                                      Billing Address:
                                      <input
                                        name="Address"
                                        type="text"
                                        ref="input"
                                        placeholder= "required"
                                        onBlur={this.alertCheck}
                                        value={this.state.Address}
                                        onChange={this.handleInputChange} />
                                    </label>
                                  </div>
                                  <br/>
                                  <div className="row">
                                    <label>
                                      Product Name:
                                      <input
                                        name="Name"
                                        type="text"
                                        ref="inpu"
                                        placeholder= "required"
                                        onBlur={this.alertCheck}
                                        value={this.state.Name}
                                        onChange={this.handleInputChange} />
                                    </label>
                                  </div>
                                  <br/>
                                  <div className="row">
                                    <label>
                                      Description:
                                      <input
                                        name="Description"
                                        type="text"
                                        value={this.state.Description}
                                        onChange={this.handleInputChange} />
                                    </label>
                                  </div>
                                  <br/>
                                  <div className="row">
                                    <label>
                                      Per Unit Price:
                                      <input
                                        name="Price"
                                        type="number"
                                        value={this.state.Price}
                                        onChange={this.handleInputChange} />
                                    </label>
                                  </div>
                                  <br/>
                                  <div className="row">
                                    <label>
                                      Category:
                                      <select name="Category" value={this.state.Category} onChange={this.handleInputChange}>
                                      <option value="Cloths">Cloths</option>
                                      <option value="Electronic">Electronic</option>
                                      <option value="Food Items">Food Items</option>
                                      <option value="Beuty">Beuty</option>
                                    </select>
                                    </label>
                                  </div>
                                  <br/>
                                  <div className="row">
                                    <label>
                                      Available Quantity:
                                      <input
                                        name="Quantity"
                                        type="number"
                                        ref="inp"
                                        onBlur={this.alertCheck}
                                        value={this.state.Quantity}
                                        onChange={e =>{this.handleInputChange(e); }} />
                                    </label>
                                  </div>
                                  <br/>
                                  <div className="row">
                                    <label>
                                      Product Image:
                                      <input  type="file"  onChange={this.handlefile} />{/*name="image" accept="image/*" multiple ref={this.fileInput}*/}
                                    </label>
                                    {/* <!--<img [src]="imageUrl"  style="width:250px;height:200px">-->*/}
                                  </div>
                                  <br/>
                                  <div className="row">
                                    <label>
                                      T & C :
                                      <textarea
                                        name="Conditions"
                                        type="text"
                                        value={this.state.Conditions}
                                        onChange={this.handleInputChange} />
                                    </label>
                                  </div>
                                  <br/>
                                </div>
                                <Alert id="formAlert"/>
                                <button type="button" style={{marginleft: "39%" }} onClick={this.OnSaveProduct} disabled={!this.state.fValid} className="btn btn-primary"><b>Save</b></button>
                              </form>
                          </div>
                        </li >
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
    )
  }     
}
export { AdminDashboard };




import React from 'react';
import { authenticationService, productService } from '../../../_services';
import './dashboard.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
      currentUser: authenticationService.currentUserValue,
      orders: [],
      files: [],
      Address: '',
      Name: '',
      Description: '',
      Price: 0,
      Category: '',
      Quantity: 0,
      Conditions: '',
      image_file : null,
      image_preview: '',

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlefile = this.handlefile.bind(this);
    this.OnSaveProduct = this.OnSaveProduct.bind(this);
    this.loadOrders = this.loadOrders.bind(this);
    this.fileInput = React.createRef();
  }

  componentDidMount() {
    this.loadOrders();
  }
  loadOrders(){
    productService.getAllOrders()
            .then(orders => this.setState({ orders})
            );  
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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

  OnSaveProduct()
  {
    /*let product={}; 
    product.Name = this.state.Name;
    product.Description = this.state.Description;
    product.UnitPrice = this.state.Price;
    product.Category = this.state.Category;
    product.Quantity = this.state.Quantity;
    product.BillingAddress = this.state.Address;
    product.TC = this.state.Conditions;
    product.SellerId = this.state.currentUser.id.toString();
    product.SellerName = this.state.currentUser.firstName;*/
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
    console.log(formData);

    productService.saveProductInfo(formData)
            .then((res) => {  
              console.log(res)           
            });
  }

  render(){
    const { currentUser, orders} = this.state;
    return(

      <div id="dashboard">
        <div className="card">
          <div className="card-body">
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
                            Billing Address*:
                            <input
                              name="Address"
                              type="text"
                              value={this.state.Address}
                              onChange={this.handleInputChange} />
                          </label>
                        </div>
                        <br/>
                        <div className="row">
                          <label>
                            Product Name*:
                            <input
                              name="Name"
                              type="text"
                              value={this.state.Name}
                              onChange={this.handleInputChange} />
                          </label>
                        </div>
                        <br/>
                        <div className="row">
                          <label>
                            Description*:
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
                            Per Unit Price*:
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
                            Category*:
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
                              value={this.state.Quantity}
                              onChange={this.handleInputChange} />
                          </label>
                        </div>
                        <br/>
                        <div className="row">
                          <label>
                            Product Image *:
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
                      <button type="button" style={{marginleft: "39%" }} onClick={this.OnSaveProduct} className="btn btn-outline-success"><b>Save</b></button>
                    </form>
                </div>
              </li >
            </ul>
          </div>
        </div>

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
                      <tbody>
                      <tr className="col-md-12">
                        <td className="col-md-6"><h2>Item Details</h2></td>
                        <td className="col-md-6"><h2>Delivery Details</h2></td>          
                      </tr>
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
                              {orders && orders.map(ord =>
                              <tbody key={ord.id}>
                                {ord.orderItems.map(ordIt =>
                                <tr key={ordIt.id}>
                                  <td className="text-center">{ordIt.productName}</td>
                                  <td>{ordIt.perUnitPrice}</td>
                                  <td>{ordIt.orderedQuantity}</td>
                                  <td>total paid</td>
                                </tr>
                                )}
                              </tbody>
                              )}
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
                              {orders && orders.map(ord =>
                              <tbody key={ord.id}>
                              <tr>
                                <td>{ord.customerName}</td>
                                <td>{ord.deliveryAddress}</td>
                                <td>{ord.phone}</td>
                                <td>{ord.email}</td>
                                <td>{ord.message}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-success" ><b>ConfirmOrder</b></button>{/* (click)="ConfirmOrder(ord)"*/}
                                </td>
                              </tr>
                              </tbody>
                              )}
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
      </div>
    )
  }     
}
export { Dashboard };




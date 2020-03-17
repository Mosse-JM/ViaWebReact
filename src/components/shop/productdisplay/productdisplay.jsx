import React from 'react';
import { productService, alertService} from '../../../_services';
import './productdisplay.scss';
import { Alert } from '../../alert/Alert';
import {Foot} from '../../foot/foot'; 

class ProductDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      productsAddedTocart: [],
      cartItemCount: productService.cartItemCountValue
    };

    this.loadProducts = this.loadProducts.bind(this);
  }

  componentDidMount() {
    this.loadProducts();
    let prods = productService.getProductFromCart();
    if(prods)
    this.setState({ productsAddedTocart:prods});
  }

  componentWillUnmount(){
    this.setState({ 
      products: [],
    })
  }

  loadProducts(){
    productService.getAllProducts()
            .then(products => this.setState({ products})
            );  
  }

  OnAddCart(prod) {
    if(this.state.productsAddedTocart==null)
    {
      this.state.productsAddedTocart.push(prod);
      productService.addProductToCart(this.state.productsAddedTocart);
      alertService.info('product added to cart', { id: 'OnAddCartAlert', autoClose: true })
    }
    else
    {
      let tempProduct=this.state.productsAddedTocart.find(p=>p.id===prod.id);
      if(tempProduct == null)
      {
        this.state.productsAddedTocart.push(prod);
        productService.addProductToCart(this.state.productsAddedTocart);
        alertService.info('product added to cart', { id: 'OnAddCartAlert', autoClose: true })
        
      }
      else
      {
        alertService.info('Product already exist in cart!! proceed to cart ', { id: 'OnAddCartAlert', autoClose: true })
      }
      
    }
    //this.state.cartItemCount=this.state.productsAddedTocart.length;
    productService.updateCartCount(this.state.productsAddedTocart.length);

  }

  render(){
    const { products } = this.state;
    return(
      <div id="productDisplay">
        <nav className="navbar  navbar-light bg-light">
          <button type="button" className="btn btn-link" >Logo</button>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </nav>

        <div className="card">
          <div className="card-body">
            {products.map(prod =>               
            <div key={prod.id} id="prodDetail">
                <h3 className="modal-header" style={{color: "cornflowerblue"}} >{prod.category}</h3>
                <table className="table table-bordered table-responsive" style={{display: "inline", marginleft:"5px"}} >
                  <tbody>
                    <tr></tr>
                  <tr>
                    <td>
                      <img src={'data:image/jpeg;base64,' + prod.images}  alt="poduct N" width="180px;" height="300px;"/>
                    </td>
                  </tr>
                  <tr>
                    <td>{prod.name}</td>
                  </tr>
                  <tr>
                    <td>Price:{prod.unitPrice}</td>
                  </tr>
                  <tr>
                    <td>{prod.description}</td>
                  </tr>
                  <tr>
                    <td>
                        <button type="button" onClick={this.OnAddCart.bind(this, prod)} className="btn btn-outline-success btn-sm" ><b>Add to cart</b></button>
                    </td>
                  </tr>
                  </tbody>
              </table>
            </div>
            )}
          </div>
          <Alert id="OnAddCartAlert"/>
        </div>
        <Foot />
      </div>
    )
  }     
}
export { ProductDisplay };



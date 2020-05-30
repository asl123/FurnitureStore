import React, { Component } from "react";
class Cart extends Component {
  state = {
    cart: this.props.cart,
  };
  showQty = (prodCode) => {
    let { cart } = this.state;
    let index = cart.findIndex((item) => item.prodCode === prodCode);
    cart[index].qty = cart[index].qty ? cart[index].qty : 1;
    return cart[index].qty;
  };
  decreaseQty = (prodCode) => {
    let { cart } = this.state;
    let index = cart.findIndex((item) => item.prodCode === prodCode);
    cart[index].qty = cart[index].qty ? cart[index].qty : 1;
    if (cart[index].qty > 1) {
      cart[index].qty--;
    } else {
      cart.splice(index, 1);
    }
    console.log(cart[index]);
    this.setState({ cart });
  };
  increaseQty = (prodCode) => {
    let { cart } = this.state;
    let index = cart.findIndex((item) => item.prodCode === prodCode);
    cart[index].qty = cart[index].qty ? cart[index].qty : 1;
    cart[index].qty++;
    console.log(cart[index]);
    this.setState({ cart });
  };
  showItemsTable() {
    let { cart } = this.state;
    let items = [];
    for (let i = 0; i < cart.length; i++) {
      for (let j = 0; j < cart[i].ingredients.length; j++) {
        let ingredient = { ...cart[i].ingredients[j] };
        console.log(cart[i].qty);
        cart[i].qty = cart[i].qty ? cart[i].qty : 1;
        ingredient.qty = ingredient.qty * cart[i].qty;
        let index = items.findIndex(
          (item) => item.ingName === ingredient.ingName
        );
        if (index !== -1) {
          items[index].qty = items[index].qty
            ? items[index].qty + ingredient.qty
            : ingredient.qty;
        } else {
          items.push(ingredient);
        }
      }
    }
    console.log(items);
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Items</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.ingName}>
              <td scope="row" className="col border">
                {item.ingName}
              </td>
              <td className="col border">{item.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  render() {
    let { cart } = this.state;
    return (
      <div className="container">
        <div className="row d-flex justify-content-center">
          <h2>Products In Shopping Cart.</h2>
        </div>
        <ul className="list-group">
          {cart.map((item) => (
            <li className="list-group-item border" key={item.prodCode}>
              <div className="row">
                <div className="col-4">
                  <img
                    src={item.img}
                    alt=""
                    style={{ width: "70px", height: "60px" }}
                  />
                </div>
                <div className="col-4">{item.title}</div>
                <div className="col-4">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.decreaseQty(item.prodCode)}
                  >
                    -
                  </button>
                  <button className="btn btn-sm btn-secondary">
                    {this.showQty(item.prodCode)}
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => this.increaseQty(item.prodCode)}
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="row d-flex justify-content-center mt-2">
          <h4>List of Items in Cart.</h4>
        </div>
        {this.showItemsTable()}
      </div>
    );
  }
}

export default Cart;

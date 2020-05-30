import React, { Component } from "react";
import auth from "../services/authServiceFurn";
import LeftPanel from "./leftPanelFurn";
class Products extends Component {
  state = {
    products: this.props.products,
    selectedProduct: {},
    categories: ["Dining", "Drawing", "Bedroom", "Study"],
    user: this.props.user,
    cart: [],
  };
  makeRadioStructure(categories, currentCategory) {
    let categoryRadio = {
      array: categories,
      selected: currentCategory,
    };
    return categoryRadio;
  }
  componentDidMount() {
    let { category, prodCode } = this.props.match.params;
    category = category ? category : "";
    let { products } = this.state;
    if (prodCode) {
      let selectedProduct = products.find((prod) => prod.prodCode === prodCode);
      this.setState({ selectedProduct, selectedCategory: category });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      let { category, prodCode } = this.props.match.params;
      if (
        this.props.location.pathname === "/products" ||
        this.props.location.pathname === "/products/" + category
      ) {
        this.setState({ selectedProduct: {} });
      }
    }
  }
  handleSelected = (product) => {
    console.log(this.props.history);
    let path = "/products";
    path = path + "/" + product.category + "/" + product.prodCode;
    this.props.history.push(path);
    this.setState({ selectedProduct: product });
  };
  handleOptionChange = (categoryRadio) => {
    let selectedCategory = categoryRadio.selected;
    console.log(categoryRadio);
    let path = "/products";
    path = path + "/" + selectedCategory;
    this.props.history.push(path);
    this.setState({ selectedProduct: {} });
  };
  addToCart = (product) => {
    let { cart } = this.state;
    cart.push(product);
    alert("Added To Cart.");
    this.props.getCart(cart);
    this.setState(cart);
  };
  handleEditProduct = (product) => {
    this.props.history.push(
      "/products/" + product.category + "/" + product.prodCode + "/edit"
    );
  };
  handleDelete = (product) => {
    this.props.handleDelete(product);
    this.props.history.push("/products/" + product.category);
  };
  render() {
    let { products, selectedProduct, categories, user } = this.state;
    let { category } = this.props.match.params;
    category = category ? category : "";
    console.log(user);
    if (category) {
      products = this.state.products.filter(
        (product) => product.category === category
      );
    }
    let categoryRadio = this.makeRadioStructure(categories, category);
    return (
      <div className="container">
        <div className="row mt-2">
          <div className="col-2">
            <LeftPanel
              categoryRadio={categoryRadio}
              onOptionChange={this.handleOptionChange}
            />
          </div>
          <div className="col-6">
            {products.length > 0 ? (
              <div className="row" style={{ display: "flex" }}>
                {products.map((product) => (
                  <div
                    className="col-6"
                    key={product.prodCode}
                    onClick={() => this.handleSelected(product)}
                  >
                    <img
                      src={product.img}
                      alt=""
                      style={{
                        width: "220px",
                        height: "180px",
                        marginBottom: "5px",
                        marginRight: "5px",
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              "There Is No Product Available."
            )}
          </div>
          <div className="col-4">
            {user.role === "admin" && selectedProduct.title ? (
              <div className="row ml-3">
                <button
                  className="btn btn-sm btn-secondary m-2"
                  onClick={() => this.handleEditProduct(selectedProduct)}
                >
                  Edit Product
                </button>
                <button
                  className="btn btn-sm btn-danger m-2"
                  onClick={() => this.handleDelete(selectedProduct)}
                >
                  Delete Product
                </button>
              </div>
            ) : (
              ""
            )}
            {selectedProduct.title ? (
              <div className="row ml-2">
                <div className="col-12">
                  <img
                    src={selectedProduct.img}
                    alt=""
                    style={{ height: "240px", width: "260px" }}
                  />
                </div>
                <div className="col-12">
                  <h3>{selectedProduct.title}</h3>
                </div>
                <div className="col-12">
                  {selectedProduct.desc.map((item) => (
                    <div className="row" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="col-12">
                  <h4>Items in Product</h4>
                  {selectedProduct.ingredients.map((ingrd) => (
                    <div className="row" key={ingrd.ingName}>
                      - {ingrd.ingName} : {ingrd.qty}
                    </div>
                  ))}
                </div>
                {user.role === "customer" ? (
                  <button
                    className="btn btn-sm btn-success mt-2 ml-2"
                    onClick={() => this.addToCart(selectedProduct)}
                  >
                    Add To Cart
                  </button>
                ) : (
                  ""
                )}
              </div>
            ) : (
              "Choose a Product"
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;

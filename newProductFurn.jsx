import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
class NewProduct extends Component {
  state = {
    products: this.props.products,
    product: {
      prodCode: "",
      title: "",
      img: "",
      category: "",
      desc: [],
      ingredients: [],
    },
  };
  componentDidMount() {
    let { category, prodCode } = this.props.match.params;
    console.log(category, prodCode);
    let { products } = this.state;
    console.log(products);
    let product = products.find((prod) => prod.prodCode === prodCode);
    console.log(product);
    if (product) {
      this.setState({ product });
    }
  }
  render() {
    let { product } = this.state;
    return (
      <div className="container">
        <Formik
          initialValues={this.state.product}
          enableReinitialize="true"
          validationSchema={Yup.object().shape({
            prodCode: Yup.string().required("Product Code is required"),
            title: Yup.string().required("Name is required"),
            img: Yup.string().required("Image URL is required"),
            category: Yup.string().required("Category is required"),
          })}
          onSubmit={(fields) => {
            console.log(fields);
            this.props.handleNewProduct(fields);
            if (this.state.product.prodCode) {
              alert("Product Updated");
            } else {
              alert("Product Added.");
            }
            this.props.history.push(
              "/products" + "/" + fields.category + "/" + fields.prodCode
            );
            // alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
          }}
          render={({ errors, status, touched, values }) => (
            console.log(values),
            (
              <div className="row">
                <div className="col-7">
                  <Form>
                    <div className="form-group ml-2 mr-2">
                      <label htmlFor="prodCode">Product Code</label>
                      <Field
                        name="prodCode"
                        type="text"
                        className={
                          "form-control" +
                          (errors.prodCode && touched.prodCode
                            ? " is-invalid"
                            : "")
                        }
                      />
                      <ErrorMessage
                        name="prodCode"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group ml-2 mr-2">
                      <label htmlFor="title">Name</label>
                      <Field
                        name="title"
                        type="text"
                        className={
                          "form-control" +
                          (errors.title && touched.title ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group ml-2 mr-2">
                      <label htmlFor="img">Image URL</label>
                      <Field
                        name="img"
                        type="text"
                        className={
                          "form-control" +
                          (errors.img && touched.img ? " is-invalid" : "")
                        }
                      />
                      <ErrorMessage
                        name="img"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group ml-2 mr-2">
                      <label htmlFor="category">Category</label>
                      <Field
                        name="category"
                        as="select"
                        className={
                          "form-control" +
                          (errors.category && touched.category
                            ? " is-invalid"
                            : "")
                        }
                      >
                        <option defaultValue>Choose Category</option>
                        <option>Dining</option>
                        <option>Bedroom</option>
                        <option>Drawing</option>
                        <option>Study</option>
                      </Field>
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group ml-2 mr-2">
                      <FieldArray
                        name="desc"
                        className="form-control"
                        render={(arrayHelpers) => (
                          <div>
                            <button
                              type="button"
                              className="btn btn-secondary mr-2"
                              onClick={() => arrayHelpers.push()}
                            >
                              Add Description
                            </button>
                            {values.desc && values.desc.length > 0
                              ? values.desc.map((des, index) => (
                                  <div className="mt-2" key={index}>
                                    <Field
                                      name={`desc.${index}`}
                                      placeholder={`Line ${index + 1}`}
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-danger ml-2"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      X
                                    </button>
                                  </div>
                                ))
                              : ""}
                          </div>
                        )}
                      />
                    </div>
                    <div className="form-group ml-2 mr-2">
                      <FieldArray
                        name="ingredients"
                        className="form-control"
                        render={(arrayHelpers) => (
                          <div>
                            <button
                              type="button"
                              className="btn btn-secondary mr-2"
                              onClick={() => arrayHelpers.push()}
                            >
                              Add Items Shipped With Product
                            </button>
                            {values.ingredients && values.ingredients.length > 0
                              ? values.ingredients.map((item, index) => (
                                  <div className="mt-2" key={index}>
                                    <Field
                                      name={`ingredients.${index}.ingName`}
                                      placeholder="Item Name"
                                      className="mr-2"
                                    />
                                    <Field
                                      name={`ingredients.${index}.qty`}
                                      type="number"
                                      placeholder="Quantity"
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-danger ml-2"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      X
                                    </button>
                                  </div>
                                ))
                              : ""}
                          </div>
                        )}
                      />
                    </div>
                    <div className="form-group ml-2 mr-2">
                      <button className="btn btn-success" type="submit">
                        Save
                      </button>
                    </div>
                  </Form>
                </div>
                <div className="col-5 my-4">
                  <img
                    src={values.img}
                    alt=""
                    style={{ height: "240px", width: "280px" }}
                  />
                </div>
              </div>
            )
          )}
        />
      </div>
    );
  }
}

export default NewProduct;

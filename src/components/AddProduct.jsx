import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.name) newErrors.name = "Name is required";
    if (!product.brand) newErrors.brand = "Brand is required";
    if (!product.description) newErrors.description = "Description is required";
    if (!product.price) newErrors.price = "Price is required";
    if (!product.category) newErrors.category = "Category is required";
    if (!product.stockQuantity) newErrors.stockQuantity = "Stock Quantity is required";
    if (!product.releaseDate) newErrors.releaseDate = "Release Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    axios
      .post("https://my-spring-boot-app-ip4fjkueaa-uc.a.run.app/api/addproduct", product, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSuccessMessage("Product added successfully");
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("Error adding product");
        setSuccessMessage("");
      });
  };

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={submitHandler}>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="col-md-6">
            <label className="form-label">
              <h6>Name</h6>
            </label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Product Name"
              onChange={handleInputChange}
              value={product.name}
              name="name"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Brand</h6>
            </label>
            <input
              type="text"
              name="brand"
              className={`form-control ${errors.brand ? "is-invalid" : ""}`}
              placeholder="Enter your Brand"
              value={product.brand}
              onChange={handleInputChange}
            />
            {errors.brand && <div className="invalid-feedback">{errors.brand}</div>}
          </div>
          <div className="col-12">
            <label className="form-label">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              placeholder="Add product description"
              value={product.description}
              name="description"
              onChange={handleInputChange}
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Price</h6>
            </label>
            <input
              type="number"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              placeholder="Eg: $1000"
              onChange={handleInputChange}
              value={product.price}
              name="price"
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Category</h6>
            </label>
            <select
              className={`form-select ${errors.category ? "is-invalid" : ""}`}
              value={product.category}
              onChange={handleInputChange}
              name="category"
            >
              <option value="">Select category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
              <option value="Fashion">Fashion</option>
            </select>
            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Stock Quantity</h6>
            </label>
            <input
              type="number"
              className={`form-control ${errors.stockQuantity ? "is-invalid" : ""}`}
              placeholder="Stock Remaining"
              onChange={handleInputChange}
              value={product.stockQuantity}
              name="stockQuantity"
            />
            {errors.stockQuantity && <div className="invalid-feedback">{errors.stockQuantity}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Release Date</h6>
            </label>
            <input
              type="date"
              className={`form-control ${errors.releaseDate ? "is-invalid" : ""}`}
              value={product.releaseDate}
              name="releaseDate"
              onChange={handleInputChange}
            />
            {errors.releaseDate && <div className="invalid-feedback">{errors.releaseDate}</div>}
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                id="gridCheck"
                checked={product.productAvailable}
                onChange={(e) =>
                  setProduct({ ...product, productAvailable: e.target.checked })
                }
              />
              <label className="form-check-label">Product Available</label>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

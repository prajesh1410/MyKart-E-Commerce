import { publicRequest, userRequest } from "../requestMethods";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  createUserStart,
  createUserSuccess,
  createUserFailure,
} from "./userRedux";

import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
} from "./productRedux";

// LOGIN
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

// LOGOUT
export const logoutUser = (dispatch) => {
  dispatch(logout());
};

// GET PRODUCTS
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await userRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    console.log("getProducts error:", err);
    dispatch(getProductFailure());
  }
};

// DELETE PRODUCT
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    console.error("Delete failed:", err);
    dispatch(deleteProductFailure());
  }
};

// ADD PRODUCT
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post("/products", product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    console.error("Add failed:", err);
    dispatch(addProductFailure());
  }
};

// UPDATE PRODUCT
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ _id: id, product: res.data }));
  } catch (err) {
    console.error("Update failed:", err);
    dispatch(updateProductFailure());
  }
};

// CREATE USER (Admin-Only)
export const createUser = async (userData, dispatch) => {
  dispatch(createUserStart());
  try {
    const res = await userRequest.post("/users", userData); // Authenticated request
    dispatch(createUserSuccess(res.data));
  } catch (err) {
    console.error("Create user failed:", err);
    dispatch(createUserFailure());
  }
};

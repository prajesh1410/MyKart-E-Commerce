import {createSlice} from '@reduxjs/toolkit';
const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers:{
    getProductStart:(state)=>{
        state.isFetching = true;
        state.error = false;
    },
    getProductSuccess:(state, action)=>{
        state.isFetching = false;
        state.products = action.payload;
    },
    getProductFailure:(state) => {
        state.isFetching = false;
        state.error = true;
    },
    deleteProductStart:(state)=>{
        state.isFetching = true;
        state.error = false;
    },
    deleteProductSuccess:(state, action)=>{
        state.isFetching = false;
        state.products.splice(
            state.products.findIndex((item)=>item._id === action.payload),
            1
        );
    },
    deleteProductFailure:(state) => {
        state.isFetching = false;
        state.error = true;
    }
    ,
    updateProductStart: (state) => {
        state.isFetching = true;
        state.error = false;
    },
    updateProductSuccess: (state, action) => {
        state.isFetching = false;
        state.products[
            state.products.findIndex((item) => item._id === action.payload._id)
        ] = action.payload.product;
        
    },
    updateProductFailure: (state) => {
        state.isFetching = false;
        state.error = true;
    }
    ,
    addProductStart: (state) => {
        state.isFetching = true;
        state.error = false;
    },
    addProductSuccess: (state, action) => {
        state.isFetching = false;
        state.products.push(action.payload);
    },
    addProductFailure: (state) => {
        state.isFetching = false;
        state.error = true;
    }
}
});
export const { 
    getProductStart, 
    getProductSuccess, 
    getProductFailure, 
    deleteProductStart, 
    deleteProductSuccess, 
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure
} = productSlice.actions;
export default productSlice.reducer;
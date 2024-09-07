import { Customer, Product } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderProduct {
  product: Product;
  quantity: number;
}

interface OrderState {
  customer: Customer | null;
  products: OrderProduct[];
  reduction: number;
}

const initialState: OrderState = {
  customer: null,
  products: [],
  reduction: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      const existingProduct = state.products.find(
        (p) => p.product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ product: action.payload, quantity: 1 });
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      const productIndex = state.products.findIndex(
        (p) => p.product.id === action.payload
      );
      if (productIndex !== -1) {
        const product = state.products[productIndex];
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.products.splice(productIndex, 1);
        }
      }
    },
    resetOrder(state) {
      state.products = [];
      state.customer = null;
      state.reduction = 0;
    },
    setCustomer(state, action: PayloadAction<Customer | null>) {
      state.customer = action.payload;
    },
    setReduction(state, action: PayloadAction<number>) {
      state.reduction = action.payload;
    },
    updatePointsSpent(state, action: PayloadAction<number>) {
      if (state.customer) {
        state.customer.pointsSpent += action.payload;
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  resetOrder,
  setCustomer,
  setReduction,
  updatePointsSpent,
} = orderSlice.actions;
export default orderSlice.reducer;

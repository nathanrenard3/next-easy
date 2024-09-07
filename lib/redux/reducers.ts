import { combineReducers } from "redux";
import orderReducer from "./slices/orderSlice";

const rootReducer = combineReducers({
  order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import medicineReducer from "./medicineReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  errors: errorReducer,
  medicine: medicineReducer,
  security: securityReducer
});

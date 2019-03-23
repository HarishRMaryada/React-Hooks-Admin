import { combineReducers } from "redux";

//other reducers
import authReducer from "../Components/Login/redux/login.reducer";
import userReducer from '../Components/Users/redux/users.reducer'
import organizationReducer from '../Components/Organizations/redux/organizations.reducer'
import enquiryReducer from '../Components/Organizations/redux/enquires.reducer'
import productReducer from '../Components/Products/redux/products.reducer'
import productTypeReducer from '../Components/ProductType/redux/producttype.reducer'
import brandReducer from '../Components/Brands/redux/brand.reducer'
import categoryReducer from '../Components/Categories/redux/categories.reducer'


//form reducer
let { reducer: formReducer } = require("redux-form");

export default combineReducers({
  //reducers
  auth: authReducer,
  users:userReducer,
  organizations:organizationReducer,
  enquiries : enquiryReducer,
  products:productReducer,
  productTypes:productTypeReducer,
  brands:brandReducer,
  categories:categoryReducer,
  //form
  form: formReducer
});

import React, { Component } from "react";
import "./App.css";
import Pharmacy from "./components/Pharmacy";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Layout/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AddMedicine from "./components/Medicine/AddMedicine";
import UpdateMedicine from "./components/Medicine/UpdateMedicine";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecureRoute";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />

            {
              //public routes
            }

            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {
              //private routes
            }
            <Switch>
              <SecuredRoute exact path="/pharmacy" component={Pharmacy} />
              <SecuredRoute exact path="/addMedicine" component={AddMedicine} />
              <SecuredRoute
                exact
                path="/updateMedicine/:id"
                component={UpdateMedicine}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

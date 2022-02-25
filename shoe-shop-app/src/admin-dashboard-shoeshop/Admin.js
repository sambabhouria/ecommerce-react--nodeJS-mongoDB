
import React from "react";
import { Switch, Route ,  useRouteMatch, } from "react-router-dom";

import "./Admin.css";
import "./responsive.css";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import UsersScreen from "./screens/UsersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import Login from "./screens/LoginScreen";
import NotFound from "./screens/NotFound";

const Admin = () => {

  let { path, url } = useRouteMatch();

    return (
      <div>
          <Switch>
            <Route path={`${url}`} component={HomeScreen} exact />
            <Route path= {`${url}/products`} component={ProductScreen} />
            <Route path= {`${url}/category`} component={CategoriesScreen} />
            <Route path= {`${url}/orders`} component={OrderScreen} />
            <Route path= {`${url}/order/:id`} component={OrderDetailScreen} />
            <Route path= {`${url}/addproduct`}  component={AddProduct} />
            <Route path= {`${url}/users`}  component={UsersScreen} />
            <Route path= {`${url}/product/:id/edit`}  component={ProductEditScreen} />
            <Route path= {`${url}/login`} component={Login} />
            <Route path="*" component={NotFound} />
          </Switch>
      </div>
    );
  };

  export default Admin;

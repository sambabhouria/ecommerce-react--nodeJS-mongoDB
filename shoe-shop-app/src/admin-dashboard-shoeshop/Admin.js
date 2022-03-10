
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
import PrivateRouter from "./PrivateRouter";

const Admin = () => {

  let { path, url } = useRouteMatch();

    return (
      <div>
          <Switch>
            <PrivateRouter path={`${url}`} component={HomeScreen} exact />
            <PrivateRouter path= {`${url}/products`} component={ProductScreen} />
            <PrivateRouter path= {`${url}/category`} component={CategoriesScreen} />
            <PrivateRouter path= {`${url}/orders`} component={OrderScreen} />
            <PrivateRouter path= {`${url}/order/:id`} component={OrderDetailScreen} />
            <PrivateRouter path= {`${url}/addproduct`}  component={AddProduct} />
            <PrivateRouter path= {`${url}/users`}  component={UsersScreen} />
            <PrivateRouter path= {`${url}/product/:id/edit`}  component={ProductEditScreen} />
            <Route path= {`${url}/login`} component={Login} />
            <PrivateRouter path="*" component={NotFound} />
          </Switch>
      </div>
    );
  };

  export default Admin;

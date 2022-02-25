import axios from "axios"
import { CART_CLEAR_ITEMS } from "../Constatns/CartConstants";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_ORDER_LIST_MY_REQUEST,
    ORDER_ORDER_LIST_MY_SUCCESS,
    ORDER_ORDER_LIST_MY_FAIL,

    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,

  } from "../Constatns/OrderConstants"

import { logout } from "./userActions";


// CREATE ORDER
export const createOrder = (order) =>  async (dispatch, getState) => {

    try {

        dispatch({type: ORDER_CREATE_REQUEST});
        const {
            userLogin : { userInfo },
        } =  getState();
        // console.log("user Infos profile", userInfo);
        const config ={
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.post(`/api/orders`, order, config);

         dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });

         dispatch({ type: CART_CLEAR_ITEMS, payload: data });

         localStorage.setItem("cartItems");

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message :
        error.message;
        if(message === "Not authorized, token failed"){
            dispatch(logout())
        }
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message
         });

    }
};

//  ORDER DETAILS
export const getOrderDetails = (id) =>  async (dispatch, getState) => {

    try {

        dispatch({type: ORDER_DETAILS_REQUEST});
        const {
            userLogin : { userInfo },
        } =  getState();
        const config ={
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.get(`/api/orders/${id}`, config);

         dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message :
        error.message;
        if(message === "Not authorized, token failed"){
            dispatch(logout())
        }
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: message
         });

    }
};


//  ORDER PAY
export const payOrder = (orderId, paymentResult) =>  async (dispatch, getState) => {

    try {

        dispatch({type: ORDER_PAY_REQUEST});
        const {
            userLogin : { userInfo },
        } =  getState();
        const config ={
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.put(`/api/orders/${orderId}/pay`,
          paymentResult,
          config);

         dispatch({ type: ORDER_PAY_SUCCESS, payload: data });

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message :
        error.message;
        if(message === "Not authorized, token failed"){
            dispatch(logout())
        }
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: message
         });

    }
};


//  USER ORDER LIST
export const listMyOrders = () =>  async (dispatch, getState) => {

    try {

        dispatch({type: ORDER_ORDER_LIST_MY_REQUEST});
        const {
            userLogin : { userInfo },
        } =  getState();
        const config ={
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.get(`/api/orders/`, config);

        dispatch({ type: ORDER_ORDER_LIST_MY_SUCCESS, payload: data });

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message :
        error.message;
        if(message === "Not authorized, token failed"){
            dispatch(logout())
        }
        dispatch({
            type: ORDER_ORDER_LIST_MY_FAIL,
            payload: message
         });

    }
};

//ADMIN ACTIONS

export const listOrders = () => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/orders/all`, config);
  
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  // ORDER DETAILS
  export const adminGetOrderDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/orders/${id}`, config);
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: message,
      });
    }
  };
  
  // ORDER DELIVER
  export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELIVERED_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `/api/orders/${order._id}/delivered`,
        {},
        config
      );
      dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_DELIVERED_FAIL,
        payload: message,
      });
    }
  };

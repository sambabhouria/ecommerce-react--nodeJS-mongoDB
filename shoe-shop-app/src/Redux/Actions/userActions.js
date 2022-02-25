import axios from "axios"
import { toast } from "react-toastify";

import { ORDER_ORDER_LIST_MY_RESET } from "../Constatns/OrderConstants";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,

    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS,

  } from "../Constatns/UserConstants"

// LOGIN
export const login = ( email, password ) =>  async (dispatch) => {

    try {

        dispatch({type: USER_LOGIN_REQUEST});

        const config ={
            Headers: {
                "Content-Type" : "application/json"
            },
        };

        const { data } = await axios.post(
        `/api/users/login`,
        {email, password},
        config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message :
            error.message,
         });

    }
};

// RGISTER
export const register = (name,  email, password ) =>  async (dispatch) => {

    try {

        dispatch({type: USER_REGISTER_REQUEST});
        const config ={
            headers: {
                "Content-Type" : "application/json"
            },
        };
        const { data } = await axios.post(
        `/api/users`,
        {name, email, password},
        config
        );
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data});
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message :
            error.message,
         });

    }
};

// LOGOUT
export const  logout = () => (dispatch) => {

    localStorage.removeItem("userInfo");
     dispatch({ type: USER_LOGOUT});
     dispatch({ type: USER_DETAILS_RESET});
     dispatch({ type: ORDER_ORDER_LIST_MY_RESET});
   // Optional
     document.location.href= '/login'
 }

// USER DETAILS
export const getUserDetails = (id) =>  async (dispatch, getState) => {

    try {

        dispatch({type: USER_DETAILS_REQUEST});

        const {
            userLogin : { userInfo },
        } =  getState();
        // console.log("user Infos profile", userInfo);
        const config ={
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.get(`/api/users/${id}`, config);
        // console.log("@@@data@@@@", data);

         dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message :
        error.message;
        if(message === "Not authorized, token failed"){
            dispatch(logout())
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message
         });

    }
};

// UPDATE PROFILE
export const updateUserProfile = (user) =>  async (dispatch, getState) => {

    try {

        dispatch({type: USER_UPDATE_PROFILE_REQUEST});

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

        const { data } = await axios.put(`/api/users/profile`, user, config);

         dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });

         // Relog to update data in profile screeen
         dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

         localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message :
        error.message;
        if(message === "Not authorized, token failed"){
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message
         });

    }
};

/*ADMIN ACTIONS*/


// LOGIN
export const adminLogin = (email, password) => async (dispatch) => {
    const ToastObjects = {
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      autoClose: 2000,
    };
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/users/login`,
        { email, password },
        config
      );
      if (!data.isAdmin === true) {
        toast.error("You are not Admin", ToastObjects);
        dispatch({
          type: USER_LOGIN_FAIL,
        });
      } else {
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: message,
      });
    }
  };

// LOGOUT
export const adminLogout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_LIST_RESET });
  }

// ALL USER
export const listUser = () => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LIST_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/users`, config);

      dispatch({ type: USER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: USER_LIST_FAIL,
        payload: message,
      });
    }
  };

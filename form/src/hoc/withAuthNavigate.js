import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";


export const withAuthNavigate = (Component) => {
    const NavigateComponent = (props) => {
        const navigate = useNavigate();
        
        useEffect(() => {
            if (!props.isAuth) navigate("/login") 
        }, [props.isAuth])

        return <Component {...props}/> 
    }   

    return connect(mapStateToPropsForNavigate)(NavigateComponent);
}
const mapStateToPropsForNavigate = (state) => ({
    isAuth: state.auth.isAuth
});
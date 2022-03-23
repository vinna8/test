import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Preloader from "../utils/preloader/preloader";

const Form = (props) => {
    const { 
        register, 
        formState: {errors, isValid}, 
        handleSubmit } = useForm({
            mode: 'onBlur'
        });

    const onSubmit = (data) => {
        props.login(data.email, data.password)
    }

    if (props.isAuth) {
        return <Navigate to="/profile"/>
    }

    return (
        <div>
            <FormWrapper> 
                {props.isFetching ? <Preloader /> :
                    <ContentForm onSubmit={handleSubmit(onSubmit)}> 
                        <Title>LOGIN</Title>
                        <div>
                            <Input {...register('email', {
                                required: 'Email is required.',
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: 'Please enter a valid email.'
                                }
                            })} 
                            placeholder='Email' />
                        </div>

                        <div>
                            {errors?.email && <Error>{errors?.email?.message}</Error>}
                        </div>

                        <div>
                            <Input {...register('password', {
                                required: 'Password is required.',
                            })} 
                            placeholder='Password' 
                            type='password' />
                        </div>

                        <div>
                            {errors?.password && <Error>{errors?.password?.message}</Error>}
                        </div>

                        <div>
                            {props.message && <Error>{props.message}</Error>}
                        </div>

                        <div>
                            <Button type='submit' disabled={!isValid || props.isDisabled}>Log In</Button>
                        </div>
                    </ContentForm>
                }
            </FormWrapper>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching,
    isDisabled: state.auth.isDisabled,
    message: state.auth.message
})

export default connect(mapStateToProps, {login})(Form);

const FormWrapper = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
    font-family: 'Montserrat', sans-serif;

    margin: auto;
    top: 0; 
    left: 0; 
    bottom: 0; 
    right: 0;
    
    z-index: 1;
    position: absolute;

    width: 360px;
    height: 350px;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.6); 
`;

const ContentForm = styled.form`
    margin-top: 30px;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 2.5em;
    letter-spacing: 7px;
    margin-bottom: 30px;
`;

const Input = styled.input`
    font-size: 1em;
    margin: 12px;
    padding: 5px;
    width: 220px;
`;

const Button = styled.button`
    font-size: 17px;
    letter-spacing: 1px;
    margin-top: 40px;
    padding: 8px;
    width: 120px;
    border-radius: 25px;
    border: none;
    cursor: pointer;
    background-color:rgb(237,239,239);

    &:hover{
        opacity: 0.9;
    }
`;

const Error = styled.div`
    margin-top: -10px;
    font-size: 13px;
    color: red;
    font-weight: bold;
`;
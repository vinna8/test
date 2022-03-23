import styled from "styled-components";
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthNavigate } from "../hoc/withAuthNavigate";
import { logout } from "../redux/auth-reducer";
import { useState } from "react";

const Profile = (props) => {
    const [disable, setDisable] = useState(false);

    return (
        <div> 
            <FormWrapper>
                <div>
                    <Img src={props.avatar}/>
                </div>
                <Name>
                    {props.firstName}
                    <br/>
                    {props.lastName}
                    <br/>
                    <br/>
                    {props.country}, {props.city}
                </Name>
                <Info>
                    <div>Info</div>
                    <Contacts>
                        <div>
                            <Contact><FaPhoneAlt/> {props.phone}</Contact>
                        </div>
                        <div>
                            <Contact><FaEnvelope/> {props.email}</Contact>
                        </div>
                    </Contacts>
                    <WrapBtn> 
                        <Button onClick={() => { setDisable(true); props.logout(); } } disabled={disable}>Log Out</Button>
                    </WrapBtn>
                </Info>
            </FormWrapper>
        </div>
    )
}

const mapStateToProps = (state) => ({
    email: state.auth.email,
    phone: state.auth.phone, 
    avatar: state.auth.avatar,
    firstName: state.auth.firstName, 
    lastName: state.auth.lastName, 
    city: state.auth.city, 
    country: state.auth.country,
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching, 
    isDisabled: state.auth.isDisabled
})

export default compose(connect(mapStateToProps, {logout}), withAuthNavigate)(Profile);

const FormWrapper = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
    font-family: 'Montserrat', sans-serif;

    display: grid;
    grid-template-areas:
        "a n"
        "i i";
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);

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

const Img = styled.img`
    grid-area: a;
    width: 125px;
    height: 125px;
    margin: 30px;
    border-radius: 50%;
    object-fit: cover;
`;

const Name = styled.div`
    grid-area: n;
    margin-top: 45px;
    text-align: center;
`;

const Info = styled.div`
    grid-area: i;
    text-align: center;
    font-size: 23px;
    letter-spacing: 7px;
`;

const Contacts = styled.div`
    margin-top: 15px; 
    margin-left: 35px;
    text-align: left;
    font-size: 16px;
    letter-spacing: 0px;
`;

const Contact = styled.div`
    margin-bottom: 10px;
`;

const Button = styled.button`
    font-size: 17px;
    letter-spacing: 1px;
    margin-top: 10px;
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

const WrapBtn = styled.div`
    text-align: center;
`;
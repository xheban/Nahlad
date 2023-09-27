import React, {Fragment, useDebugValue, useState} from 'react';
import {TextInput,PasswordInput, Form, Button} from 'carbon-components-react';
import { ArrowRight32 } from '@carbon/icons-react';
import './Register.scss'
import '../../styles-own.scss'
import {registerAnswers} from "../../Utils/constants";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [validationName, setValidationName] = useState(false);
    const [validationLastName, setValidationLastName] = useState(false);
    const [validationEmail, setValidationEmail] = useState(false);
    const [validationPassword, setValidationPassword] = useState(false);
    const [validationRepeatedPassword, setValidationRepeatedPassword] = useState(false);
    const [invalidEmailMsg, setInvalidEmailMsg] = useState("Email nemôže byť prázdny")
    const [successfulRegistration, setSuccessfulRegistration] = useState(false);


    const emailValidation = email => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regex.test(email);
    }

    const registerUser = async () => {
        const user = {firstName, email, lastName, password};
        try{
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            })
            const data = await response.json();
            if(data === registerAnswers.email_already_used){
                setValidationEmail(true)
                setInvalidEmailMsg("Email sa už používa");
            }else if(data === registerAnswers.success){
                setSuccessfulRegistration(true);
                clearFormular();
            }else{
                setValidationEmail(false)
            }
        } catch (e) {
            return e;
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(firstName.length === 0){
            setValidationName(true)
        }else{
            setValidationName(false)
        }
        if(lastName.length === 0){
            setValidationLastName(true)
        }else{
            setValidationLastName(false)
        }
        if(email.length === 0){
            setValidationEmail(true)
            setInvalidEmailMsg("Email nemôže byť prázdny");
        }else if(!emailValidation(email)){
            setValidationEmail(true)
            setInvalidEmailMsg("Nesprávny tvar emailovej adresy");
        } else{
            setValidationEmail(false)
        }
        if(password.length < 8){
            setValidationPassword(true)
        }else{
            setValidationPassword(false)
        }
        if(password.length >= 8 && repeatPassword !== password){
            setValidationRepeatedPassword(true)
        }else{
            setValidationRepeatedPassword(false)
        }
        if(!validationName && !validationLastName && !validationPassword && !validationEmail && !validationRepeatedPassword){
            registerUser().then();
        }
    }

    const clearFormular = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
    }

    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
                <div className="bx--row login__heading pb6">
                    <h1>
                        Registrácia
                    </h1>
                </div>
                <div className="bx--row login__line">
                    <hr width="100%" color="#6f6f6f" height="1px"/>
                </div>
                <div className="bx--row inputLabel">
                    <div className="bx--col-lg--auto bx--no-gutter--left text-input__label">
                        Meno
                    </div>
                </div>
                <div className="bx--row login__username pb6">
                    <TextInput
                        labelText=""
                        className="register__input"
                        id="register_name"
                        invalid={validationName}
                        invalidText="Meno nemôže byť prázdne"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                    />
                </div>
                <div className="bx--row inputLabel">
                    <div className="bx--col-lg--auto bx--no-gutter--left text-input__label">
                        Priezvisko
                    </div>
                </div>
                <div className="bx--row login__username pb6">
                    <TextInput
                        labelText=""
                        className="register__input"
                        id="register_lastname"
                        invalid={validationLastName}
                        invalidText="Priezvisko nemôže byť prázdne"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                    />
                </div>
                <div className="bx--row inputLabel">
                    <div className="bx--col-lg--auto bx--no-gutter--left text-input__label">
                        Email
                    </div>
                </div>
                <div className="bx--row login__username pb6">
                    <TextInput
                        labelText=""
                        className="register__input"
                        id="register_email"
                        invalid={validationEmail}
                        invalidText={invalidEmailMsg}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="bx--row inputLabel">
                    <div className="bx--col-lg--auto bx--no-gutter--left text-input__label">
                        Heslo
                    </div>
                </div>
                <div className="bx--row login__password pb6">
                    <PasswordInput
                        labelText=""
                        className="register__input expressive svg"
                        id="register_password"
                        invalid={validationPassword}
                        invalidText="Heslo musí osahovať minimálne 8 znakov"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className="bx--row inputLabel">
                    <div className="bx--col-lg--auto bx--no-gutter--left text-input__label">
                        Potvrdiť heslo
                    </div>
                </div>
                <div className="bx--row login__password pb6">
                    <PasswordInput
                        labelText=""
                        className="register__input expressive svg"
                        id="register_password_confirm"
                        invalid={validationRepeatedPassword}
                        invalidText="Hesla sa nezhodujú"
                        onChange={e => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                    />
                </div>
                <div className="bx--row button-login">
                    <Button className="button-login__inside bx--btn--expressive svg"
                            renderIcon={ArrowRight32} iconDescription="Registrovať"
                            type="submit"
                    >
                        Registrovať
                    </Button>
                </div>
                {successfulRegistration ?
                    <div  className="bx--row pt6 fs25">
                        Registrácia prebehla úspešne
                    </div> : ''
                }
            </Form>
        </Fragment>
    );
};

export default Register

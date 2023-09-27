import React, { Fragment, useState} from 'react';
import {TextInput, PasswordInput, Form, Button, Checkbox} from 'carbon-components-react';
import { ArrowRight32 } from '@carbon/icons-react';
import './Login.scss'
import '../../styles-own.scss'
import 'regenerator-runtime/runtime'
import {useHistory} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState(false);
    const history = useHistory();

    const emailValidation = email => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regex.test(email);
    }

    function validateForm() {
        return emailValidation(email) && password.length >= 8;
    }

    const loginCheck = async () => {
        const credentials = {email, password};
        try{
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(credentials)
            })
            const data = await response.json();
            if(data.length > 0){
                setValidation(false);
                localStorage.setItem('user_id',data[0].id)
                history.push('/main');
            }
            if(data.length === 0){
                setValidation(true);
            }
        } catch (e) {
            return e;
        }
    }

    const handleSubmit = e => {
       e.preventDefault();
       loginCheck().then();
    }


    
    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
                <div className="bx--row login__heading">
                    <h1>
                        Prihlásenie
                    </h1>
                </div>
                <div className="bx--row login__line">
                    <hr width="100%" color="#6f6f6f" height="1px"/>
                </div>
                <div className="bx--row inputLabel">
                    <div className="bx--col-lg--auto bx--no-gutter--left text-input__label">
                        Email
                    </div>
                </div>
                <div className="bx--row login__username pb6">
                    <TextInput
                        className="login__input"
                        id="login_email"
                        invalidText="Zadaný email je neplatný"
                        labelText=""
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
                        className="login__input expressive svg"
                        id="login_password"
                        invalidText="Heslo musí obsahovať najmenej 8 znakov"
                        labelText=""
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                {validation ?
                    <div  className="bx--row pb4 invalidCredentials">
                        Nesprávna kombinácia emailu a hesla
                    </div> : ''
                }
                <div className="bx--row button-login">
                    <Button className="button-login__inside bx--btn--expressive svg"
                            renderIcon={ArrowRight32} iconDescription="Prihlásiť"
                            type="submit"
                            disabled={!validateForm()}
                    >
                        Prihlásiť
                    </Button>
                </div>
            </Form>
        </Fragment>
    );
};

export default Login
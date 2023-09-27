import React, {} from 'react';
import { Tabs, Tab, } from 'carbon-components-react';
import landingPageGraph from '../../staticFiles/landingPageImg.png'
import Login from '../../components/login/Login'
import Register from '../../components/register/Register'

const LandingPage = () =>{
    return(
        <div className="bx--grid bx--grid--full-width landing-page">
            <div className="bx--row">
                <h1 className="landing-page__heading">Vizualizácia dát v reálnom čase</h1>
            </div>
            <div className="bx--row">
                <div className="bx--col-lg-4 min-width350">
                    <Tabs  aria-label="Tab navigation">
                        <Tab  label="Prilhásenie">
                            <Login />
                        </Tab>
                        <Tab  label="Registrácia">
                            <Register />
                        </Tab>
                    </Tabs>
                </div>
                <div className="bx--col-lg--auto landing-page__img">
                    <img
                        className="landing-page-img"
                        src={landingPageGraph}
                        alt="Grafy"
                    />
                </div>
            </div>
        </div>
    );
}

export default LandingPage
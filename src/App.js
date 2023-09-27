import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Content } from 'carbon-components-react';
import MainHeader from './components/header/Header';
import './App.scss';
import LandingPage from './content/landingPage/LandingPage';
import AboutProjectPage from './content/aboutProjectPage/AboutProjectPage';
import MainPage from './content/mainPage/mainPage';

class App extends Component {
    render() {
        return (
            <>
                <MainHeader />
                <Content>
                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/repos" component={AboutProjectPage} />
                        <Route path="/main" component={MainPage} />
                    </Switch>
                </Content>
            </>
        );
    }
}

export default App
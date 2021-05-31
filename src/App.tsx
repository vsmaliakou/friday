import React from 'react';
import './App.css';
import {Header} from "./main/ui/header/Header";
import {Redirect, Route, Switch} from "react-router-dom";
import {Profile} from "./main/ui/components/profile/Profile";
import {ForgotPassword} from "./main/ui/components/auth/forgotPassword/ForgotPassword";
import {SetPassword} from "./main/ui/components/auth/setPassword/SetPassword";
import {Test} from "./main/ui/components/test/Test";
import {RegisterContainer} from "./main/ui/components/auth/register/RegisterContainer";
import {LoginContainer} from "./main/ui/components/auth/login/LoginContainer";
import { ForgotPasswordContainer } from './main/ui/components/auth/forgotPassword/ForgotPasswordContainer';

const App = () => {
    return (
        <div className="App">
            <Header/>
            <div className="App-content">
                <Switch>
                    <Route path='/login' render={() => <LoginContainer/>}/>
                    <Route path='/registration' render={() => <RegisterContainer/>}/>
                    <Route path='/profile' render={() => <Profile/>}/>
                    <Route path='/forgot' render={() => <ForgotPasswordContainer/>}/>
                    <Route path='/new-password' render={() => <SetPassword/>}/>
                    <Route path='/test' render={() => <Test/>}/>
                    <Route path='/404' render={() => <div>404 PAGE NOT FOUND</div>}/>
                    <Route path='*' render={() => <Redirect to={'/404'}/>}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
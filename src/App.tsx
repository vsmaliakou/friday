import React from 'react';
import './App.css';
import {Redirect, Route, Switch} from "react-router-dom";
import {RegisterContainer} from "./main/ui/components/auth/register/RegisterContainer";
import {LoginContainer} from "./main/ui/components/auth/login/LoginContainer";
import {ForgotPasswordContainer} from './main/ui/components/auth/forgotPassword/ForgotPasswordContainer';
import {SetPasswordContainer} from "./main/ui/components/auth/setPassword/SetPasswordContainer";
import {ContainerPage} from "./main/ui/components/pages/ContainerPage";
import {EmailPassword} from "./main/ui/components/auth/forgotPassword/EmailPassword";

const App = () => {
    return (
        <div className="App">
            <div className="App-content">
                <Switch>
                    <Route exact path='/' render={() => <Redirect to={'/login'}/>}/>
                    <Route path='/login' render={() => <LoginContainer/>}/>
                    <Route path='/registration' render={() => <RegisterContainer/>}/>
                    <Route path='/forgot' render={() => <ForgotPasswordContainer/>}/>
                    <Route path='/check-email' render={() => <EmailPassword/>}/>
                    <Route path='/set-new-password/:token' render={() => <SetPasswordContainer/>}/>
                    <Route path={['/profile', '/packs', '/packs/:_id', '/learn/:_id']} render={() => <ContainerPage/>}/>
                    <Route path='/404' render={() => <div>404 PAGE NOT FOUND</div>}/>
                    <Route path='*' render={() => <Redirect to={'/404'}/>}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
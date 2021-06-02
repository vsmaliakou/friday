import React from 'react';
import './App.css';
import {Header} from "./main/ui/header/Header";
import {Redirect, Route, Switch} from "react-router-dom";
import {RegisterContainer} from "./main/ui/components/auth/register/RegisterContainer";
import {LoginContainer} from "./main/ui/components/auth/login/LoginContainer";
import {ForgotPasswordContainer} from './main/ui/components/auth/forgotPassword/ForgotPasswordContainer';
import {SetPasswordContainer} from "./main/ui/components/auth/setPassword/SetPasswordContainer";
import {CardsPacksContainer} from "./main/ui/components/packs/CardsPacksContainer";
import {Cards} from "./main/ui/components/packs/cards/Cards";
import {ProfileContainer} from "./main/ui/components/profile/ProfileContainer";

const App = () => {
    return (
        <div className="App">
            <Header/>
            <div className="App-content">
                <Switch>
                    <Route path='/login' render={() => <LoginContainer/>}/>
                    <Route path='/registration' render={() => <RegisterContainer/>}/>
                    <Route path='/profile' render={() => <ProfileContainer/>}/>
                    <Route path='/forgot' render={() => <ForgotPasswordContainer/>}/>
                    <Route path='/set-new-password/:token' render={() => <SetPasswordContainer/>}/>
                    <Route path='/packs' render={() => <CardsPacksContainer/>}/>
                    <Route path='/cards' render={() => <Cards/>}/>
                    <Route path='/404' render={() => <div>404 PAGE NOT FOUND</div>}/>
                    <Route path='*' render={() => <Redirect to={'/404'}/>}/>
                    
                    
                </Switch>
            </div>
        </div>
    );
}

export default App;
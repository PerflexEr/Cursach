import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/Approuter";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import CssBaseline from '@mui/material/CssBaseline';
import { AppThemeProvider } from './provider/theme-provider';
import {check} from "./services/userAPI";
import NavBar from './components/NavBar';
const App = observer(() => {
    return (
        <React.Fragment>
            <AppThemeProvider>
                <BrowserRouter>
                <CssBaseline />
                    <NavBar/>
                    <AppRouter/>
                </BrowserRouter>
            </AppThemeProvider>
        </React.Fragment>
    );
});

export default App;
import React, { useContext } from 'react';
import { Routes, Route, Navigate} from "react-router-dom";
import { authRoutes, publicRoutes ,  } from '../routes';
import { Context } from "../index";
const AppRouter = () => {

    const {user} = useContext(Context)
    console.log(user);
    return (
        <Routes>
            {user.isAuth === true &&
                authRoutes.map(({ path, Element }) => (
                    <Route key={path} path={path} element={<Element />} />
                ))
            }
            {
                publicRoutes.map(({ path, Element }) => (
                    <Route key={path} path={path} element={<Element />} />
                ))
            }
            <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
    );
};

export default AppRouter;

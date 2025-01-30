import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { DatabaseProvider } from './components/DatabaseProvider';

export default function App() {
    return (
        <DatabaseProvider>
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element} />;
                })}
            </Routes>
        </DatabaseProvider>
    );
}

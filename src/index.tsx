import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";

import {setupStore} from "./redux";
import {router} from "./router";
import './index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);



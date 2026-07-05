import React from "react";
import ReactDOM
from "react-dom/client";

import App from "./App";

import {AuthProvider} from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render( // This div is where the React app should live.
    <AuthProvider>
        <App />
    </AuthProvider>
);
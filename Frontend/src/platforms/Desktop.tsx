import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import Login from "../pages/desktop/Login";

export default function Desktop():JSX.Element{

    return <BrowserRouter>
        <Routes>
            <Route index element={<Login/>}/>
        </Routes>
    </BrowserRouter>
}
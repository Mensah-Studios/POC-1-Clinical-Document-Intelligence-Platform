import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import MobileLogin from "../pages/mobile/Login";

export default function Mobile():JSX.Element{

    return <BrowserRouter>
        <Routes>
            <Route index element={<MobileLogin/>}/>
        </Routes>
    </BrowserRouter>
}
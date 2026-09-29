import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import Login from "../../pages/desktop/Login";
import Dashboard from "../../pages/desktop/Dashboard";
import Upload from "../../pages/desktop/Upload";
import PatientSearch from "../../pages/desktop/PatientSearch";
import PatientView from "../../pages/desktop/PatientView";
import PatientSummary from "../../pages/desktop/PatientSummary";
import PatientDocuments from "../../pages/desktop/PatientDocuments";
import PatientUpdate from "../../pages/desktop/PatientUpdate";
import PatientDelete from "../../pages/desktop/PatientDelete";
import AppLayout from "../../components/navigation/AppLayout";
import { ROUTES } from "../../constants/routes";

export default function Desktop():JSX.Element{

    return <BrowserRouter>
        <Routes>
            <Route index element={<Login/>}/>
            <Route element={<AppLayout/>}>
                <Route path={ROUTES.home} element={<Dashboard/>}/>
                <Route path={ROUTES.upload} element={<Upload/>}/>
                <Route path={ROUTES.search} element={<PatientSearch/>}/>
                <Route path={ROUTES.patient} element={<PatientView/>}/>
                <Route path={ROUTES.patientSummary} element={<PatientSummary/>}/>
                <Route path={ROUTES.patientDocuments} element={<PatientDocuments/>}/>
                <Route path={ROUTES.patientUpdate} element={<PatientUpdate/>}/>
                <Route path={ROUTES.patientDelete} element={<PatientDelete/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
}

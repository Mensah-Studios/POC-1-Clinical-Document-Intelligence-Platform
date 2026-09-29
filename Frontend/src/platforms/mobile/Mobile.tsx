import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import MobileLogin from "../../pages/mobile/Login";
import MobileDashboard from "../../pages/mobile/Dashboard";
import MobileUpload from "../../pages/mobile/Upload";
import MobilePatientSearch from "../../pages/mobile/PatientSearch";
import MobilePatientView from "../../pages/mobile/PatientView";
import MobilePatientSummary from "../../pages/mobile/PatientSummary";
import MobilePatientDocuments from "../../pages/mobile/PatientDocuments";
import MobilePatientUpdate from "../../pages/mobile/PatientUpdate";
import MobilePatientDelete from "../../pages/mobile/PatientDelete";
import MobileLayout from "../../components/mobile/navigation/MobileLayout";
import { ROUTES } from "../../constants/routes";

export default function Mobile():JSX.Element{

    return <BrowserRouter>
        <Routes>
            <Route index element={<MobileLogin/>}/>
            <Route element={<MobileLayout/>}>
                <Route path={ROUTES.home} element={<MobileDashboard/>}/>
                <Route path={ROUTES.upload} element={<MobileUpload/>}/>
                <Route path={ROUTES.search} element={<MobilePatientSearch/>}/>
                <Route path={ROUTES.patient} element={<MobilePatientView/>}/>
                <Route path={ROUTES.patientSummary} element={<MobilePatientSummary/>}/>
                <Route path={ROUTES.patientDocuments} element={<MobilePatientDocuments/>}/>
                <Route path={ROUTES.patientUpdate} element={<MobilePatientUpdate/>}/>
                <Route path={ROUTES.patientDelete} element={<MobilePatientDelete/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
}

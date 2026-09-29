import type { JSX } from "react/jsx-runtime";
import Card from "../common/Card";
import LinkButton from "../common/LinkButton";
import { PATIENT_NOT_FOUND_CONTENT } from "../../constants/patients";
import { ROUTES } from "../../constants/routes";
import type { PatientNotFoundProps } from "../../Types/PatientNotFoundProps";

export default function PatientNotFound({ mrn }: PatientNotFoundProps): JSX.Element {
    return <Card title={PATIENT_NOT_FOUND_CONTENT.title} description={PATIENT_NOT_FOUND_CONTENT.description(mrn)}>
        <LinkButton to={ROUTES.search} variant="outline">{PATIENT_NOT_FOUND_CONTENT.back}</LinkButton>
    </Card>
}

export type SelectFieldProps = {
    id: string;
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    hideLabel?: boolean;
};

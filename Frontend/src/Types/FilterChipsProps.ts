export type FilterChipOption = {
    value: string;
    label: string;
    count: number;
};

export type FilterChipsProps = {
    label: string;
    options: FilterChipOption[];
    value: string;
    onChange: (value: string) => void;
};

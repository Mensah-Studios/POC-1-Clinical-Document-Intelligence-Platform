export type FilePickerProps = {
    accept: string;
    onFilesSelected: (files: File[]) => void;
};

import React, { useRef } from 'react'
import { Button, IconButton, Link } from '@material-ui/core';
import styles from '../styles/Home.module.css'
import { IFile } from '../types/file';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DeleteIcon from '@material-ui/icons/Delete';

interface FileUploadProps {
    uploadFile: Function;
    removeFile: Function;
    downloadFile: Function;
    uploadedFiles: IFile[];
    multiple: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ uploadFile, removeFile, downloadFile, uploadedFiles, multiple }) => {
    const ref = useRef<HTMLInputElement>()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            uploadFile(e.target.files[0])
        }
    }

    const downloadForOne = (event) => {
        event.stopPropagation()
        downloadFile(uploadedFiles[0])
    }

    return (
        <div className={styles.file_upload}>
            {
                multiple ?
                    <ul className={styles.file_upload_array}>
                        {uploadedFiles.map((file) =>
                            <li key={file.id} className={styles.file_upload_file}>
                                <UploadedFileComponent file={file} removeFile={removeFile} downloadFile={downloadFile} />
                            </li>)}
                    </ul>
                    :
                    (uploadedFiles.length > 0 && <Link onClick={downloadForOne}>{uploadedFiles[0].name}</Link>)
            }
            <IconButton className={styles.file_upload_icon} onClick={() => ref.current.click()}>
                <AttachFileIcon />
            </IconButton>

            <input
                type="file"
                style={{ display: 'none' }}
                ref={ref}
                onChange={onChange}
            />
        </div>
    )
}

export default FileUpload;

interface UploadedFileProps {
    removeFile: Function;
    downloadFile: Function;
    file: IFile;
}

const UploadedFileComponent: React.FC<UploadedFileProps> = ({ removeFile, downloadFile, file }) => {
    const remove = () => {
        removeFile(file)
    }

    const download = (event) => {
        event.stopPropagation()
        downloadFile(file)
    }

    return (
        <>
            <Link onClick={download}>{file.name}</Link>
            <IconButton onClick={remove}>
                <DeleteIcon />
            </IconButton>
        </>
    )
}
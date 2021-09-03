import axios from 'axios'
import React, { useState } from 'react'
import FileUpload from '../components/FileUpload'
import styles from '../styles/Home.module.css'
import { IFile } from '../types/file'

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([])
  const [multiple, setMultiple] = useState<boolean>(false)

  const uploadFileToServer = async (file) => {
    if (multiple && uploadedFiles.length > 0) {
      await removeFile(uploadedFiles[0])
    }

    const formData = new FormData()
    formData.append('name', file.name)
    formData.append('client', 'testClient')
    formData.append('type', file.type)
    formData.append('data', file)

    await axios.post('http://localhost:5000/file', formData)
      .then((response) => {
        if (checkResponse(response, 201)) {
          multiple ?
            setUploadedFiles(prevFiles => [...prevFiles, response.data])
            :
            setUploadedFiles([response.data])
        }
      })
      .catch(e => console.log(e))
  }

  const removeFile = async (file) => {
    await axios.delete('http://localhost:5000/file/' + file.id, { data: { id: file._id } })
      .then((response) => {
        if (checkResponse(response, 200)) {
          setUploadedFiles(uploadedFiles.filter(fileInArray => fileInArray.id !== response.data))
        }
      })
      .catch(e => console.log(e))
  }

  const downloadFile = async (file) => {
    await axios.get('http://localhost:5000/file/' + file.id,
      { data: { id: file.id } })
      .then((response) => {
        if (checkResponse(response, 200)) {
          const downloadedFile = response.data
          const blob = b64toBlob(downloadedFile.buffer, downloadedFile.type)

          downloadThroughLink(blob, file.name);
        }
      })
      .catch(e => console.log(e))
  }

  const checkResponse = (response, status) => {
    return response.status == status && response.data !== null && response.data !== undefined
  }

  const b64toBlob = (b64Data, contentType) => {
    const buf = Buffer.from(b64Data, 'base64').buffer
    const blob = new Blob([buf], { type: contentType })
    return blob
  }

  const downloadThroughLink = (blob, fileName) => {
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link)
    link.click()
    link.parentNode.removeChild(link)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Тестовое задание для "Фастек"
        </h1>
        <p>Поле для прикрепления 1 или несколько файлов с возможностью удаления и перезаписи (если 1)</p>
        <br />

        <h3>1</h3>
        <FileUpload
          uploadFile={uploadFileToServer}
          removeFile={removeFile}
          downloadFile={downloadFile}
          uploadedFiles={uploadedFiles}
          multiple={multiple} />

        {/* <h3>Несколько</h3>
        <FileUpload
          uploadFile={uploadFileToServer}
          removeFile={removeFile}
          downloadFile={downloadFile}
          uploadedFiles={uploadedFiles}
          multiple={multiple} /> */}

      </main>
    </div>
  )
}

export default Index;
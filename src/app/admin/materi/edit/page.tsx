"use client"

import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { TextInput, Button, Label, FileInput, Spinner, Alert } from 'flowbite-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMateriControllerUpdateMutation, useMateriControllerFindOneQuery } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import ToastNotification from '@/components/ToastNotification';
import TiptapEditor from '@/components/TiptapEditor';
import LoadingSkeletonUpdateMateri from './loading';
import { getCookie } from 'cookies-next';

const EditMateri = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const materiId = searchParams.get('materiId');
  
  const { data: getMateri, isLoading: isLoadingGetMateri } = useMateriControllerFindOneQuery({ 
    id: Number(materiId ?? 0),
    authorization: `Bearer ${getCookie('refreshToken')}` 
  });
  const [updateMateri, { isLoading: isLoadingUpdateMateri }] = useMateriControllerUpdateMutation();

  const pelajaranId = searchParams.get('pelajaranId')
  const namaPelajaran = searchParams.get('namaPelajaran')
  const [namaMateri, setNamaMateri] = useState('');
  const [isiMateri, setIsiMateri] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('error');

  async function fetchFile(url: string, fileName: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();

    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }

  const getAllFile = async () => {
    try {
      if (getMateri) {
        const filePromises = getMateri.materi.files.map(async (file) =>
          await fetchFile(file.fileUrl, file.originalName)
        );
        
        const filesFetch = await Promise.all(filePromises)
        setFiles(filesFetch);
      }
    } catch (error) {
      setToastMessage(`${error}`)
      setToastType('error')
    }
  }

  useEffect(() => {
    if (getMateri) {
      setNamaMateri(getMateri.materi.nama_materi);
      setIsiMateri(getMateri.materi.isi_materi);
      getAllFile()
      .then()
      .catch(error => {
        setToastMessage(`${error}`)
        setToastType('error')
      })
    }
  }, [getMateri]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (files.length + selectedFiles.length > 10) {
      setErrorMessage('Maksimum 10 file yang diizinkan.');
      return;
    }
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
        const formData = new FormData();
        formData.append('pelajaranId', pelajaranId ?? '');
        formData.append('nama_materi', namaMateri);
        formData.append('isi_materi', isiMateri);
        files.forEach((file) => {
          formData.append('files', file);
        });

        const response = await updateMateri({
            id: Number(materiId),
            updateMateriDto: formData,
            authorization: `Bearer ${getCookie('refreshToken')}`
        }).unwrap();

        setToastMessage(response.message as string);
        setToastType('success');
        router.back();
    } catch (error) {
        setToastMessage('Terjadi kesalahan saat mengupdate materi');
        setToastType('error');
    }
  };


  if(isLoadingGetMateri) {
    return <LoadingSkeletonUpdateMateri/>
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-5 space-y-4">
        <h2 className="text-2xl font-bold">Perbarui Materi</h2>

        {errorMessage && (
          <Alert color="failure" onDismiss={() => setErrorMessage('')}>
            {errorMessage}
          </Alert>
        )}

        <div>
          <Label htmlFor="nama_materi" value="Nama Materi" />
          <TextInput
            type="text"
            id="nama_materi"
            value={namaMateri}
            onChange={(e) => setNamaMateri(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="isi_materi" value="Isi Materi" />
          <TiptapEditor
            content={isiMateri}
            onChange={setIsiMateri}
          />
        </div>

        <div>
          <Label htmlFor="files" value="Upload Files (Maks. 10 file)" />
          <FileInput
            id="files"
            multiple
            onChange={handleFileChange}
          />
          <ul className="mt-2">
            {files.map((file, index) => (
              <li key={index} className="flex justify-between items-center mt-1">
                <span>{file.name}</span>
                <Button
                  type="button"
                  color="failure"
                  onClick={() => removeFile(index)}>
                  Hapus
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <Button type="submit" className="bg-blue-500 text-white" disabled={isLoadingUpdateMateri}>
          {isLoadingUpdateMateri ? 
            <Spinner/> : "Perbarui Materi"
          }
        </Button>
      </form>
      {showToast && (
        <div className="fixed bottom-4 right-4">
          <ToastNotification
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </>
  );
};

export default EditMateri;

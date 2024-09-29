'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextInput, Textarea, Button, Label, FileInput, Modal, Alert, Spinner } from 'flowbite-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMateriControllerCreateMutation } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import ToastNotification from '@/components/ToastNotification';
import TiptapEditor from '@/components/TiptapEditor';

const TambahMateri = () => {
  const router = useRouter();
  const [ createMateri, { isLoading: isLoadingCreateMateri } ] = useMateriControllerCreateMutation()
  const searchParams = useSearchParams();
  const pelajaranId = searchParams.get('pelajaranId')
  const namaPelajaran = searchParams.get('namaPelajaran')
  const [namaMateri, setNamaMateri] = useState('');
  const [isiMateri, setIsiMateri] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('error');

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

      const response = await createMateri({
          createMateriDto: formData
      }).unwrap()

      setToastMessage(response.message as string)
      setToastType('success')
      router.back()
    } catch (error) {
      
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-5 space-y-4">
        <h2 className="text-2xl font-bold">Tambah Materi</h2>

        {errorMessage && (
          <Alert color="failure" onDismiss={() => setErrorMessage('')}>
            {errorMessage}
          </Alert>
        )}

      <div>
          <Label htmlFor="namaPelajaran" value="Nama Pelajaran" />
          <TextInput
              type="text"
              id="namaPelajaran"
              value={namaPelajaran || ''}
              readOnly
              required
              disabled
          />
      </div>

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

        <Button type="submit" className="bg-blue-500 text-white" disabled={isLoadingCreateMateri}>
          {isLoadingCreateMateri ? 
            <Spinner/> : "Tambah Materi"
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

export default TambahMateri;

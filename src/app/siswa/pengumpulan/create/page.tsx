'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextInput, Button, Label, FileInput, Alert, Spinner } from 'flowbite-react';
import { useRouter, useSearchParams } from 'next/navigation';
import ToastNotification from '@/components/ToastNotification';
import TiptapEditor from '@/components/TiptapEditor';
import { usePengumpulanControllerCreateMutation } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import { getCookie } from 'cookies-next';

const TambahPengumpulan = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tugasId = searchParams.get('tugasId'); // Get tugasId from URL params
  const [createPengumpulan, { isLoading: isLoadingCreatePengumpulan }] = usePengumpulanControllerCreateMutation();
  
  const [detailPengumpulan, setDetailPengumpulan] = useState('');
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
      formData.append('tugasId', tugasId || ''); // Pass tugasId
      formData.append('detail_pengumpulan', detailPengumpulan); // Pass pengumpulan details
      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await createPengumpulan({
        createPengumpulanDto: formData,
        authorization: `Bearer ${getCookie('refreshToken')}`,
      }).unwrap();

      setToastMessage(response.message as string);
      setToastType('success');
      router.back();
    } catch (error) {
      setToastMessage('Gagal menambah pengumpulan');
      setToastType('error');
      setShowToast(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-5 space-y-4">
        <h2 className="text-2xl font-bold">Tambah Pengumpulan</h2>

        {errorMessage && (
          <Alert color="failure" onDismiss={() => setErrorMessage('')}>
            {errorMessage}
          </Alert>
        )}

        <div>
          <Label htmlFor="detail_pengumpulan" value="Detail Pengumpulan (opsional)" />
          <TiptapEditor
            content={detailPengumpulan}
            onChange={setDetailPengumpulan}
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

        <Button type="submit" className="bg-blue-500 text-white" disabled={isLoadingCreatePengumpulan}>
          {isLoadingCreatePengumpulan ? <Spinner /> : 'Tambah Pengumpulan'}
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

export default TambahPengumpulan;

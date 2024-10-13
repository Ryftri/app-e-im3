'use client';

import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Button, FileInput, Label, Spinner } from 'flowbite-react';
import TiptapEditor from '@/components/TiptapEditor';
import { usePengumpulanControllerFindOneQuery, usePengumpulanControllerUpdateMutation } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import { getCookie } from 'cookies-next';
import ToastNotification from '@/components/ToastNotification';

export default function EditPengumpulan() {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const pengumpulanId = searchParams.get('pengumpulanId');
  const tugasId = searchParams.get('tugasId');

  const { data: getPengumpulan, isLoading, isError, error } = usePengumpulanControllerFindOneQuery({
    id: Number(pengumpulanId),
    authorization: `Bearer ${getCookie('refreshToken')}`
  });

  const [updatePengumpulan, { isLoading: isLoadingUpdatePengumpulan }] = usePengumpulanControllerUpdateMutation();
  const [detailPengumpulan, setDetailPengumpulan] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success');

  useEffect(() => {
    if (getPengumpulan) {
      setDetailPengumpulan(getPengumpulan.pengumpulan.detail_pengumpulan || '');
      fetchAllFiles();
    }
  }, [getPengumpulan]);

  const fetchFile = async (url: string, fileName: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const fetchAllFiles = async () => {
    try {
      if (getPengumpulan) {
        const filePromises = getPengumpulan.pengumpulan.files.map(async (file) =>
          await fetchFile(file.fileUrl, file.originalName)
        );
        const filesFetched = await Promise.all(filePromises);
        setFiles(filesFetched);
      }
    } catch (error) {
      setErrorMessage(`Error fetching files: ${error}`);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (files.length + selectedFiles.length > 10) {
      setErrorMessage('Maksimum 10 file yang diizinkan.');
      return;
    }
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('tugasId', tugasId || '');
      formData.append('detail_pengumpulan', detailPengumpulan);
      files.forEach((file) => formData.append('files', file));

      const response = await updatePengumpulan({
        id: Number(pengumpulanId),
        updatePengumpulanDto: formData,
        authorization: `Bearer ${getCookie('refreshToken')}`
      }).unwrap();

      setToastMessage(response.message as string);
      setToastType('success');
      setShowToast(true);
      router.back();
    } catch (error) {
      setToastMessage('Terjadi kesalahan saat mengupdate pengumpulan.');
      setToastType('error');
      setShowToast(true);
    }
  };

  if (isLoading) {
    return <Spinner aria-label="Loading" />;
  }

  if (isError) {
    return (
      <Alert color="failure">
        <span>{error.message || 'Terjadi kesalahan saat mengambil data pengumpulan.'}</span>
      </Alert>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-5 space-y-4">
        <h2 className="text-2xl font-bold">Edit Pengumpulan</h2>

        {errorMessage && (
          <Alert color="failure" onDismiss={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        )}

        <div>
          <Label htmlFor="detail_pengumpulan" value="Detail Pengumpulan" />
          <TiptapEditor content={detailPengumpulan} onChange={setDetailPengumpulan} />
        </div>

        <div>
          <Label htmlFor="files" value="Upload Files (Maks. 10 file)" />
          <FileInput id="files" multiple onChange={handleFileChange} />
          <ul className="mt-2">
            {files.map((file, index) => (
              <li key={index} className="flex justify-between items-center mt-1">
                <span>{file.name}</span>
                <Button type="button" color="failure" onClick={() => removeFile(index)}>
                  Hapus
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <Button type="submit" className="bg-blue-500 text-white" disabled={isLoadingUpdatePengumpulan}>
          {isLoadingUpdatePengumpulan ? <Spinner /> : 'Update Pengumpulan'}
        </Button>
      </form>

      {showToast && (
        <div className="fixed bottom-4 right-4">
          <ToastNotification
            message={toastMessage ?? ""}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </>
  );
}

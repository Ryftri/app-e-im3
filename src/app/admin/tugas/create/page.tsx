'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextInput, Button, Label, FileInput, Alert, Spinner, Select, Datepicker } from 'flowbite-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTugasControllerCreateMutation } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import ToastNotification from '@/components/ToastNotification';
import TiptapEditor from '@/components/TiptapEditor';
import { getCookie } from 'cookies-next';

const TambahTugas = () => {
    const router = useRouter();
    const [createTugas, { isLoading: isLoadingCreateTugas }] = useTugasControllerCreateMutation();
    const searchParams = useSearchParams();
    const pelajaranId = searchParams.get('pelajaranId');
    const [namaTugas, setNamaTugas] = useState('');
    const [isiTugas, setIsiTugas] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('error');
    const [openIn, setOpenIn] = useState<Date | null>(null);
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [isDeadlineDisabled, setIsDeadlineDisabled] = useState(true);
  
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
  
      if (!openIn || !deadline) {
        setErrorMessage('Tanggal open dan deadline harus diisi.');
        return;
      }
  
      if (deadline <= openIn) {
        setErrorMessage('Deadline harus lebih besar dari waktu open.');
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append('pelajaranId', pelajaranId ?? '');
        formData.append('nama_tugas', namaTugas);
        formData.append('isi_tugas', isiTugas);
        formData.append('openIn', openIn.toISOString());
        formData.append('deadline', deadline.toISOString());
        files.forEach((file) => {
          formData.append('files', file);
        });
  
        const response = await createTugas({
          createTugasDto: formData,
          authorization: `Bearer ${getCookie('refreshToken')}`,
        }).unwrap();
  
        setToastMessage(response.message as string);
        setToastType('success');
        router.back();
      } catch (error) {
        setToastMessage('Gagal membuat tugas');
        setToastType('error');
        setShowToast(true);
      }
    };
  
    const handleOpenInChange = (date: Date | null) => {
      setOpenIn(date);
      setIsDeadlineDisabled(!date); // Jika openIn dipilih, enable deadline
      setDeadline(null); // Reset deadline setiap kali openIn berubah
    };
  
    return (
      <>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-5 space-y-4">
          <h2 className="text-2xl font-bold">Form Tambah Tugas</h2>
  
          {errorMessage && (
            <Alert color="failure" onDismiss={() => setErrorMessage('')}>
              {errorMessage}
            </Alert>
          )}
  
          <div>
            <Label htmlFor="nama_tugas" value="Nama Tugas" />
            <TextInput
              type="text"
              id="nama_tugas"
              value={namaTugas}
              onChange={(e) => setNamaTugas(e.target.value)}
              required
            />
          </div>
  
          <div>
            <Label htmlFor="isi_tugas" value="Isi Tugas (Opsional)" />
            <TiptapEditor content={isiTugas} onChange={setIsiTugas} />
          </div>
  
          <div>
            <Label htmlFor="openIn" value="Tanggal Mulai" />
            <Datepicker
              value={openIn?.toLocaleDateString('id')}
              onSelectedDateChanged={handleOpenInChange}
              minDate={new Date()}
              maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
              language="id"
              name="openIn"
              title="Tanggal Mulai"
              labelTodayButton="Pilih"
              labelClearButton="Tutup"
              className="w-full"
            />
          </div>
  
          <div>
            <Label htmlFor="deadline" value="Tanggal Deadline" />
            <Datepicker
              value={deadline?.toLocaleDateString('id')}
              onSelectedDateChanged={(date) => setDeadline(date)}
              minDate={openIn ? new Date(openIn.getTime() + 1 * 24 * 60 * 60 * 1000) : new Date()}
              maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
              language="id"
              name="deadline"
              title="Deadline"
              labelTodayButton="Pilih"
              labelClearButton="Tutup"
              className="w-full"
              disabled={isDeadlineDisabled} // Disable sebelum openIn dipilih
            />
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
  
          <Button type="submit" className="bg-blue-500 text-white" disabled={isLoadingCreateTugas}>
            {isLoadingCreateTugas ? <Spinner /> : 'Simpan Tugas'}
          </Button>
        </form>
        {showToast && (
          <div className="fixed bottom-4 right-4">
            <ToastNotification message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
          </div>
        )}
      </>
    );
};
  
export default TambahTugas;
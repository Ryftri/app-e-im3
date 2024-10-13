'use client'

import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { TextInput, Button, Label, FileInput, Alert, Spinner, Select, Datepicker } from 'flowbite-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTugasControllerUpdateMutation, useTugasControllerFindOneQuery } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import ToastNotification from '@/components/ToastNotification';
import TiptapEditor from '@/components/TiptapEditor';
import { getCookie } from 'cookies-next';

const EditTugas = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tugasId = searchParams.get('tugasId');
    const pelajaranId = searchParams.get('pelajaranId');

    const { data: getTugas, isLoading: isLoadingGetTugas } = useTugasControllerFindOneQuery({ 
        id: Number(tugasId ?? 0),
        authorization: `Bearer ${getCookie('refreshToken')}` 
    });
    const [updateTugas, { isLoading: isLoadingUpdateTugas }] = useTugasControllerUpdateMutation();

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

    async function fetchFile(url: string, fileName: string): Promise<File> {
        const response = await fetch(url);
        const blob = await response.blob();
    
        const file = new File([blob], fileName, { type: blob.type });
        return file;
    }

    const getAllFile = async () => {
        try {
          if (getTugas) {
            const filePromises = getTugas.tugas.files.map(async (file) =>
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

    // Fetch initial data for the task
    useEffect(() => {
        if (getTugas) {
            setNamaTugas(getTugas.tugas.nama_tugas);
            setIsiTugas(getTugas.tugas.isi_tugas);
            setOpenIn(new Date(getTugas.tugas.openIn));
            setDeadline(new Date(getTugas.tugas.deadline));
            getAllFile()
            .then()
            .catch(error => {
                setToastMessage(`${error}`)
                setToastType('error')
            })
        }
    }, [getTugas]);

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

            const response = await updateTugas({
                id: Number(tugasId),
                updateTugasDto: formData,
                authorization: `Bearer ${getCookie('refreshToken')}`,
            }).unwrap();

            setToastMessage(response.message as string);
            setToastType('success');
            router.back();
        } catch (error) {
            setToastMessage('Gagal mengupdate tugas');
            setToastType('error');
            setShowToast(true);
        }
    };

    const handleOpenInChange = (date: Date | null) => {
        setOpenIn(date);
        setIsDeadlineDisabled(!date);
        setDeadline(null);
    };

    if (isLoadingGetTugas) {
        return <Spinner />;
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-5 space-y-4">
                <h2 className="text-2xl font-bold">Edit Tugas</h2>

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
                        disabled={isDeadlineDisabled}
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

                <Button type="submit" className="bg-blue-500 text-white" disabled={isLoadingUpdateTugas}>
                    {isLoadingUpdateTugas ? <Spinner /> : 'Update Tugas'}
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

export default EditTugas;

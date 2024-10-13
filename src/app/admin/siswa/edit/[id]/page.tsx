'use client'

import { FormEvent, useEffect, useState } from 'react';
import { Button, TextInput, Label, Spinner, Card } from 'flowbite-react';
import ToastNotification from '@/components/ToastNotification';
import { useUserControllerFinOneSiswaQuery, useUserControllerUpdateMutation } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import { GlobalResponse } from '@/types/GlobalResponse';
import { useRouter } from 'next/navigation';
import { ToastType } from '@/types/Toas';
import { getCookie } from 'cookies-next';

function EditSiswa({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const { data: siswaData, error: errorFetching, isLoading: isLoadingFetching } = useUserControllerFinOneSiswaQuery({
    id: Number(id),
    authorization: `Bearer ${getCookie('refreshToken')}`
  });
  const [updateUser, { isLoading: isUpdating, isError: isErrorUpdating, data: updatedData }] = useUserControllerUpdateMutation();

  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Set nilai form berdasarkan data yang di-fetch dari server
    if (siswaData) {
      setNamaLengkap(siswaData.siswa.nama_lengkap);
      setEmail(siswaData.siswa.email || '');
      setUsername(siswaData.siswa.username);
    }
  }, [siswaData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== confPassword) {
        setToastMessage('Password dan Konfirmasi Password harus sama!');
        setToastType('error');
        setShowToast(true);
        return;
      }

      const updatedData = {
        nama_lengkap: namaLengkap,
        email: email || undefined,
        username,
        password: password,
        confPassword: confPassword,
        isActive: true
      };

      const response = await updateUser({ 
        id: Number(id),
        updateUserDto: updatedData,
        authorization: `Bearer ${getCookie('refreshToken')}`
      });

      if (response.error) {
        const error: GlobalResponse = response.error as GlobalResponse;
        setToastMessage(`${error.message}`);
        setToastType('error');
        setShowToast(true);
      } else {
        setToastMessage('Data siswa berhasil diperbarui!');
        setToastType('success');
        setShowToast(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.back(); // Kembali ke halaman sebelumnya
      }
    } catch (error) {
      setToastMessage(`Terjadi kesalahan: ${error}`);
      setToastType('error');
      setShowToast(true);
    }
  };

  if (isLoadingFetching) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner size="xl" />
      </div>
    );
  }

  if (errorFetching) {
    return <p>Error: {`${errorFetching}`}</p>;
  }

  return (
    <div className="flex-grow flex justify-center items-center">
      <Card className="w-full max-w-lg">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-center font-bold text-2xl">Edit Siswa</h1>
          
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <div>
                <Label htmlFor="namaLengkap" className="block mb-2">Nama Lengkap</Label>
                <TextInput
                  id="namaLengkap"
                  type="text"
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="block mb-2">Email (Opsional)</Label>
                <TextInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="username" className="block mb-2">Username</Label>
                <TextInput
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col w-1/2">
              <div>
                <Label htmlFor="password" className="block mb-2">Password</Label>
                <TextInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Kosongkan jika tidak ingin mengubah password"
                />
              </div>

              <div>
                <Label htmlFor="confPassword" className="block mb-2">Konfirmasi Password</Label>
                <TextInput
                  id="confPassword"
                  type="password"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  placeholder="Kosongkan jika tidak ingin mengubah password"
                />
              </div>
            </div>
          </div>

          {/* Tombol Submit */}
          <Button
            type="submit"
            className="bg-blue-500 text-white font-bold hover:bg-blue-600 mt-4"
            disabled={isUpdating}
          >
            {isUpdating ? 
              <>
                <Spinner />
                <span className="pl-3">Tunggu...</span>
              </>
            : 'Update Siswa'
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
      </Card>
    </div>
  );
}

export default EditSiswa;

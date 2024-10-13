'use client'

import { FormEvent, useState, useEffect } from 'react';
import { Button, TextInput, Label, Select, Spinner, Card, Alert } from 'flowbite-react';
import ToastNotification from '@/components/ToastNotification';
import { ToastType } from '@/types/Toas';
import { useUserControllerUpdateMutation, useUserControllerFinOneGuruQuery } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import { daftarSekolah } from '@/types/ListSekolah';
import { GlobalResponse } from '@/types/GlobalResponse';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';

function EditGuru({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const { data: guruData, isLoading: isLoadingGuru, error: errorGuru } = useUserControllerFinOneGuruQuery({
    id: Number(id),
    authorization: `Bearer ${getCookie('refreshToken')}`
  });
  
  const [updateUser, { isLoading, isError, error: errorToUpdate, data }] = useUserControllerUpdateMutation();
  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [asalSekolah, setAsalSekolah] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [showToast, setShowToast] = useState(false);

  // Mengisi form dengan data yang ada
  useEffect(() => {
    if (guruData) {
      setNamaLengkap(guruData.guru.nama_lengkap || '');
      setEmail(guruData.guru.email || '');
      setUsername(guruData.guru.username || '');
      setAsalSekolah(guruData.guru.asal_sekolah || '');
    }
  }, [guruData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== confPassword) {
        setToastMessage('Password dan Konfirmasi Password harus sama!');
        setToastType("error");
        setShowToast(true);
        return;
      }
  
      const updatedUserData = {
        nama_lengkap: namaLengkap,
        email: email || undefined,
        username,
        password,
        confPassword,
        asal_sekolah: asalSekolah,
        isActive: true,
      };
  
      const response = await updateUser({
        id: Number(id),
        updateUserDto: updatedUserData,
        authorization: `Bearer ${getCookie('refreshToken')}`
      });

      const error: GlobalResponse = response.error as GlobalResponse;
      if (response.error) {
        setToastMessage(`${error.message}`);
        setToastType("error");
        setShowToast(true);
      } else {
        setToastMessage(`${response.data?.message}`);
        setToastType('success');
        setShowToast(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.back();
      }
    } catch (error) {
      setToastMessage(`${error}`);
      setToastType("error");
      setShowToast(true);
    }
  };

  // Menampilkan loading spinner saat data sedang dimuat
  if (isLoadingGuru) {
    return <div className="text-center"><Spinner size="xl" /></div>;
  }

  // Menangani error jika ID tidak ditemukan atau error lainnya
  if (errorGuru) {
    return (
      <div className="flex-grow flex justify-center items-center">
        <Card className="w-full max-w-lg">
          <Alert color="failure">
            <span>
              <p className="font-medium">Error: Data guru tidak ditemukan atau ID tidak valid.</p>
            </span>
          </Alert>
          <Button onClick={() => router.back()} className="mt-4">Kembali</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-grow flex justify-center items-center">
      <Card className="w-full max-w-lg">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-center font-bold text-2xl">Edit Guru</h1>
          
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
                <Label htmlFor="password" className="block mb-2">Password (Opsional)</Label>
                <TextInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="confPassword" className="block mb-2">Konfirmasi Password (Opsional)</Label>
                <TextInput
                  id="confPassword"
                  type="password"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="asalSekolah" className="block mb-2">Asal Sekolah</Label>
                <Select
                    id="asalSekolah"
                    value={asalSekolah}
                    onChange={(e) => setAsalSekolah(e.target.value)}
                    required
                >
                    <option value="" disabled>Pilih Asal Sekolah</option>
                    {daftarSekolah.map((sekolah, index) => (
                        <option key={index} value={sekolah.toUpperCase()}>{sekolah.toUpperCase()}</option>
                    ))}
                </Select>
              </div>
            </div>
          </div>

          {/* Tombol Submit */}
          <Button
            type="submit"
            className="bg-blue-500 text-white font-bold hover:bg-blue-600 mt-4"
            disabled={isLoading}
          >
            {isLoading ? 
              <>
                <Spinner />
                <span className="pl-3">Menyimpan...</span>
              </>
            : 'Simpan'
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

export default EditGuru;
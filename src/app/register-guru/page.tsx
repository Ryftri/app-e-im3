'use client'

import { FormEvent, useState } from 'react';
import { Button, TextInput, Label, Select, Spinner, Card, } from 'flowbite-react';
import ToastNotification from '@/components/ToastNotification';
import { ToastType } from '@/types/Toas';
import { useAuthControllerRegisterMutation } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import { daftarSekolah } from '@/types/ListSekolah';
import { GlobalResponse } from '@/types/GlobalResponse';
import { useRouter } from 'next/navigation';

function RegisterGuru() {
  const router = useRouter();

  const [register, { isLoading, isError, error: errorToregister, data }] = useAuthControllerRegisterMutation();
  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [roleId] = useState(2);
  const [asalSekolah, setAsalSekolah] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== confPassword) {
        setToastMessage('Password dan Konfirmasi Password harus sama!');
        setToastType("error");
        setShowToast(true);
        return;
      }
  
      const registerData = {
        nama_lengkap: namaLengkap,
        email: email || undefined,
        username,
        password,
        confPassword,
        roleId,
        asal_sekolah: asalSekolah,
        isActive: false,
      };
  
      const response = await register({ registerDto: registerData })
  
      console.log(response)
      const error : GlobalResponse = response.error as GlobalResponse
      if(response.error) {
        setToastMessage(`${error.message}`);
        setToastType("error");
        setShowToast(true);
      } else {
        setToastMessage(`${response.data?.message}`);
        setToastType('success');
        setShowToast(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.back()
      }
    } catch (error) {
      setToastMessage(`${error}`);
      setToastType("error");
      setShowToast(true);
    }
  };

  return (
    <div className="flex-grow flex justify-center items-center">
      <Card className="w-full max-w-lg">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-center font-bold text-2xl">Daftar Sebagai Guru</h1>
          
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
                  required
                />
              </div>

              <div>
                <Label htmlFor="confPassword" className="block mb-2">Konfirmasi Password</Label>
                <TextInput
                  id="confPassword"
                  type="password"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  required
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
                        <option key={index} value={sekolah}>{sekolah}</option>
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
                <span className="pl-3">Tunggu...</span>
              </>
            : 'Daftar'
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

export default RegisterGuru;

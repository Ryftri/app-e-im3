"use client"

import React, { useState, useEffect } from 'react';
import { Card, Label, TextInput, Select, Button, Checkbox } from 'flowbite-react';
import ToastNotification from '@/components/ToastNotification';
import { useUserControllerFinOneGuruQuery, useUserControllerUpdateMutation } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import { useRouter } from 'next/navigation';

export default function EditGuruForm({ params }: { params: { id: string } }) {
  const [namaLengkap, setNamaLengkap] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [roleId, setRoleId] = useState(2); // Default to 'Guru'
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success');
  const [showPassword, setShowPassword] = useState(false);

  const [updateUser, { isLoading: isUpdating }] = useUserControllerUpdateMutation();
  const { data, isLoading: isFetching } = useUserControllerFinOneGuruQuery({
    id: Number(params.id)
  });
  const router = useRouter()

  // useEffect(() => {
  //   if (data) {
  //     setNamaLengkap(data.guru.nama_lengkap);
  //     setEmail(data.guru.email);
  //     setUsername(data.guru.username);
  //     setRoleId(data.guru.role.id);
  //   }
  // }, [data]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await updateUser({
  //       id: Number(params.id),
  //       updateUserDto: {
  //         nama_lengkap: namaLengkap,
  //         email,
  //         username,
  //         password,
  //         confPassword,
  //       },
  //     }).unwrap();
  //     setToastMessage('User updated successfully');
  //     setToastType('success');
  //     setShowToast(true);
  //     router.push('/admin/guru')
  //   } catch (error) {
  //     let errorMessage = 'Gagal mengupdate user';
  //     if (error && typeof error === 'object' && 'data' in error) {
  //       const errorData = error as { data: { message: string } };
  //       errorMessage = `Error: ${errorData.data.message}`;
  //     }
  //     setToastMessage(`${errorMessage}`);
  //     setToastType('error');
  //     setShowToast(true);
  //     console.error('Failed to update user:', error);
  //   }
  // };

  return (
    <div className="flex-grow flex justify-center items-center pt-10">
      {/* <Card className="w-full max-w-lg">
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-center font-bold text-2xl">Edit Guru</h1>
          {isFetching ? (
            <p>Loading...</p>
          ) : (
            <>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="nama_lengkap" value="Nama Lengkap" />
                </div>
                <TextInput
                  id="nama_lengkap"
                  type="text"
                  placeholder="Nama Lengkap"
                  required
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="username" value="Username" />
                </div>
                <TextInput
                  id="username"
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="showPassword"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                <Label htmlFor="showPassword">Show Password</Label>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="confPassword" value="Confirm Password" />
                </div>
                <TextInput
                  id="confPassword"
                  type="password"
                  required
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="roleId" value="Role" />
                </div>
                <Select
                  id="roleId"
                  required
                  value={roleId}
                  onChange={(e) => setRoleId(Number(e.target.value))}
                  disabled={true}
                >
                  <option value={2}>Guru</option>
                  <option value={3}>Siswa</option>
                </Select>
              </div>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? 'Updating...' : 'Update User'}
              </Button>
            </>
          )}
        </form>
      </Card>
      {showToast && (
        <div className="fixed bottom-4 right-4">
          <ToastNotification
            message={toastMessage}
            type={toastType}
            onClose={() => setShowToast(false)}
          />
        </div>
      )} */}
    </div>
  );
};
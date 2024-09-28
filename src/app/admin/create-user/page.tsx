"use client"

import React, { useState } from 'react';
import { Card, Label, TextInput, Button, Select, Checkbox } from 'flowbite-react';
import { getCookie } from 'cookies-next';
import ToastNotification from '@/components/ToastNotification';
import { useAppDispatch } from '@/lib/redux/store';
import { useUserControllerCreateMutation } from '@/lib/redux/services/api/endpoints/ApiEiM3';

const CreateUserForm: React.FC = () => {
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

  const [createUser, { isLoading }] = useUserControllerCreateMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({
        createUserDto: {
          nama_lengkap: namaLengkap,
          email,
          username,
          password,
          confPassword,
          roleId,
          isActive: true
        },
      }).unwrap();
      setToastMessage('User created successfully');
      setToastType('success');
      setShowToast(true);
      // Reset form fields
      setNamaLengkap('');
      setEmail('');
      setUsername('');
      setPassword('');
      setConfPassword('');
      setRoleId(2);
    } catch (error) {
      let errorMessage = 'Gagal membuat user';
      if (error && typeof error === 'object' && 'data' in error) {
        const errorData = error as { data: { message: string } };
        errorMessage = `Error: ${errorData.data.message}`;
      }
      setToastMessage(`${errorMessage}`);
      setToastType('error');
      setShowToast(true);
      console.error('Failed to create user:', error);
    }
  };

  return (
    <div className="flex-grow flex justify-center items-center pt-10">
      <Card className="w-full max-w-lg">
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-center font-bold text-2xl">Create New User</h1>
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
            >
              <option value={2}>Guru</option>
              <option value={3}>Siswa</option>
            </Select>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create User'}
          </Button>
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
      )}
    </div>
  );
};

export default CreateUserForm;

"use client"

import React, { useState } from 'react';
import { Button, Spinner } from 'flowbite-react';
import { useAuthControllerLogoutMutation } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import { setIsLogin } from '@/lib/redux/features/isLogin/isLogin';
import { useAppDispatch } from '@/lib/redux/store';
import { deleteCookie, setCookie } from 'cookies-next';
import { ToastType } from '@/types/Toas';
import ToastNotification from './ToastNotification';
import { useRouter } from 'next/navigation';
import FlexibleLoadingText from './animations/FlexibleLoadingTextToPage';

const LogoutButton: React.FC = () => {
  const [logout, { isLoading, isSuccess }] = useAuthControllerLogoutMutation();
  const dispatch = useAppDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setIsLogin(false));
      deleteCookie('refreshToken')
      deleteCookie('clientRefreshToken')
      setCookie('rememberMe', 'false', {
        secure: true,
        sameSite: 'none',
      })
    } catch (error) {
      setToastMessage('Failed to logout');
      setToastType('error');
      setShowToast(true);
      console.error('Failed to logout:', error);
    } finally {
      router.replace('/')
    }
  };

  return (
    <>
      <Button onClick={handleLogout} disabled={isLoading || isSuccess}>
          {isLoading ? 
            <FlexibleLoadingText 
              textMessage='Memproses logout'
            />
          : isSuccess ?
            <FlexibleLoadingText 
              textMessage='Kembali ke halaman login'
            />
          :'Logout'
        }
      </Button>
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

export default LogoutButton;
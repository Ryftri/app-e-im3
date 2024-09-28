"use client"

import React, { useEffect, ComponentType } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useAuthControllerGetMeQuery } from '@/lib/redux/services/api/endpoints/ApiEiM3';
import axios from 'axios';

interface WithAuthProps {}

function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const ComponentWithAuth = (props: P & WithAuthProps) => {
    const router = useRouter();

    useEffect(() => {
        const getMe = axios.get('https://api-e-im3.vercel.app/auth/get-me', {
            withCredentials: true
        })
        .catch(err => {
            if (err.response.status === 401) {
              router.push('/');
              }
        })
      }, [router]);
    
    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}

export default withAuth;

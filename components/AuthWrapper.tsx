"use client";
import React, { useEffect, useState } from "react";
import useAuthVerify from "@/hooks/useAuthVerify";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation';
import { T_SESSION } from "@/types/global";
import LoadingSkeleton from "./LoadingSkeleton";
import { SPAM_MESSAGE } from "@/helpers/constants";
import toast from 'react-hot-toast';

type Props = {
    children: React.ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const { mutate, isLoading } = useAuthVerify();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const token = Cookies.get('p_token');
        const callbackReq = {
            onSuccess: (data: string | T_SESSION) => {
                if (typeof data === 'object') {
                    setIsLoaded(true);
                } else if (data === SPAM_MESSAGE) {
                    toast.error(data);
                } else {
                    toast.error(data);
                    router.push('/');
                }
            },
            onError: () => {
                router.push('/');
            },
        }
        if (token) {
            mutate({ token }, callbackReq);
        } else {
            router.push('/');
        }
    }, [mutate, router])
    return (
        <>
            {pathname !== "/logout" ? !isLoading && isLoaded ? children : <LoadingSkeleton/> : children}
        </>
    )
};

export default AuthWrapper;

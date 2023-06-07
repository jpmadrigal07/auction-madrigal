"use client";
import React, { useEffect, useState } from "react";
import useAuthVerify from "@/hooks/useAuthVerify";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation';
import useSession from "@/store/useSession";
import { T_SESSION } from "@/types/user";
import LoadingSkeleton from "./LoadingSkeleton";

type Props = {
    children: React.ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const { mutate, isLoading } = useAuthVerify();
    const [isLoaded, setIsLoaded] = useState(false);
    const updateSession = useSession((state) => state.updateSession);
    useEffect(() => {
        const token = Cookies.get('p_token');
        const callbackReq = {
            onSuccess: (data: string | T_SESSION) => {
                if (typeof data === 'object') {
                    updateSession(data)
                    setIsLoaded(true);
                } else {
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
    }, [mutate, router, updateSession])
    return (
        <>
            {pathname !== "/logout" ? !isLoading && isLoaded ? children : <LoadingSkeleton/> : children}
        </>
    )
};

export default AuthWrapper;

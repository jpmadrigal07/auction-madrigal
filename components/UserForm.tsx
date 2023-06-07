"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import useLogin from "@/hooks/useLogin";
import useRegister from "@/hooks/useRegister";
import { T_AUTH } from "@/types/user";

export default function UserForm({ headerTitle }: { headerTitle: 'Register' | 'Login' }) {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<T_AUTH>();
    const { mutate, isLoading } = useLogin();
    const { mutate: createUser, isLoading: isRegisterLoading } = useRegister();
    const onSubmit = (data: T_AUTH) => {
        const callbackReq = {
            onSuccess: (data: any) => {
                if (data.token) {
                    Cookies.set('p_token', data.token);
                    router.push('/home');
                } else {
                    toast.error(data.message);
                }
            },
            onError: (err: any) => {
                toast.error(err);
            },
        }
        const registerCallbackReq = {
            onSuccess: (data: any) => {
                if (data && typeof data === 'object') {
                    toast.success("Account created! You can now login.");
                    router.push('/');
                } else {
                    toast.error(data);
                }
            },
            onError: (err: any) => {
                toast.error(err);
            },
        }
        if(headerTitle === "Login") {
            mutate(data, callbackReq)
        } else {
            createUser(data, registerCallbackReq)
        }
    };
    if (Object.keys(errors).length > 0) {
        toast.error('Please complete all fields');
    }
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {headerTitle}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-600">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    {...register("email", { required: true })}
                                    type="email"
                                    autoComplete="email"
                                    disabled={isLoading || isRegisterLoading}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 disabled:opacity-90 disabled:cursor-progress"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-600">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    {...register("password", { required: true })}
                                    type="password"
                                    autoComplete="current-password"
                                    disabled={isLoading || isRegisterLoading}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 disabled:opacity-90 disabled:cursor-progress"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading || isRegisterLoading}
                                className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-90 disabled:cursor-progress"
                            >
                                {headerTitle === "Register" ? "Sign up" : "Sign in"}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        {headerTitle === "Login" && <span>Not a member?{' '}</span>}
                        <Link href={headerTitle === "Register" ? "/" : "/register"} className="font-semibold leading-6 text-purple-600 hover:text-purple-500">
                            {headerTitle === "Register" ? "Login" : "Register"}
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

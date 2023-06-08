"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { T_ITEM } from "@/types/global";
import { useRouter } from 'next/navigation';
import useAddItem from "@/hooks/useAddItem";
import moment from "moment";

type T_Form = T_ITEM & {
    windowHours: number;
    windowMinutes: number;
    windowSeconds: number;
}

const CreateItem = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<T_Form>();
    const { mutate, isLoading } = useAddItem();
    const onSubmit = (data: T_Form) => {
        const callbackReq = {
            onSuccess: (data: string | object) => {
                if (typeof data === "object") {
                    toast.success("Success adding item");
                    router.push("/home");
                } else {
                    toast.error(data);
                }
            },
            onError: (err: any) => {
                toast.error(err);
            },
        }
        if(Number(data.windowHours) === 0 && Number(data.windowMinutes) === 0 && Number(data.windowSeconds) < 30) {
            toast.error("Time window needs to be greater than 30 seconds");
        } else {
            const date = moment().add(data.windowHours, 'hours').add(data.windowMinutes, 'minutes').add(data.windowSeconds, 'seconds').format();
            const finalData = {
                name: data.name,
                origPrice: data.origPrice,
                description: data.description,
                bidEndDate: date,
            }
            mutate(finalData, callbackReq)
        }
    };
    if (Object.keys(errors).length > 0) {
        toast.error('Please complete all fields');
    }
    return (
        <main className="pb-16 pt-8">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <h2 className="text-lg font-medium text-gray-900">Create Item</h2>
                </div>
                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-600">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                id="name"
                                disabled={isLoading}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 disabled:opacity-90 disabled:cursor-progress"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-600">
                            Description
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                {...register("description", { required: true })}
                                id="description"
                                disabled={isLoading}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 disabled:opacity-90 disabled:cursor-progress"
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-600">
                            Start Price
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                                type="text"
                                {...register("origPrice", { required: true })}
                                id="price"
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 disabled:opacity-90 disabled:cursor-progress"
                                placeholder="0.00"
                                aria-describedby="price-currency"
                                disabled={isLoading}
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    USD
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-600">
                            Time Window (Add 0 if not applicable)
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="email" className="block text-sm leading-6 text-gray-500">
                                    Hour
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {...register("windowHours", { required: true })}
                                        id="day"
                                        max={23}
                                        disabled={isLoading}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 disabled:opacity-90 disabled:cursor-progress"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm leading-6 text-gray-500">
                                    Minutes
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {...register("windowMinutes", { required: true })}
                                        id="day"
                                        max={59}
                                        disabled={isLoading}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 disabled:opacity-90 disabled:cursor-progress"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm leading-6 text-gray-500">
                                    Seconds
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        {...register("windowSeconds", { required: true })}
                                        id="day"
                                        max={59}
                                        disabled={isLoading}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 disabled:opacity-90 disabled:cursor-progress"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Link href="/home" type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-90 disabled:cursor-progress"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CreateItem
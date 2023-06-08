"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useBidItem from "@/hooks/useBidItem";
import { T_BID_ITEM } from "@/types/global";
import useGetItem from "@/hooks/useGetItem";
import LoadingSkeleton from "./LoadingSkeleton";
import { useQueryClient } from '@tanstack/react-query'
import toCurrency from "@/helpers/toCurrency";

const Item = ({ itemId }: { itemId: number }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data, isLoading: isItemLoading } = useGetItem(itemId);
    const { register, handleSubmit, formState: { errors } } = useForm<T_BID_ITEM>();
    const { mutate, isLoading } = useBidItem();
    const onSubmit = (data: T_BID_ITEM) => {
        const callbackReq = {
            onSuccess: (data: string | object) => {
                if (typeof data === "object") {
                    toast.success("Success bid item");
                    queryClient.invalidateQueries({ queryKey: ['balance'] });
                    router.push("/home");
                } else {
                    toast.error(data);
                }
            },
            onError: (err: any) => {
                toast.error(err);
            },
        }
        mutate({ ...data, itemId }, callbackReq)
    };
    if (Object.keys(errors).length > 0) {
        toast.error('Please complete all fields');
    }
    if(isItemLoading) {
        return <LoadingSkeleton isFull={false} />
    }
    return (
        <main className="pb-16 pt-8">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="px-4 sm:px-0">
                    <h2 className="text-lg font-medium text-gray-900">Bid to <span className="font-bold text-purple-600">{data.name}</span></h2>
                </div>
                <h4 className="text-sm text-gray-400">Current price is <span className="font-semibold">{toCurrency.format(data.Bid && data.Bid.length > 0 ? data.Bid[0].bidPrice : data.origPrice)}</span></h4>
                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4">
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-600">
                            Price
                        </label>
                        <div className="relative mt-2 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                                type="text"
                                {...register("bidPrice", { required: true })}
                                id="price"
                                disabled={isLoading}
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                                placeholder="0.00"
                                aria-describedby="price-currency"
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <span className="text-gray-500 sm:text-sm" id="price-currency">
                                    USD
                                </span>
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
                            className="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Item
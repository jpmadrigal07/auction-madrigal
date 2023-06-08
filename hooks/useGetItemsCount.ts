import { T_ITEM_COUNT } from '@/types/global';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export async function getItems(
    token: string,
) {
    const res = await fetch(
        `/api/item/count`,
        {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        },
    );
    return res.json();
}

function useGetItemsCount() {
    const token = Cookies.get('p_token');
    const query = useQuery(
        ['itemsCount'],
        () =>
            getItems(
                token as string,
            ),
        {
            enabled: token != null,
            refetchOnWindowFocus: false,
        },
    );

    return query;
}

export default useGetItemsCount;

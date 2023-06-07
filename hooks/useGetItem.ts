import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export async function getItem(
    token: string,
    itemId: number,
) {
    const res = await fetch(
        `/api/item?itemId=${itemId}`,
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

function useGetItem(itemId: number) {
    const token = Cookies.get('p_token');
    const query = useQuery(
        ['item', itemId],
        () =>
            getItem(
                token as string,
                itemId,
            ),
        {
            enabled: token != null && !!itemId,
            refetchOnWindowFocus: false,
        },
    );

    return query;
}

export default useGetItem;

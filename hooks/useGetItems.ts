import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export async function getItems(
    token: string,
    type: 'ongoing' | 'completed',
) {
    const res = await fetch(
        `/api/item/${type}`,
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

function useGetItems(type: 'ongoing' | 'completed') {
    const token = Cookies.get('p_token');
    const query = useQuery(
        ['items', type],
        () =>
            getItems(
                token as string,
                type,
            ),
        {
            enabled: token != null && !!type,
            refetchOnWindowFocus: false,
        },
    );

    return query;
}

export default useGetItems;

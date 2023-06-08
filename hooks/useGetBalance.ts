import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export async function getBalance(
    token: string,
) {
    const res = await fetch(
        `/api/user/balance`,
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

function useGetBalance() {
    const token = Cookies.get('p_token');
    const query = useQuery(
        ['balance'],
        () =>
            getBalance(
                token as string,
            ),
        {
            enabled: token != null,
            refetchOnWindowFocus: false,
        },
    );

    return query;
}

export default useGetBalance;

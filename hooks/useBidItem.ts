import { T_BID_ITEM } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

async function bidItem(
  data: T_BID_ITEM,
) {
  const token = Cookies.get('p_token');
  const res = await fetch(
    `/api/bid`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    },
  );
  return res.json();
}

function useBidItem() {
  const query = useMutation(
    (data: T_BID_ITEM & { itemId: number }) =>
    bidItem(data),
  );

  return query;
}

export default useBidItem;

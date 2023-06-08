import { T_ITEM } from '@/types/global';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

async function addItem(
  data: T_ITEM,
) {
  const token = Cookies.get('p_token');
  const res = await fetch(
    `/api/item`,
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

function useAddItem() {
  const query = useMutation(
    (data: T_ITEM) =>
    addItem(data),
  );

  return query;
}

export default useAddItem;

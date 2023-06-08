import { T_DEPOSIT } from '@/types/global';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

async function addDeposit(
  data: T_DEPOSIT,
) {
  const token = Cookies.get('p_token');
  const res = await fetch(
    `/api/deposit`,
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

function useAddDeposit() {
  const query = useMutation(
    (data: T_DEPOSIT) =>
    addDeposit(data),
  );

  return query;
}

export default useAddDeposit;

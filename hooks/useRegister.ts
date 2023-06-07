import { T_AUTH } from '@/types/user';
import { useMutation } from '@tanstack/react-query';

async function register(
  { email, password }: T_AUTH,
) {
  const res = await fetch(
    `/api/user`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json',
      },
    },
  );
  return res.json();
}

function useLogin() {

  const query = useMutation(
    ({ email, password }: T_AUTH) =>
    register({ email, password }),
  );

  return query;
}

export default useLogin;

import { T_SESSION } from '@/types/user';
import { create } from 'zustand';

interface I_SESSION {
    session: null | T_SESSION;
    updateSession: (by: T_SESSION) => void
}

const useSession = create<I_SESSION>((set) => ({
  session: null,
  updateSession: (session) => set({ session }),
}))

export default useSession;
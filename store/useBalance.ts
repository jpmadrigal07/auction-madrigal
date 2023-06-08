import { create } from 'zustand';

interface I_BALANCE {
  balance: number;
  updateBalance: (by: number) => void
}

const useBalance = create<I_BALANCE>((set) => ({
  balance: 0,
  updateBalance: (balance) => set({ balance }),
}))

export default useBalance;
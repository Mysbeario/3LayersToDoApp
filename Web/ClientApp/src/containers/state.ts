import { atom } from "recoil";

interface AccountState {
  id: number;
  role: number;
}

const accountState = atom<AccountState>({
  key: "accountState",
  default: {
    id: 0,
    role: -1,
  },
});

export { accountState };

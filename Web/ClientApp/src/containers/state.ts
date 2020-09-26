import { atom } from "recoil";
import { TaskData } from "./Admin/TaskManager";

interface AccountState {
  id: number;
  role: number;
  name: string;
  email: string;
}

const accountState = atom<AccountState>({
  key: "accountState",
  default: {
    id: 0,
    role: -1,
    name: "",
    email: "",
  },
});

const taskState = atom<TaskData[]>({
  key: "taskState",
  default: [],
});

export { accountState, taskState };
export type { AccountState };

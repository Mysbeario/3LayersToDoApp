import { atom, selector } from "recoil";
import { TaskData } from "./Admin/TaskManager";

type TaskFilter =
  | "all"
  | "today"
  | "doing"
  | "done"
  | "overdue"
  | "will be expired";

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

const taskFilterState = atom<TaskFilter>({
  key: "taskFilterState",
  default: "all",
});

const isOnlyMineState = atom<number>({
  key: "taskBelongState",
  default: 0,
});

const filterTaskState = selector<TaskData[]>({
  key: "filterTaskState",
  get: ({ get }) => {
    const filter = get(taskFilterState);
    const isOnlyMine = get(isOnlyMineState);
    const accountId = get(accountState).id;
    let state = get(taskState);

    if (isOnlyMine)
      state = state.filter(
        (t) =>
          t.owner.id === accountId ||
          !!t.partners.find((p) => p.id === accountId)
      );

    switch (filter) {
      case "doing":
        return state.filter((t) => t.status === 0);
      case "done":
        return state.filter((t) => t.status === 1);
      case "overdue":
        return state.filter((t) => t.status === 2);
      case "today":
        return state.filter((t) => {
          const today = new Date();
          return new Date(t.startDate) <= today && today <= new Date(t.endDate);
        });
      case "will be expired":
        return state.filter((t) => {
          const today = new Date();
          const remains = Math.floor(
            (new Date(t.endDate).getTime() - today.getTime()) /
              (1000 * 60 * 60 * 24)
          );
          return t.status === 0 && remains <= 3 && remains >= 0;
        });
      default:
        return state;
    }
  },
});

export {
  accountState,
  taskState,
  taskFilterState,
  filterTaskState,
  isOnlyMineState,
};
export type { AccountState, TaskFilter };

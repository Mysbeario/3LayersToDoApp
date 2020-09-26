import { AccountState } from "../containers/state";
import getCookie from "./getCookie";

const getAccountInfo = (): AccountState => {
  return {
    id: parseInt(getCookie("cre.id")),
    role: parseInt(getCookie("cre.role")),
    name: getCookie("cre.name"),
    email: getCookie("cre.email"),
  };
};

export default getAccountInfo;

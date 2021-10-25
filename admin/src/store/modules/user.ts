import { reactive } from "vue";
import { randomStr } from "@/utils";
import { Roles } from "@/enums";

function userStore() {
  const state = reactive({
    uid: "",
    nickname: "name",
    avatar: "",
    roles: [Roles.Admin],
  });

  const randomName = () => {
    state.nickname = randomStr();
  };

  // 检查用户权限
  const haveRoles = (roles: string[] | undefined) => {
    if (roles === undefined || roles.length === 0) return true;
    return state.roles.some((r) => roles.includes(r));
  };

  return { state, randomName, haveRoles };
}

export default userStore();

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
  const checkRoles = (roles: string[] = []) => {
    return state.roles.some((r) => roles.includes(r));
  };

  return { state, randomName, checkRoles };
}

export default userStore();

import { reactive } from "vue";
import { randomStr } from "@/utils";

function userStore() {
  const state = reactive({
    uid: "",
    nickname: "name",
    avatar: "",
  });

  const randomName = () => {
    state.nickname = randomStr();
  };

  return { state, randomName };
}

export default userStore();

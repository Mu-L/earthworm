import type { MaybeRefOrGetter } from "vue";

import { type UserInfoResponse } from "@logto/vue";
import { defineStore } from "pinia";
import { computed, ref, toValue } from "vue";

import { updateUserinfo } from "~/api/user";

export const useUserStore = defineStore("user", () => {
  const userInfo = ref<UserInfoResponse>();

  function initUser(userInfoResponse: UserInfoResponse) {
    userInfo.value = userInfoResponse;
  }

  function isSelf(userId: MaybeRefOrGetter<string>) {
    return computed(() => {
      return userInfo.value?.sub === toValue(userId);
    });
  }

  async function updateUserInfo(userInfo: Partial<UserInfoResponse>) {
    const res = await updateUserinfo(userInfo);
    initUser(res!.data as UserInfoResponse);
    return res;
  }

  function isNewUser() {
    return !userInfo.value?.username || !userInfo.value?.picture;
  }

  return {
    isNewUser,
    initUser,
    userInfo,
    updateUserInfo,
    isSelf,
  };
});

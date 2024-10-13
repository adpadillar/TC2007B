import * as SecureStore from "expo-secure-store";

const key = "session_token";

const opts: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
};

export const getToken = () => SecureStore.getItem(key, opts);
export const deleteToken = () => SecureStore.deleteItemAsync(key, opts);
export const setToken = (v: string) => SecureStore.setItem(key, v, opts);

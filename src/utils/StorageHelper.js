import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItemFromLS = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

export const setItemToLS = async ({ key, value }) => {
  try {
    const stringifiedValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringifiedValue);
  } catch (e) {
    console.error(e);
  }
};

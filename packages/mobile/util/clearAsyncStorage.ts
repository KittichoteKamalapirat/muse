import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log("error clearnign async storage");
  }

  console.log("Storage cleared");
};

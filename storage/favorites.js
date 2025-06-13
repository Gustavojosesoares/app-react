import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@favorites_players';

export const saveFavorites = async (favorites) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error("Erro ao salvar favoritos", e);
  }
};

export const loadFavorites = async () => {
  try {
    const result = await AsyncStorage.getItem(STORAGE_KEY);
    return result ? JSON.parse(result) : [];
  } catch (e) {
    console.error("Erro ao carregar favoritos", e);
    return [];
  }
};

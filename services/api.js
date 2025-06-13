export const getPlayerByName = async (playerName) => {
  try {
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(playerName)}`;
    console.log('📡 Buscando jogador na URL:', url);
    
    const response = await fetch(url);
    const json = await response.json();

    if (!json || !json.player) {
      console.warn('⚠️ Nenhum jogador encontrado ou resposta inválida.');
      return [];
    }

    return json.player;
  } catch (error) {
    console.error('❌ Erro ao buscar jogador:', error.message);
    return [];
  }
};

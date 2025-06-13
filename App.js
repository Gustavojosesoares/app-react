// App.js

import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, FlatList, ActivityIndicator,
  SafeAreaView, TextInput, Button
} from 'react-native';

import PlayerCard from './components/PlayerCard';
import { getPlayerByName } from './services/api'; // <-- agora busca pelo nome
import { loadFavorites, saveFavorites } from './storage/favorites';

export default function App() {
  const [search, setSearch] = useState('');
  const [players, setPlayers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadFavoritePlayers();
  }, []);

  const loadFavoritePlayers = async () => {
    const favs = await loadFavorites();
    setFavorites(favs);
  };

  const toggleFavorite = async (player) => {
    let updatedFavorites;
    if (favorites.some(p => p.idPlayer === player.idPlayer)) {
      updatedFavorites = favorites.filter(p => p.idPlayer !== player.idPlayer);
    } else {
      updatedFavorites = [...favorites, player];
    }
    setFavorites(updatedFavorites);
    await saveFavorites(updatedFavorites);
  };

  const handleSearch = async () => {
    const trimmed = search.trim();
    if (!trimmed) return;

    setLoading(true);
    const data = await getPlayerByName(trimmed);
    setPlayers(data);
    setIsSearching(true);
    setLoading(false);
  };

  const handleBackToHome = () => {
    setSearch('');
    setPlayers([]);
    setIsSearching(false);
  };

  const renderList = () => {
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Buscando jogadores...</Text>
        </View>
      );
    }

    if (isSearching) {
      return (
        <>
          <Text style={styles.subtitle}>Resultados para: {search}</Text>
          {players.length > 0 ? (
            <FlatList
              data={players}
              keyExtractor={(item) => item.idPlayer}
              renderItem={({ item }) => (
                <PlayerCard
                  player={item}
                  onFavorite={toggleFavorite}
                  isFavorite={favorites.some(p => p.idPlayer === item.idPlayer)}
                />
              )}
            />
          ) : (
            <Text>Nenhum jogador encontrado.</Text>
          )}
        </>
      );
    }

    return (
      <>
        <Text style={styles.subtitle}>⭐ Jogadores Favoritos</Text>
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.idPlayer}
            renderItem={({ item }) => (
              <PlayerCard
                player={item}
                onFavorite={toggleFavorite}
                isFavorite={true}
              />
            )}
          />
        ) : (
          <Text>Nenhum jogador favorito ainda.</Text>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Futebol App</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do jogador"
          value={search}
          onChangeText={setSearch}
          autoCapitalize="words"
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>

      {isSearching && (
        <View style={styles.backButton}>
          <Button title="← Voltar" onPress={handleBackToHome} color="#888" />
        </View>
      )}

      {renderList()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});

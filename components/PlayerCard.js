import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

export default function PlayerCard({ player, onFavorite, isFavorite }) {
  const imageUrl = player.strCutout || player.strThumb || 'https://via.placeholder.com/100x100.png?text=Jogador';

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{player.strPlayer}</Text>
        <Text style={styles.position}>{player.strPosition}</Text>
        <Button
          title={isFavorite ? 'Remover dos Favoritos' : 'Favoritar'}
          onPress={() => onFavorite(player)}
          color={isFavorite ? 'red' : 'blue'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    margin: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 15,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
});

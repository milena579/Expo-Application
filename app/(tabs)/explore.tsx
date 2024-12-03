import { Image, StyleSheet, Text, View, FlatList, TextInput, Button, ActivityIndicator } from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from "axios";

interface Character {
  id: string;
  name: string;
  image: string;
}

export default function Explore() {
  const [character, setCharacter] = useState<Character[]>([]);

  const fetchCharacters = async () => {
    try {
      const response =  await axios.get(`https://hp-api.onrender.com/api/characters`);
      setCharacter(response.data.results);

    } catch (error) {
      console.error("Erro ao buscar personagens", error)
      
    } 
  }

  useEffect(() => {
    fetchCharacters();
  }, [])
  
  const renderCharacter = ( {item} : {item:Character} ) => (
    <View style={styles.card}>
      <Image source={{uri : item.image}} style={styles.image}/>
      <View style={styles.info}>
        <Text style={styles.nome}>{item.name}</Text>
      </View>
    </View>
  )

  return (
   <>
    <View style={{ flex: 1 }}>
      <FlatList data={character} keyExtractor={(item) => item.id.toString()} renderItem={renderCharacter} contentContainerStyle={styles.list}/>
    </View>
   </>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection : "row",
    backgroundColor:"#f9f9f9",
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2, //sombra pra android
    shadowColor: "#000000", //abaixo set de sombra para IOS
    shadowOpacity: 0.1,
    shadowOffset: {width: 0,  height:2},
    shadowRadius: 8
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "center"
  },
  image: {
    width: 100,
    height: 100
  },
  nome :{
    fontSize: 16,
    fontWeight :"bold"
  },
  status :{
    fontSize: 14,
    color: "#00000"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  }, 
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding:16,
    backgroundColor: "#f0f0f0"
  },
  input: {
    flex: 1,
    height: 40,
    borderColor:"#cccccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8
  },
  list: {
    padding: 16
  }
});

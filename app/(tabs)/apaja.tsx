import { View, Text, FlatList, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import tw from "twrnc";

export default function apaaja() {
  const [results, setArticles] = useState([]);

  const getNews = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/');
      setArticles(response.data.results);
    }catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const handlePress = async (url) => {
    await Linking.openURL(url);
  };
  
  return (
    <View style={tw`bg-green-50 flex-1`}>
      <Text style={tw`text-3xl font-bold p-6 text-green-800`}>Halaman Berita</Text>
      <FlatList
      data={results}
      keyExtractor={(item) => item.url}
      renderItem={({ item }) => (
        <View style={tw`bg-green-100 rounded-2xl mx-4 my-3 shadow-lg overflow-hidden border border-green-200`}>
          <Image source={{ uri: item.picture.large }} style={tw`w-full h-56 object-cover`} />
          <View style={tw`p-6`}>
            <Text style={tw`text-xl font-bold mb-1 text-green-800`}>Nama:{item.name.first}</Text>
            <Text style={tw`text-xl mb-1 text-green-800`}>Penulis: {item.email}</Text>
            <Text style={tw`text-green-600 mb-4 leading-relaxed`}>{item.description}</Text>
          </View>
        </View>
      )}
      />
    </View>
  )
}
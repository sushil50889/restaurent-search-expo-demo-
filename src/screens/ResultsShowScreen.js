import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp';

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam('id');

  const getResult = async id => {
    const response = await yelp.get(`/${id}`);
    console.log('=======================================================================');
    console.log(response.data);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <>
      <Text style={styles.title}>{result.name}</Text>
      <Text style={styles.address}>{result.location.display_address}</Text>
      <Text style={styles.phone}>Phone : {result.display_phone}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    alignSelf: 'stretch',
    marginBottom: 15,
    borderRadius: 10
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 0,
    paddingBottom: 0,
  },
  address: {    
    textAlign: 'center',
    marginTop: 0
  },
  phone: {    
    textAlign: 'center',
    marginBottom: 15
  },
});

export default ResultsShowScreen;

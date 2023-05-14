import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';


const Result : React.FC<any>  = ({ route  }) => {
    const { data , image } = route.params;
    // console.log("data",data);
    
  return (
    <View style={styles.container}>
        <Image style={styles.imageStyle} source={{ uri: image }} />
    <Text style={styles.title}>{data.class}</Text>
    <View style={styles.detailsContainer}>
      <Text style={styles.subtitle}>Control Measures:</Text>
      {data.details.map((detail: any, index: number) => (
        <Text key={index} style={styles.detail}>{`${index + 1}. ${detail}`}</Text>
      ))}
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailsContainer: {
    marginTop: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
  },
  imageStyle: {
    height: 150,
    width: 150,
    marginTop: 20,
    borderRadius: 5,
  },
});

export default Result;

// import React, { useEffect } from 'react';
// import { View, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const StartScreen = () => {
//     const navigation = useNavigation();
  
//     useEffect(() => {
//       const timer = setTimeout(() => {
//         navigation.navigate('Home'); // Replace 'SecondScreen' with your desired screen name
//       }, 1000); // 1000 milliseconds = 1 second
  
//       return () => clearTimeout(timer); // Clear the timeout when the component unmounts
//     }, [navigation]);
  
//     return (
//       <View>
//         <Text>This is the start screen</Text>
//       </View>
//     );
//   };
  
//   export default StartScreen;

import React from 'react'
import { View, Text } from 'react-native/types'

function StartScreen() {
  return (
    <View>
         <Text>This is the start screen</Text>
       </View>
  )
}

export default StartScreen
  
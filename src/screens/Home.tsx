import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
   FlatList,
   Button
} from 'react-native';
import Voice, {
  SpeechStartEvent,
  SpeechEndEvent,
  SpeechResultsEvent,
} from '@react-native-community/voice';
import { generateResponse, handle_answer } from '../services/api/axios';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  SoilAnalyzes: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {

  const [result, setResult] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingGetResponse, setGetResponse] = useState<boolean>(false);
  const [responseList, setResponseList] = useState<any>([]);

  useEffect(() => {
   try {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice?.removeAllListeners);
    };
   } catch (error) {
    console.log('====================================');
    console.log('error raised', error);
    console.log('====================================');
   }
  }, []);

  const onSpeechStartHandler = (e: SpeechStartEvent) => {
    console.log('start handler==>>>', e);
  };

  const onSpeechEndHandler = (e: SpeechEndEvent) => {
    setLoading(false);
    console.log('stop handler', e);
  };

  const onSpeechResultsHandler = (e: SpeechResultsEvent) => {
    if (e.value && e.value.length > 0) {
      let text = e.value[0];
      setResult(text);
      console.log('speech result handler', e);

    }
  };

  const startRecording = async () => {
    setResult('');
    setLoading(true);
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error raised', error);
    }
  };

  const stopRecording = async () => {
    setLoading(false);
    setResponseList('')
    try {
      await Voice.stop();
    } catch (error) {
      console.log('error raised', error);
    }
  };

  const clickSendPromptText = async () => {
    setGetResponse(true);
    // const response = await generateResponse(result);
    const response = await handle_answer(result)
    console.log('====================================', response);
    
    setResponseList([response, ...responseList]);
    setGetResponse(false);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Agri Voice Assistant</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            placeholder="Ask agriculture recommendation"
            placeholderTextColor="gray"
            style={{  color: 'black', flex: 1 }}
            onChangeText={(text) => setResult(text)}
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                source={{
                  uri:
                    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
                }}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
            marginTop: 24,
            backgroundColor: '#eb4c42',
            padding: 8,
            borderRadius: 4,
            width: 100,
          }}
          onPress={stopRecording}>
          <Text style={{ color: 'white', fontWeight: 'bold', alignSelf:'center', textTransform: 'uppercase' }}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity
       
          style={{
            alignSelf: 'flex-end',
            marginTop: 10,
            backgroundColor: 'green',
            padding: 8,
            borderRadius: 4,
            width: 100,
          }}
          onPress={clickSendPromptText}>
          <Text style={{ color: 'white', fontWeight: 'bold', alignSelf:'center', textTransform: 'uppercase' }}>Send  {isLoadingGetResponse ? (
            <ActivityIndicator size="small" color="white" style={{marginLeft: 40, width: 10, height: 10}}/>
          ) : ('') }</Text>
        </TouchableOpacity>
        <FlatList 
          data={responseList}
          inverted={false}
          renderItem={({item}) => (
            <View style={styles.textResponceStyle}>
          <Text style={styles.FlatList}>{item}</Text>
        </View>
          )}
        />
        <View style={styles.bodyWrapper}>
          <Button title="Predict Diseases" onPress={() =>
        navigation.navigate('Camera')
      } />
        </View>
        <View style={styles.bodyWrapper}>
          <Button title="Predict Soild" onPress={() =>
        navigation.navigate('SoilAnalyzes')
      } />
        </View>
        
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    fontSize: 26,
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 48,
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
  },
  textResponceStyle: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,

  },
  FlatList: {
      fontSize: 16,
      color: 'black', // Change this to your desired text color
      padding: 10,
    },
    bodyWrapper: {
      justifyContent : 'flex-end',
      alignItems: 'flex-start',
    },
  
});

export default Home;

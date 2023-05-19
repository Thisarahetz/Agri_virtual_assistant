import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import { launchCamera, launchImageLibrary, CameraOptions, ImagePickerResponse } from 'react-native-image-picker';
import { predictSoild } from '../services/api/axios';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Result : { data: any , image: any };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const SoilAnalyze: React.FC<Props> = ({navigation}) => {
  const [cameraPhoto, setCameraPhoto] = useState<string | undefined>();
  const [galleryPhoto, setGalleryPhoto] = useState<string | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const options: CameraOptions = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    
      const result: ImagePickerResponse = await launchCamera(options);
      if (result.assets && result.assets.length > 0) {
        setCameraPhoto(result.assets[0].uri);
      }
    
  };

  const openGallery = async () => {
    const result: ImagePickerResponse = await launchImageLibrary(options);
    if (result.assets && result.assets.length > 0) {
      setGalleryPhoto(result.assets[0].uri);
    }
  };

  async function onHandleClick() {
    setLoading(true)
    if(cameraPhoto === undefined && galleryPhoto === undefined) {
      alert("Please select an image")
      return
    }
    
    const formData = new FormData();
    formData.append('file', {
      uri: cameraPhoto !== undefined ? cameraPhoto : galleryPhoto,
      type: 'image/jpeg', // Adjust the file type according to your needs
      name: 'image.jpg',
    });
    const response : any= await predictSoild (formData)
    
    if(response){
      navigation.navigate('Result', {data : response, image: cameraPhoto !== undefined ? cameraPhoto : galleryPhoto})
    }
    setLoading(false)
    console.log(response);
    
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openCamera} style={styles.button}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      <Image style={styles.imageStyle} source={{ uri: cameraPhoto }} />

      <TouchableOpacity onPress={openGallery} style={styles.button}>
        <Text style={styles.buttonText}>Open Gallery</Text>
      </TouchableOpacity>
      <Image style={styles.imageStyle} source={{ uri: galleryPhoto }} />
      {isLoading ? (
            <ActivityIndicator size="large" color="red" />
          ) : (
      <TouchableOpacity onPress={onHandleClick} style={styles.button}>
        <Text style={styles.buttonText}>Predit</Text>
      </TouchableOpacity>
          )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#233f49',
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 50,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#ebebeb',
    fontWeight: 'bold',
  },
  imageStyle: {
    height: 150,
    width: 150,
    marginTop: 20,
    borderRadius: 5,
  },
});

export default SoilAnalyze;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}


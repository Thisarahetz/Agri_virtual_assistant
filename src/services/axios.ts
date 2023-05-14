import axios from 'axios';
import {API_KEY, API_URL, API_PREDICT_DISEASES_URL} from '@env';

/**
 *
 * @param prompt genarate response from gpt3
 * @returns
 */
export async function generateResponse(prompt: string) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  };

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: `"${prompt}"`}],
    max_tokens: 50,
  };

  try {
    const response = await axios.post(API_URL, data, {headers});
    const {choices} = response.data;
    const {message} = choices[0];
    return message.content;
  } catch (error) {
    console.log('error', error);
  }
}

/**
 * 
 * @param image form-data
 * @returns 
 */
export async function predictDiseases(image: any) {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  try {
     console.log('image', image);
    
    const response = await axios.post(API_PREDICT_DISEASES_URL, image, {headers});
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
}

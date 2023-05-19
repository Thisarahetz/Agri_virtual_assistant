import axios from 'axios';
import {API_KEY, API_URL, API_PREDICT_DISEASES_URL,API_PREDICT_SOIL_URL,API_HANDLE_ANSWER_URL} from '@env';

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

  const defaultPrompt = "as agriculture agent give me under 40 words  answer for this question "

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: `"${defaultPrompt + prompt}"`}],
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
 *  Predict diseases
 * @param image form-data
 * @returns 
 */
export async function predictDiseases(image: any) {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axios.post(API_PREDICT_DISEASES_URL, image, {headers});
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
}

/**
 * SoilAnalyze
 * @param image form-data
 * @returns 
 */
export async function predictSoild(image: any) {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axios.post(API_PREDICT_SOIL_URL, image, {headers});
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
}



/**
 * handle_answer
 * @param question form-data
 * @returns 
 */
export async function handle_answer(question : any) {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axios.post(API_HANDLE_ANSWER_URL, {"question": question}, {headers});
    
    return response.data.answer;
  } catch (error) {
    console.log('error', error);
  }
}

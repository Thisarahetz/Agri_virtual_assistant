import axios from 'axios';
import { API_KEY, API_URL } from "@env"

async function generateResponse(prompt : string) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  };

  const data = {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": `"${prompt}"`}],
    "max_tokens": 50
  };

  try {
  const response = await axios.post(API_URL , data, { headers });
  const { choices } = response.data;
  const { message } = choices[0];
  return message.content;
  } catch (error) {
    console.log('error', error);
  }
  
}

export default generateResponse ;
 
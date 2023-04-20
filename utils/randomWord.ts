type Callback = (result: string) => void;
const randomWord = async (callback: Callback) => {
  let result = 'Google';
  try {
    const response = await fetch('https://random-word-api.vercel.app/api?words=1');
    result = await response.json();
  } catch (error) {
    result = 'Google';
  }
  return callback(result);
};

export default randomWord;

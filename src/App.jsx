import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getMemes } from './service/api'


function App() {
  const [meme, setMeme] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMemes();
        setMeme(data.data.memes[Math.floor(Math.random() * data.data.memes.length)]); // Set the meme state with the fetched data
      } catch (error) {
        // Handle the error appropriately (e.g., show an error message)
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Use this useEffect to log the updated meme state
    if (meme) {
      console.log(meme);
    }
  }, [meme]);




  
 
  return (
    <>
      <div>
        {meme && (
          <div>
            <img src={meme.url}></img>
          </div>
        )}
      </div>
    </>
  )
}

export default App

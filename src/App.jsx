import { useEffect, useState } from 'react'
import './App.css'

import ScreenPokemones from './components/ScreenPokemones';

function App() {
  const[pokemones, setPokemones] = useState('')
  const pokeUrl = 'https://pokeapi.co/api/v2/pokemon';
  
  const fetchData = async(url) =>{
    const response  = await fetch(url);
    const data = await response.json();
    return data;
  };

const pokemonData = async (pokeUrl) =>{
  const response = await fetchData(pokeUrl);

  const dataPromises = response.results.map((poke) => ( 
    fetchData(pokeUrl + '/' + poke.name)
  ));
  const pokemonImages = await Promise.all(dataPromises);
  setPokemones(pokemonImages);
  console.log(pokemonImages);
};


  useEffect(()=>{
    pokemonData(pokeUrl);

  }, []);


  const [count, setCount] = useState(0)

  return (
    <>
      
      <div className='main-container'>

        <div className='layout-game'>
          <div className='screenlayout-container'>
          <div className='screen-border'>
            <div className='screen-container'>
             <div className='screen'> 
             {
              pokemones && <ScreenPokemones pokemones={pokemones} />
             }
             
             </div>
            </div>
          </div>
          </div>

          <div className='buttons-container'>

            <div className='container-pad'></div>

            
            <div className='container-select'>

            <div className='container-select-btn'>
            <button className='btn-select'></button>
            <div>Select</div>
            </div>

            <div className='container-start'>
            <button className='btn-start'></button>
            <div>Start</div>
            </div>
            </div>

            <div className='container-action'>

            <div className='buttonB-container'>
            <div className='buttonB'></div>
            </div>

            <div className='buttonA-container'>
            <div className='buttonA'></div>
            </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App

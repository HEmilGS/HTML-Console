import { useEffect, useState } from 'react'
import './App.css'

import ScreenPokemones from './components/ScreenPokemones';
import BattleScreen from './components/BattleScreen.jsx';

function App() {
  const[pokemones, setPokemones] = useState('')
  const [position, setPosition] = useState(0);

  const [myHealth, setHealth] = useState ([100]); 
  const [enemyHealth, setEnemyHealth] = useState ([100]); 

  const [] = useState(false);

  const [myPokeSelection, setMyPockeSelection] = useState ([]); 
  const [computerRandomSelection, setComputerRandomSelection] = useState ([]); 
  const [startGame, setStartGame] = useState(false);

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
  console.log(pokemonImages);
  setPokemones(pokemonImages);

  const addAttack = pokemonImages.map((pokemon) => {
    const attackValue = pokemon.moves.map((move) => ({
      ...move,
      attack: Math.floor(Math.random() * 50),
    }));

    return { ...pokemon, moves: attackValue };
  });

  setPokemones(addAttack);
  
};

const handleSelection = (foward) => {
  //console.log(foward);
  if (!foward && position <= 0) return;
  if (foward && position >= 20) return;
  if (!foward) {
    setPosition(position - 1);
  } else {
    setPosition(position + 1);
  }

  //console.log(position);
};

const filterSelection = () => {
  const mySelection = pokemones.filter((value, idx) => position === idx);
  setMyPockeSelection(mySelection);
  console.log(mySelection);
  console.log("me", mySelection)

  computerSelection();
};

const computerSelection = () => {
  const computerPos = Math.floor(Math.random() * 20);
  const computerSelection = pokemones.filter((value, idx) => computerPos === idx);

  setComputerRandomSelection(computerSelection);
  console.log("computer", computerSelection);
};

const handleStart = () => {
  setStartGame (true);
};

const makeAttack = () =>{

  const myAttack = Math.floor(Math.random()*100)
  var tempIsHealth = enemyHealth;
  tempIsHealth -= myAttack;

  if(tempIsHealth < 0){
    setEnemyHealth(0);
    return;
  }else{
    setEnemyHealth(enemyHealth - myAttack);
  }

  const itsAttack = Math.floor(Math.random()*50)
  var tempMyhealt = myHealth;
  tempMyhealt -= itsAttack;

  if(tempMyhealt < 0){
    setHealth(0);
    return;
  }else{
    setHealth(enemyHealth - itsAttack);
  }

}

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
                startGame ? (
                  (myPokeSelection && computerRandomSelection) && <BattleScreen 
                    myPokeSelection = {myPokeSelection}
                    computerRandomSelection = {computerRandomSelection}
                    enemyHealth = {enemyHealth}
                    myHealth = {myHealth}
                  />
                ) : (
                  pokemones && (<ScreenPokemones pokemones = {pokemones} position ={position}/>))
              }
             
             </div>
            </div>
          </div>
          </div>

          <div className='buttons-container'>

            <div className='container-pad'>
            <button className="btn-right" onClick={() => handleSelection(false)}></button>
              <div className="container-up-down">
                <button className="btn-up"></button>
                <button className="btn-down"></button>
              </div>
              <button className="btn-left" onClick={() => handleSelection(true)}></button>
            </div>

            
            <div className='container-select' >

            <div className='container-select-btn'>
            <button className='btn-select' onClick={() => filterSelection()}></button>
            <div>Select</div>
            </div>

            <div className='container-start'>
            <button className='btn-start' onClick ={() => handleStart()}></button>
            <div>Start</div>
            </div>
            </div>

            <div className='container-action'>

            <div className='buttonB-container'>
            <button className='buttonB'></button>
            </div>

            <div className='buttonA-container'>
            <button className='buttonA' onClick={makeAttack}></button>
            </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App

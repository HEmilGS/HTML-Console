
import './ScreenPokemones.css';
const ScreenPokemones = ({pokemones}) => {

    return(
        <div className="game-container"> 



            {
                pokemones?.map((pokemon, idx) => (
                    <div key={pokemon.id} 
                    className="pokemon-item">
                    <img src={pokemon.sprites.front_default}  className='pokemon-imagen' alt="pokemon image"/>
                    {pokemon.name}
                    
                    
                    </div>
                )) 
            }
        </div>
    );
};

export default ScreenPokemones
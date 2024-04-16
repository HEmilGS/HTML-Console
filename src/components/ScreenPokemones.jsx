
import './ScreenPokemones.css';
const ScreenPokemones = ({pokemones, position}) => {

    return(
        <div className="game-container"> 
            {
                pokemones?.map((pokemon, idx) => (
                    <div key={pokemon.id} 
                    className="pokemon-item" 
                    style={{ backgroundColor: idx === position ? 'darkgreen' : 'transparent' }}
                    >
                    <img src={pokemon.sprites.front_default}  className='pokemon-imagen' />
                    {pokemon.name}
                    </div>
                )) 
            }
        </div>
    );
};

export default ScreenPokemones;
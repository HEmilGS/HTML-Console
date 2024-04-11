

const ScreenPokemones = ({pokemones}) => {
    console.log(pokemones);

    return(
        
        <div> 

            {

                pokemones.map((pokemon) => (
                    <div key={pokemon.id}>{pokemon.name}
                    <img src={pokemon.sprites.front_default} alt="pokemon image" />
                    </div>
                  
                )) 
            }
        </div>
    );
};

export default ScreenPokemones
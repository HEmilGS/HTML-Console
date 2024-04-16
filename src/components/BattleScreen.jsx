import React from 'react';
import  './battleScreen.css';

const BattleScreen = ({myPokeSelection, computerRandomSelection, enemyHealth, myHealth}) => {
    console.log ({myPokeSelection});
    console.log ({computerRandomSelection});


    return (
    <div className="battle-container">
        <div className="enemy-container">
            <h1>{enemyHealth}</h1>
            <img src = {computerRandomSelection[0].sprites.front_default} alt="enemySelection" />   
        </div>
        <div className="my-container">
        <h1>{myHealth}</h1>
            <img src = {myPokeSelection[0].sprites.front_default} alt="mySelection" />
        </div>
    </div>
    );
};

export default BattleScreen
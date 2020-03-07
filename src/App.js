import React, { Component } from 'react';
import PlayArea from './components/play-area';
import Stats from './components/stats';
// import Deck from './content/deck';
import './app.css';

class App extends Component {
    state = {
        stats: {
            player: {
                score: 0,
                record: [0, 0],
                streak: null
            },
            computer: {
                score: 0,
                record: [0, 0],
                streak: null
            },
            turn: 'Computer'
        },
        deal: {
            deck: null,
            playerCards: [],
            computerCards: []
        }
    }
    render() {
        return(
            <div className='App'>
            <div className='Table'>
                <PlayArea playerType='Computer' />
                <Stats stats={this.state.stats} />
                <PlayArea playerType='Player' />
            </div>
            </div>
        );
    }
}

export default App;
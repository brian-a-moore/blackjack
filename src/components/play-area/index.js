import React, { Component } from 'react';
import Hand from '../hand';
import './style.css';

const sample = [
    { id: '2C', set: 2, suit: 'Clubs', value: 2, },
    { id: '2H', set: 2, suit: 'Hearts', value: 2 },
    { id: '4C', set: 4, suit: 'Clubs', value: 4 },
    { id: '7H', set: 7, suit: 'Hearts', value: 7 },
    { id: '10D', set: 10, suit: 'Diamonds', value: 10 }
];

class PlayArea extends Component {
    tempHandler = () => {
        if(this.props.playerType === 'Player') {
            return <Hand playerType={this.props.playerType} cards={sample} />
        } else {
            return <Hand playerType={this.props.playerType} message='Hey, this is a message!' />
        }
    }
    render() {
        return(
            <div className={`PlayArea ${this.props.playerType}`}>
                {this.tempHandler()}
            </div>
        )
    }
}

export default PlayArea;
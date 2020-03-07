import React, { Component } from 'react';
import Card from '../card';
import './style.css';

class Hand extends Component {
    showOptions = () => {
        if(this.props.playerType === 'Player') {
            return(
                <div>
                    <button disabled={this.props.turn === 'Computer' ? true : false } className='stay'> Stay </button>
                    <button disabled={this.props.turn === 'Computer' ? true : false } className='hit'> Hit </button>
                </div>
            );
        } else {
            return <span className='computer-message'> {this.props.message} </span> 
        }
    }
    showCards = () => {
        let cards = this.props.cards;
        
        if(cards.length > 0) {
            return cards.map((card, i) => (
                <div className='card-holder' key={card.id} style={{ zIndex: i + 1 }}>
                    <Card playerType={this.props.playerType} card={card} key={card.id} index={i} />
                </div>
            ));
        } else {
            return <span className='placeholder'> No Cards </span>;
        }
    }
    render() {
        return(
            <div className={`Hand ${this.props.playerType}`}>
                <div className='stack'>
                    {this.showCards()}
                </div>
                <div className='actions'>
                    {this.showOptions()}
                </div>
            </div>
        );
    }
}

export default Hand;
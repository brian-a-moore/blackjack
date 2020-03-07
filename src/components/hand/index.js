import React, { Component } from 'react';
import Card from '../card';
import './style.css';

class Hand extends Component {
    componentDidMount() {
        console.log({ props: this.props });
    }
    showOptions = () => {
        if(this.props.playerType === 'Player') {
            return(
                <div>
                    <button className='stay'> Stay </button>
                    <button className='hit'> Hit </button>
                </div>
            );
        } else {
            return <span className='computer-message'> {this.props.message} </span> 
        }
    }
    showCards = () => {
        let cards = this.props.cards;
        if(cards) {
            if(cards.length > 0) {
                return cards.map((card, i) => (
                    <div className='card-holder' style={{ zIndex: i + 1 }}>
                        <Card playerType={this.props.playerType} card={card} key={card.id} index={i} />
                    </div>
                ));
            }
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
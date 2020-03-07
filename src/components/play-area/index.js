import React, { Component } from 'react';
import Hand from '../hand';
import './style.css';

class PlayArea extends Component {
    render() {
        return(
            <div className={`PlayArea ${this.props.playerType}`}>
                <Hand playerType={this.props.playerType} cards={this.props.cards} message={this.props.message} turn={this.props.turn} />
            </div>
        )
    }
}

export default PlayArea;
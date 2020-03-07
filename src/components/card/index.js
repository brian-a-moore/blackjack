import React, { Component } from 'react';
import './style.css';

class Card extends Component {
    state = {
        isVisible: null
    }
    componentDidMount() {
        this.setState({
            isVisible: this.props.index ? true : false
        });
    }
    onMouseDown = () => {
        if(this.props.playerType === 'Player') this.setState({ isVisible: true });
    }
    onMouseUp = () => {
        if(this.props.playerType === 'Player') this.setState({ isVisible: this.props.index });
    }
    render() {
        if(this.state.isVisible === null) return null;
        let card = this.props.card;
        return(
            <button className='Card' onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
                <img src={this.state.isVisible ? require(`../../static/deck/${card.id}.png`) : require('../../static/deck/_back.png')} alt={`${card.set} ${card.suit}`} />
            </button>
        );
    }
}

export default Card;
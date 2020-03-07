import React, { Component } from 'react';
import Hand from '../hand';
import './style.css';

class PlayArea extends Component {
    render() {
        return(
            <div className={`PlayArea ${this.props.playerType}`}>
                <Hand {...this.props} />
            </div>
        )
    }
}

export default PlayArea;
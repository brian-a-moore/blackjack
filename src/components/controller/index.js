import React, { Component } from 'react';
import './style.css';

class Controller extends Component {
    render() {
        return(
            <div className='Controller'>
                <button onClick={this.props.startDeal}> Start Game </button>
            </div>
        )
    }
}

export default Controller;
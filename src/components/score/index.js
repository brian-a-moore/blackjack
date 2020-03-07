import React, { Component } from 'react';
import './style.css';

class Score extends Component {
    render() {
        let stats = this.props.stats;
        return(
            <div className={`Score ${this.props.playerType}`}>
                <label> Overall Score </label>
                <span className='score'> {stats.score} </span>
                <label> {this.props.playerType} Record </label>
                <span className='record'> {stats.record[0]} - {stats.record[1]} </span>
                <label> Current Streak </label>
                <span className='streak'> {stats.streak ? `${stats.streak} Wins(s)` : 'None'} </span>
            </div>
        )
    }
}

export default Score;
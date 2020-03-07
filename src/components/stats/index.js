import React, { Component } from 'react';
import Controller from '../controller';
import Score from '../score';
import './style.css';

class Stats extends Component {
    render() {
        return(
            <div className='Stats'>
                <div className='col-3 padded stat-col'>
                    <Score playerType='Player' stats={this.props.stats.player} />
                </div>
                <div className='col-6 padded stat-col'>
                    <Controller {...this.props} />    
                </div>
                <div className='col-3 padded stat-col'>
                    <Score playerType='Computer' stats={this.props.stats.computer} />
                </div>

            </div>
        )
    }
}

export default Stats;
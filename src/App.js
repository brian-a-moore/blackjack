import React, { Component } from 'react';
import PlayArea from './components/play-area';
import Stats from './components/stats';
import { getDeck, getCard } from './content/deck';
import messages from './content/messages';
import './app.css';

class App extends Component {
    state = {
        status: null,
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
            }
        },
        deal: {
            deck: null,
            playerCards: [],
            computerCards: [],
            computerStay: false,
            playerStay: false
        },
        turn: 'Computer',
        message: null
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.status !== this.state.status) {
            this.gameManager(this.state.status);
        }
    }
    // This function acts sort of like an event listener, controlling what step is next in the app
    gameManager = status => {
        switch(status) {
            case 'start-deal': return this.setInitialCards();
            case 'initial-cards-set': return this.stayOrHit();
            default: return null;
        }
    }
    // This function builds the inital deck for each deal
    startDeal = () => {
        let state = {...this.state};

        state.deal.deck = getDeck();
        state.status = 'start-deal';
        state.message = messages.gameStart;

        this.setState(state);
    }
    // This function gives both players their first two cards
    setInitialCards = () => {
        let computerCards = [];
        let playerCards = [];

        for(let i = 0; i < 2; i++) {
            computerCards.push(getCard(this.state.deal.deck));
        }

        let filteredDeck = this.filterDeck(this.state.deal.deck, computerCards);

        for(let i = 0; i < 2; i++) {
            playerCards.push(getCard(filteredDeck));
        }
        
        filteredDeck = this.filterDeck(filteredDeck, playerCards);

        this.setState({...this.state,
            deal: {...this.state.deal,
                playerCards,
                computerCards,
                deck: filteredDeck                
            },
            status: 'initial-cards-set'
        });
    }
    // This starts the stay-or-hit process and branches off based on who's turn it is...
    stayOrHit = () => {
        if(this.state.deal.computerStay && this.state.deal.playerStay) {
            this.computeVictor();
        } else {
            if(this.state.turn === 'Computer') this.computerTurn();
            else alert('Your turn...');
        }
    }
    // This handles the computer's turn...
    computerTurn = () => {
        let decision = this.doComputerLogic();
        let state = {...this.state};

        state.turn = 'Player';

        if(decision) {
            state.message = messages.hit;
            state.status = 'computer-hit';
        } else {
            state.message = messages.stay;
            state.status = 'computer-stay';
        }

        this.setState(state);
    }
    // This is the computer's logic...
    doComputerLogic = () => {
        let myCards = this.state.deal.computerCards;
        let showingOpponentCards = [...this.state.deal.playerCards];
        
        showingOpponentCards.shift();
        let remainingValueTo21 = this.getRemainingValue(myCards);
        let tempDeck = getDeck();
        let filterOutMyCards = this.filterDeck(tempDeck, myCards);
        let filterOutOpponentCards = this.filterDeck(filterOutMyCards, showingOpponentCards);
        let probability = [];

        for(let i = 0; i < filterOutOpponentCards.length; i++) {
            if(filterOutOpponentCards[i].value <= remainingValueTo21) probability.push(true);
            else probability.push(false);
        }

        let randomIndex = Math.floor(Math.random() * probability.length);

        console.log({
            myCards,
            showingOpponentCards,
            remainingValueTo21,
            tempDeck,
            filterOutMyCards,
            filterOutOpponentCards,
            probability,
            randomIndex
        });

        return probability[randomIndex];
    }
    // This determines remaining value to 21...
    getRemainingValue = cards => {
        let value = 0;

        for(let i = 0; i < cards.length; i++) {
            if(cards[i].set === 'Ace') {
                if(value + 11 > 21) value += 1;
                else value += 11;
            } else {
                value += cards[i].value;
            }
        }

        return 21 - value;
    }
    // This removes card(s) from the active deck in the deal
    filterDeck = (deck, cards) => {
        
        return deck.filter(item => {
            return !cards.includes(item);
        });

    }
    // This will determine who won the deal...
    computeVictor = () => {

    }
    render() {
        return(
            <div className='App'>
            <div className='Table'>
                <PlayArea playerType='Computer' cards={this.state.deal.computerCards} message={this.state.message} />
                <Stats stats={this.state.stats} startDeal={this.startDeal} />
                <PlayArea playerType='Player' cards={this.state.deal.playerCards} turn={this.state.turn} />
            </div>
            </div>
        );
    }
}

export default App;
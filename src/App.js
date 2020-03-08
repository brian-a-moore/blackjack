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
        if(prevState.status !== this.state.status) this.gameManager(this.state.status);
    }
    atFiveCards = who => {
    // Determines if a hand has five cards (and not busted)
        let cards;
        if(who === 'computer') cards = [...this.state.deal.computerCards];
        else cards = [...this.state.deal.playerCards];

        if(cards.length >= 5) return true;
        else return false;
    }
    busted = who => {
    // Determine if a hand is over 21
        let value = 0;
        let cards;
        if(who === 'computer') cards = [...this.state.deal.computerCards];
        else cards = [...this.state.deal.playerCards];

        for(let i = 0; i < cards.length; i++) {
            if(cards[i].set === 'Ace') {
                if(value + 11 > 21) value += 1;
                else value += 11;
            } else {
                value += cards[i].value;
            }
        }

        if(value > 21) return true;
        else return false;
    }
    computerTurn = () => {
    // Handler for the computer's turn
        setTimeout(() => {
            let decision = this.doComputerLogic();
            let state = {...this.state};
    
            state.turn = 'Player';
    
            if(decision) {
                state.message = messages.hit;
                state.status = 'computer-hit';
            } else {
                state.message = messages.stay;
                state.status = 'computer-done';
                state.deal.computerStay = true;
            }
    
            this.setState(state);
        }, 1000);
    }
    computeVictor = () => {
    // Determine the winner of a round
    }
    doComputerLogic = () => {
    // The logic for the computer's turn
        let myCards = [...this.state.deal.computerCards];
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

        return probability[randomIndex];
    }
    filterDeck = (deck, cards) => {
    // Removes played cards from deck
        let ids = [];
        for(let i in cards) ids.push(cards[i].id);
        
        return deck.filter(card => !ids.includes(card.id));
    }
    gameManager = status => {
    // Trigger the next action in the application
        switch(status) {
            case 'start-deal': return this.setInitialCards();
            case 'initial-cards-set':
            case 'computer-done':
            case 'player-done': return this.turnPicker();
            case 'computer-hit': return this.hit('computer');
            default: return null;
        }
    }
    getCard = () => {
    // Get a card from the deck
        return [...this.state.deal.deck].pop();
    }
    getRemainingValue = cards => {
    // How many points to 21
        let i, value = 0;

        for(i = 0; i < cards.length; i++) {
            if(cards[i].set === 'Ace') {
                if(value + 11 > 21) value += 1;
                else value += 11;
            } else {
                value += cards[i].value;
            }
        }

        return 21 - value;
    }
    hit = who => {
    // Adds a card to the computer or player's hand
        let state = {...this.state};
        let newCard = this.getCard();

        if(who === 'computer') {
            state.status = 'computer-done';
            state.turn = 'Player';
            state.deal.deck = this.filterDeck([...this.state.deal.deck], [newCard]);
            state.deal.computerCards.push(newCard);
        } else {
            state.status = 'player-done';
            state.turn = 'Computer';
            state.deal.deck = this.filterDeck([...this.state.deal.deck], [newCard]);
            state.deal.playerCards.push(newCard);
            state.message = null;
        }

        this.setState(state);
    }
    setInitialCards = () => {
    // Give the computer and player their first two cards
        let computerCards = [];
        let playerCards = [];
        let state = {...this.state};

        for(let i = 0; i < 2; i++) { computerCards.push(getCard(this.state.deal.deck)); }
        let filteredDeck = this.filterDeck(this.state.deal.deck, computerCards);
        for(let i = 0; i < 2; i++) { playerCards.push(getCard(filteredDeck)); }
        
        filteredDeck = this.filterDeck(filteredDeck, playerCards);

        state.deal.playerCards = playerCards;
        state.deal.computerCards = computerCards;
        state.deal.deck = filteredDeck;
        state.status = 'initial-cards-set';

        this.setState(state);
    }
    startDeal = () => {
    // Get the deck for the current round
        let state = {...this.state};

        state.deal.deck = getDeck();
        state.status = 'start-deal';

        this.setState(state);
    }
    stay = () => {
    // Computer or player has decided to stay
        let state = {...this.state};

        state.deal.playerStay = true;
        state.status = 'player-done';
        state.turn = 'Computer';
        state.message = null;

        this.setState(state);
    }
    turnPicker = () => {
    // Determines who's turn it is and when the round is over
        if(this.state.deal.computerStay && this.state.deal.playerStay) {
            this.computeVictor();
        } else {
            if(this.state.turn === 'Computer' && !this.state.deal.computerStay) this.computerTurn();
            else this.setState({ turn: 'Player', status: 'computer-done' });
        }
    }
    render() {
        return(
            <div className='App'>
                <div className='Table'>
                    <PlayArea playerType='Computer' cards={this.state.deal.computerCards} message={this.state.message} />
                    <Stats stats={this.state.stats} startDeal={this.startDeal} />
                    <PlayArea playerType='Player' cards={this.state.deal.playerCards} turn={this.state.turn} hit={this.hit} stay={this.stay} />
                </div>
            </div>
        );
    }
}

export default App;
// 52-Card Deck suits and sets
const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const sets = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

// Programatically generate a deck of cards
const generateDeck = () => {
    let deck = [];

    for(let i = 0; i < suits.length; i++) {
        for(let x = 0; x < sets.length; x++) {
            let isString = typeof sets[x] === 'string';
            deck.push({
                id: (isString ? sets[x].charAt(0) : sets[x]) + suits[i].charAt(0) ,                
                set: sets[x],
                suit: suits[i],
                value: setValue(sets[x], isString)
            });
        }
    }

    return deck;
};

// Get value of the card
const setValue = (set, isString) => {
    if(!isString) return set;
    else {
        if(set === 'Ace') return [1, 11];
        else return 10;
    }
}

// Shuffle
const shuffleDeck = deck => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
}

// StartUp
export const getDeck = () => {
    const deck = generateDeck();
    return shuffleDeck(deck);
}

// Get Card
export const getCard = deck => {
    let randomIndex = Math.floor(Math.random() * deck.length);
    return deck[randomIndex];
}
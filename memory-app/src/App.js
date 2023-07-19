import {useEffect, useState} from 'react';
import './App.css';
import MemoryCard from "./comonents/MemoryCard";

const cardList = [
    {"path": "/img/1.jpeg", match: false},
    {"path": "/img/2.jpeg", match: false},
    {"path": "/img/3.jpeg", match: false},
    {"path": "/img/4.jpeg", match: false},
    {"path": "/img/5.jpeg", match: false},
    {"path": "/img/6.jpeg", match: false}
];


function App() {
    const [cards, setCards] = useState([]);
    const [selectedOne, setSelectedOne] = useState(null);
    const [selectedTwo, setSelectedTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const prepareCards = () => {
        const sortedCards = [...cardList, ...cardList]
            .sort(() => 0.5 - Math.random())
            .map((card) => ({...card, id: Math.random()}));

        setCards(sortedCards);

        resetState();
    }

    useEffect(() => {
        prepareCards();
    }, []);


    const handleSelected = (card) => {
        selectedOne ? setSelectedTwo(card) : setSelectedOne(card);
    }

    useEffect(() => {
        if (selectedOne && selectedTwo) {
            setScore(prevScore => prevScore + 1)
            setDisabled(true);

            if (selectedOne.path === selectedTwo.path) {
                setCards(prevCards =>{
                    return prevCards.map((card) => {
                        if (card.path === selectedOne.path) {
                            return {...card, match: true}
                        }
                        return card;
                    });
                })
                resetState();
            }else {
                setTimeout(() => {
                    resetState()
                }, 1000);
            }
        }
    }, [selectedOne, selectedTwo]);

    const resetState = () => {
        setSelectedOne(null);
        setSelectedTwo(null);
        setDisabled(false);
        setScore(0);
    }

    return (
        <div className="container">
            <h1>Memory App</h1>
            <button onClick={prepareCards}>Oyunu Başlat</button>
            <p>{score}</p>

            <div className="card-grid">
                {
                    cards.map(card => (
                        <MemoryCard
                            disabled={disabled}
                            card={card}
                            key={card.id}
                            handleSelected={handleSelected}
                            rotated={card == selectedOne || card == selectedTwo || card.match}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default App;

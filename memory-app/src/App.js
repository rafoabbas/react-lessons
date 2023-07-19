import {useEffect, useState} from 'react';
import './App.css';
import MemoryCard from "./comonents/MemoryCard";

const cardList = [
    {"path": "/img/1.jpeg"},
    {"path": "/img/2.jpeg"},
    {"path": "/img/3.jpeg"},
    {"path": "/img/4.jpeg"},
    {"path": "/img/5.jpeg"},
    {"path": "/img/6.jpeg"}
];


function App() {
    const [cards, setCards] = useState([]);

    const [selectedOne, setSelectedOne] = useState(null);
    const [selectedTwo, setSelectedTwo] = useState(null);

    const [disabled, setDisabled] = useState(false);

    const prepareCards = () => {
        const sortedCards = [...cardList, ...cardList]
            .sort(() => 0.5 - Math.random())
            .map((card) => ({...card, id: Math.random()}));

        setCards(sortedCards);
        setSelectedOne(null);
        setSelectedTwo(null);
    }

    useEffect(() => {
        prepareCards();
    }, []);


    const handleSelected = (card) => {
        selectedOne ? setSelectedTwo(card) : setSelectedOne(card);
    }

    useEffect(() => {
        if (selectedOne && selectedTwo) {
            setDisabled(true);
        }
    }, [selectedOne, selectedTwo]);


    return (
        <div className="container">
            <h1>Memory App</h1>
            <button onClick={prepareCards}>Oyunu Başlat</button>

            <div className="card-grid">
                {
                    cards.map(card => (
                        <MemoryCard
                            disabled={disabled}
                            card={card}
                            key={card.id}
                            handleSelected={handleSelected}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default App;
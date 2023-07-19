import './MemoryCard.css';

const MemoryCard = ({card, handleSelected, disabled, ...props}) => {
    const handleClick = (e) => {

        if (disabled) {
            alert('Iki tane kart seçdiniz zaten, yeni oyun başlatın.');
        }

        handleSelected(card);
    }

    return (
        <div className="card">
            <img className='cardFront' src={card.path} alt=""/>
            <img className='cardBack' onClick={handleClick} src="/img/cover.jpeg" alt=""/>
        </div>
    )
}

export default MemoryCard;
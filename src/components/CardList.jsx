// CardList.js
import React from 'react';
import Card from './Card';

const cardData = [
    { title: 'Luxury Accommodation', icon: 'fas fa-bed' },
    { title: 'Chauffeured Drives', icon: 'fas fa-car' },
    { title: 'Tours with Local Guides', icon: 'fas fa-map-marker-alt' },
    { title: 'Safaris', icon: 'fas fa-paw' },
    { title: 'Helicopter Rides', icon: 'fas fa-helicopter' },
    { title: 'Private Yacht Charters', icon: 'fas fa-ship' },
    { title: 'Photography', icon: 'fas fa-camera' },
    { title: 'Exclusive Art Tours', icon: 'fas fa-paint-brush' },
];

const CardList = () => {
    return (
        <div className="card-list">
            {cardData.map((card, index) => (
                <Card key={index} title={card.title} icon={card.icon} />
            ))}
        </div>
    );
};

export default CardList;

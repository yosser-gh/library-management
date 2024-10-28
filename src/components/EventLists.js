import React from 'react';
import { events } from '../data';

function EventList() {
  return (
    <div className="events">
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <h3>{event.name}</h3>
            <p>Date: {event.date}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;

import React from 'react';
import EventsContainer from './pages/eventsContainer/EventsContainer';
import './Root.css';

const app = () => (
  // TODO manage routes etc
  <div className="Root">
    <header className="RootHeader">
      <h1>Track Your Life Progress</h1>
    </header>
    <EventsContainer />
  </div>
);

export default app;

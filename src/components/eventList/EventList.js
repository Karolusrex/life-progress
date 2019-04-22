import propTypes from 'prop-types';
import React from 'react';
import AgeBar from '../ageBar/AgeBar';
import './EventList.css';

const EventList = props => {
  const { events } = props;
  const allAges = [...events.map(({ startAge }) => startAge), ...events.map(({ endAge }) => endAge)];
  const globalStartAge = Math.max(...allAges);
  const globalEndAge = Math.min(...allAges);

  return (
    <div>
      <div>
        {events.map(({ category, name, startAge, endAge }, eventIndex) => (
          <div className="EventListItem" key={eventIndex} onClick={() => props.onEventClicked(eventIndex)}>
            <div className="Details">
              <div className="Category">
                <i className={`fas fa-${category.icon}`} />
              </div>
              {name || '<Empty>'}
            </div>
            <div className="RightControl">
              <div className="Description">{Math.round(endAge - startAge)} Years </div>
              <AgeBar globalMin={globalEndAge} globalMax={globalStartAge} min={endAge} max={startAge} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

EventList.propTypes = {
  events: propTypes.array,
  onEventClicked: propTypes.func,
};
export default EventList;

import React from 'react';
import { createEventData, createCategoryData } from '../../mocks/data';
import Select from '../../components/select/Select';
import EventList from '../../components/eventList/EventList';
import EditEventDialog from '../../components/editEventDialog/EditEventDialog';
import Button from '../../components/button/Button';
import { ageSortOptions, alphabeticSortOptions } from './sortingOptions';
import './EventsContainer.scss';

const placeholderEvent = {
  name: 'Pottery course',
  startAge: 40,
  endAge: 45,
};

class EventsContainer extends React.Component {
  constructor(props) {
    super(props);
    const sortingMethod = alphabeticSortOptions[0].value;
    const ageSort = ageSortOptions[0].value;
    const events = createEventData();
    const categories = createCategoryData();
    this.state = {
      categories,
      editingIndex: null,
      sortingMethod,
      ageSort,
      eventsAndCategories: events
        .map(event => ({
          ...event,
          category: categories.find(category => category.id === event.categoryId),
        }))
        .sort(sortingMethod),
    };
  }

  render() {
    const { editingIndex, eventsAndCategories, sortingMethod, ageSort } = this.state;
    const isAddingNew = editingIndex === eventsAndCategories.length;
    const currentlyEditingEvent = isAddingNew ? placeholderEvent : eventsAndCategories[editingIndex];
    const sortingOptions = alphabeticSortOptions.concat({
      value: ageSort,
      label: 'Age...',
    });
    return (
      <div className="EventsContainer">
        <div className="SortingControl">
          Order by <Select onChange={this.onSort} items={sortingOptions} value={sortingMethod} />
          {sortingMethod === ageSort && <Select onChange={this.onAgeSort} items={ageSortOptions} value={ageSort} />}
        </div>
        {currentlyEditingEvent && (
          <EditEventDialog
            useAddMode={isAddingNew}
            event={currentlyEditingEvent}
            categories={this.state.categories}
            onSave={this.onSave}
            onCancel={this.onCancel}
            onDelete={this.onDelete}
          />
        )}
        <EventList onEventClicked={this.onEdit} events={this.state.eventsAndCategories} />
        <div className="AddEvent">
          <Button primary onClick={this.onAddNew}>
            Add Event
          </Button>
        </div>
      </div>
    );
  }

  onSave = ({ categoryId, ...event }) => {
    this.setState(({ eventsAndCategories, editingIndex }) => ({
      editingIndex: null,
      eventsAndCategories: [
        ...eventsAndCategories.slice(0, editingIndex),
        {
          ...event,
          category: this.state.categories.find(category => category.id === categoryId),
        },
        ...eventsAndCategories.slice(editingIndex + 1),
      ].sort(this.state.sortingMethod),
    }));
  };

  onDelete = () => {
    this.setState(({ eventsAndCategories, editingIndex }) => ({
      editingIndex: null,
      eventsAndCategories: eventsAndCategories
        .slice(0, editingIndex)
        .concat(eventsAndCategories.slice(editingIndex + 1)),
    }));
  };

  onCancel = () => {
    this.setState(() => ({ editingIndex: null }));
  };

  onSort = sortingMethod => {
    this.setState(({ eventsAndCategories }) => ({
      eventsAndCategories: eventsAndCategories.sort(sortingMethod),
      sortingMethod,
    }));
  };

  onAgeSort = sortingMethod => {
    this.setState(({ eventsAndCategories }) => ({
      eventsAndCategories: eventsAndCategories.sort(sortingMethod),
      sortingMethod,
      ageSort: sortingMethod,
    }));
  };

  onEdit = index => {
    this.setState(() => ({ editingIndex: index }));
  };

  onAddNew = () => {
    this.setState(() => ({ editingIndex: this.state.eventsAndCategories.length }));
  };
}

export default EventsContainer;

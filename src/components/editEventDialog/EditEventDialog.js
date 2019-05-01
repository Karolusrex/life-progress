import propTypes from 'prop-types';
import React from 'react';
import Dialog from '../dialog/Dialog';
import InputField from '../inputField/InputField';
import Button from '../button/Button';
import Select from '../select/Select';
import './EditEventDialog.scss';

/**
 * Component for entering data about an event. Can act either in "edit mode" or in "add mode"
 */
export default class EditEventDialog extends React.Component {
  constructor(props) {
    super(props);
    const {
      name,
      // If no category id is present, assume the first in the list
      categoryId = props.categories[0].id,
      startAge,
      endAge,
    } = props.event;
    this.state = {
      name,
      categoryId,
      startAge,
      endAge,
    };
  }

  render() {
    const { props } = this;
    return (
      <Dialog>
        <form id="edit-event">
          <h2>{props.useAddMode ? 'Adding new event' : 'Editing event'}</h2>
          <div>
            <InputField label="Name" value={this.state.name} onChange={this.nameChanged} autoFocus />
            <Select
              label="Category"
              value={this.state.categoryId}
              onChange={this.categoryChanged}
              items={props.categories.map(({ name, id }) => ({
                value: id,
                label: name,
              }))}
            />
          </div>
          <div className="AgeControl">
            <span>From age&nbsp;</span>
            <InputField label="" value={this.state.startAge} onChange={this.startAgeChanged} type="number" />
            <span>&nbsp;until&nbsp;</span>
            <InputField label="" value={this.state.endAge} onChange={this.endAgeChanged} type="number" />
          </div>
        </form>
        <Button primary type="submit" form="edit-event" onClick={this.onSave}>
          {props.useAddMode ? 'Add' : 'Save'}
        </Button>
        <Button onClick={this.onCancel}>Cancel</Button>
        {!props.useAddMode && (
          <div className="pull-right">
            <Button onClick={this.onDelete} warning>
              {this.state.confirmDelete ? 'Confirm delete!' : 'Delete'}
            </Button>
          </div>
        )}
      </Dialog>
    );
  }

  nameChanged = name => {
    this.setState(() => ({ name }));
  };

  categoryChanged = newCategoryId => {
    this.setState(() => ({ categoryId: newCategoryId }));
  };

  startAgeChanged = startAge => {
    this.setState(() => ({ startAge }));
  };

  endAgeChanged = endAge => {
    this.setState(() => ({ endAge }));
  };

  onSave = () => {
    const startAge = +this.state.startAge;
    const endAge = +this.state.endAge;
    // Corner-case: There might be a situation in which the end age was lower than the starting age
    const correctedStartAge = Math.min(startAge, endAge);
    const correctedEndAge = Math.max(startAge, endAge);
    this.props.onSave({
      ...this.state,
      startAge: correctedStartAge,
      endAge: correctedEndAge,
    });
  };

  onCancel = () => {
    this.props.onCancel();
  };

  onDelete = () => {
    if (!this.state.confirmDelete) {
      this.setState(() => ({
        confirmDelete: true,
      }));
      return;
    }
    this.props.onDelete();
  };
}

EditEventDialog.propTypes = {
  onCancel: propTypes.func,
  onSave: propTypes.func,
  onDelete: propTypes.func,
  categories: propTypes.array,
  useAddMode: propTypes.bool,
  event: propTypes.object,
};

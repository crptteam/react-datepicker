import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from "styled-components";

import { DatePickerPanel } from './DatePickerPanel';
import { DatePickerInputer } from './DatePickerInputer';

import moment from 'moment';
import defaultTheme from '../../theme/defaultTheme';

moment.locale('ru');

class DatePicker extends Component {
  blurTimeout;
  im;

  constructor(props) {
    super(props);

    const date = this.props.date ? moment(this.props.date) : null;

    this.state = {
      isOpen: false,
      date: date
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.select = this.select.bind(this);
    this.onValidUpdate = this.onValidUpdate.bind(this);
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef && this.props.onRef(undefined);
  }

  clear() {
    this.setState({
      date: null
    });

    this.props.onUpdate && this.props.onUpdate({ date: null });
    this.props.onChange && this.props.onChange({ date: null });
  }

  onValidUpdate(state) {
    this.setState(state);
    this.props.onUpdate(state);
  }

  onFocus(e) {
    this.setState({
      isOpen: true
    });

    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  onBlur(e) {
    this.blurTimeout = setTimeout(() => {
      this.setState({
        isOpen: false
      });

      this.props.onUpdate({ date: this.state.date });
    }, 200);
  }

  select(day) {
    let date = this.state.date;

    if (date) {
      if (day.date.isSame(date, 'day')) {
        date = null;
      } else {
        date = moment(day.date);
      }
    } else {
      date = moment(day.date);
    }

    const update = { date };

    this.setState(update);
    this.props.onChange(update);
  }

  onMouseDown(e) {
    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  render() {
    const name = this.props.name;

    return (
      <DatePickerInputer
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onValidUpdate={this.onValidUpdate}
        date={this.state.date}
        name={name}
        inline={this.props.inline}
        theme={this.props.theme}
        placeholder={this.props.placeholder}
        savePlaceholder={this.props.savePlaceholder}
      >
        <DatePickerPanel
          date={this.state.date}
          visible={this.state.isOpen}
          select={this.select}
          theme={this.props.theme}
        />
      </DatePickerInputer>
    );
  }
}

DatePicker.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.object,
  disabled: PropTypes.bool,
  date: PropTypes.string,
  onChange: PropTypes.func,
  onUpdate: PropTypes.func
};

DatePicker.defaultProps = {
  disabled: false,
  theme: defaultTheme,
  onChange: val => null,
  onUpdate: val => null
};

DatePicker.displayName = 'DatePicker';

export default withTheme(DatePicker);

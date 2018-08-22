import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withTheme} from 'styled-components';
import { RangePickerPanel } from './RangePickerPanel';
import { RangePickerInputer } from './RangePickerInputer';
import 'datejs';
import moment from 'moment';
import defaultTheme from '../../theme/defaultTheme';

moment.locale('ru');

class RangePicker extends Component {
  blurTimeout;
  im;

  constructor(props) {
    super(props);
    const start = this.props.from ? moment(Date.parse(this.props.from)) : moment();

    const end = this.props.to
      ? moment(Date.parse(this.props.to))
      : moment(start).add(1, 'month');

    this.state = {
      isOpen: false,
      from: this.props.from ? moment(start) : null,
      to: this.props.to ? moment(end) : null
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
      from: null,
      to: null
    });

    this.props.onUpdate && this.props.onUpdate({ from: null, to: null });
    this.props.onChange && this.props.onChange({ from: null, to: null });
  }

  onValidUpdate(state) {
    this.setState(state);
    this.props.onChange({ ...this.state, ...state });
    this.props.onUpdate({ ...this.state, ...state });
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

      this.props.onUpdate({ to: this.state.to, from: this.state.from });
    }, 200);
  }

  select(day) {
    let from = this.state.from;
    let to = this.state.to;

    if (from && to) {
      const diffFrom = Math.abs(this.state.from.diff(day.date, 'day'));
      const diffTo = Math.abs(this.state.to.diff(day.date, 'day'));

      if (from.isSame(day.date, 'day')) {
        from = null;
      } else if (to.isSame(day.date, 'day')) {
        to = null;
      } else if (
        day.date.isAfter(from, 'day') &&
        day.date.isBefore(to, 'day')
      ) {
        if (diffFrom > diffTo) {
          from = moment(day.date);
        } else {
          to = moment(day.date);
        }
      } else if (day.date.isAfter(to, 'day')) {
        from = moment(to);
        to = moment(day.date);
      } else if (day.date.isBefore(from, 'day')) {
        to = moment(from);
        from = moment(day.date);
      }
    } else if (from) {
      if (day.date.isSame(from, 'day')) {
        from = null;
      } else if (day.date.isAfter(from, 'day')) {
        to = moment(day.date);
      } else if (day.date.isBefore(from, 'day')) {
        to = moment(from);
        from = moment(day.date);
      }
    } else if (to) {
      if (day.date.isSame(to, 'day')) {
        to = null;
      } else if (day.date.isAfter(to, 'day')) {
        from = moment(to);
        to = moment(day.date);
      } else if (day.date.isBefore(to, 'day')) {
        from = moment(day.date);
      }
    } else {
      from = moment(day.date);
    }

    const update = { to, from };

    this.setState({ ...update });
    this.props.onChange(update);
  }

  onMouseDown(e) {
    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  render() {
    const name = this.props.name;

    return (
      <RangePickerInputer
        inline={this.props.inline}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onValidUpdate={this.onValidUpdate}
        from={this.state.from}
        to={this.state.to}
        name={name}
        theme={this.props.theme}
        placeholder={this.props.placeholder}
        savePlaceholder={this.props.savePlaceholder}
      >
        <RangePickerPanel
          from={this.state.from}
          to={this.state.to}
          visible={this.state.isOpen}
          select={this.select}
          theme={this.props.theme}
          positionX={this.props.positionX}
          positionY={this.props.positionY}
        />
      </RangePickerInputer>
    );
  }
}

RangePicker.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.object,
  disabled: PropTypes.bool,
  from: PropTypes.string,
  to: PropTypes.string,
  onChange: PropTypes.func,
  onUpdate: PropTypes.func,
  positionalX: PropTypes.string,
  positionalY: PropTypes.string,
};

RangePicker.defaultProps = {
  disabled: false,
  theme: defaultTheme,
  from: null,
  to: null,
  positionX: '',
  positionY: '',
  onChange: val => null,
  onUpdate: val => null
};

RangePicker.displayName = 'RangePicker';

export default withTheme(RangePicker);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { DatePickerPanel } from './DatePickerPanel';
import { DatePickerInputer } from './DatePickerInputer';

import moment from 'moment';
import defaultTheme from '../../theme/defaultTheme';
import { RangePickerPanel } from '../RangePicker/RangePickerPanel';

moment.locale('ru');

class DatePicker extends Component {
  blurTimeout;
  im;

  constructor(props) {
    super(props);

    const date = this.props.date
      ? moment(this.props.date, this.props.format)
      : null;

    this.state = {
      isOpen: false,
      date: date
    };

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.select = this.select.bind(this);
    this.onValidUpdate = this.onValidUpdate.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef && this.props.onRef(undefined);
  }

  componentDidUpdate(prevProps) {
    const { defaultValue } = this.props;
    if (defaultValue !== prevProps.defaultValue) {
      this.setState({ date: defaultValue });
    }
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
    const { isOpen } = this.state;

    this.setState({
      isOpen: true
    }, () => !isOpen && this.props.onTogglePanel(true));

    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  onBlur(e) {
    const { isOpen } = this.state;
    this.blurTimeout = setTimeout(() => {
      this.setState({
        isOpen: false
      }, () => isOpen && this.props.onTogglePanel(false));

      this.props.onUpdate({ date: this.state.date });
    }, 200);
  }

  select(date) {
    const isOpen = !date;
    this.setState({ date, isOpen }, () => this.props.onTogglePanel(isOpen));
    this.props.onChange({ date });
  }

  reset() {
    const date = this.props.date
      ? moment(this.props.date, this.props.format)
      : null;

    this.setState({ date });
  }

  onMouseDown(e) {
    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  onPanelRef = (extRef) => { this.optionsPanel = extRef; };

  render() {
    const name = this.props.name;

    return (
      <DatePickerInputer
        disabled={this.props.disabled}
        isError={this.props.isError}
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
        monthView={this.props.monthView}
        format={this.props.format}
      >
        <DatePickerPanel
          onRef={this.onPanelRef}
          date={this.state.date}
          visible={this.state.isOpen}
          theme={this.props.theme}
          positionX={this.props.positionX}
          positionY={this.props.positionY}
          monthView={this.props.monthView}
          reset={this.reset}
          accept={this.select}
          controls={this.props.controls}
          acceptText={this.props.acceptText}
          resetText={this.props.resetText}
        />
      </DatePickerInputer>
    );
  }
}

DatePicker.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.object,
  disabled: PropTypes.bool,
  isError: PropTypes.bool,
  date: PropTypes.string,
  onChange: PropTypes.func,
  onUpdate: PropTypes.func,
  positionalX: PropTypes.string,
  positionalY: PropTypes.string,
  monthView: PropTypes.bool,
  format: PropTypes.string,
  controls: PropTypes.bool,
  acceptText: PropTypes.string,
  resetText: PropTypes.string,
  onTogglePanel: PropTypes.func,
};

DatePicker.defaultProps = {
  disabled: false,
  isError: false,
  theme: defaultTheme,
  positionX: '',
  positionY: '',
  onChange: val => null,
  onUpdate: val => null,
  format: null,
  controls: false,
  acceptText: 'Accept',
  resetText: 'Reset',
  onTogglePanel: () => {},
};

DatePicker.displayName = 'DatePicker';

export default withTheme(DatePicker);

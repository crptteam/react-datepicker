import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { DatePickerPanel } from './DatePickerPanel';
import { DatePickerInputer } from './DatePickerInputer';

import moment from 'moment';
import defaultTheme from '../../theme/defaultTheme';
import OptionsPointer from "../../styled/OptionsPointer";
import DatePickerPanelWrap from "../../styled/DatePickerPanelWrap";

moment.locale('ru');

class DatePicker extends Component {
  static displayName = 'DatePicker';

  static propTypes = {
    onRef: PropTypes.func,
    onUpdate: PropTypes.func,
    onChange: PropTypes.func,
    onTogglePanel: PropTypes.func,
    className: PropTypes.string,
    theme: PropTypes.object,
    disabled: PropTypes.bool,
    isError: PropTypes.bool,
    date: PropTypes.string,
    positionalX: PropTypes.string,
    positionalY: PropTypes.string,
    monthView: PropTypes.bool,
    format: PropTypes.string,
    acceptText: PropTypes.string,
    resetText: PropTypes.string,
    showPointer: PropTypes.bool,
  };

  static defaultProps = {
    onUpdate: () => {},
    onChange: () => {},
    onRef: () => {},
    onTogglePanel: () => {},
    disabled: false,
    isError: false,
    theme: defaultTheme,
    positionX: '',
    positionY: '',
    format: null,
    acceptText: 'Применить',
    resetText: 'Сбросить',
    showPointer: true,
  };

  blurTimeout;
  im;
  optionsPanel;

  constructor(props) {
    super(props);

    const date = this.props.date
      ? moment(this.props.date, this.props.format)
      : null;

    this.state = {
      isOpen: false,
      date: date,
      defaultDate: this.props.date,
    };
  }

  componentDidMount() {
    const { onRef } = this.props;
    onRef(this);
  }

  componentWillUnmount() {
    const { onRef } = this.props;
    onRef(undefined);
    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.date !== state.defaultDate) {
      const date = props.date
        ? moment(props.date, props.format)
        : null;

      return {
        date,
        defaultDate: props.date,
      }
    }

    return null;
  }

  onClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { onUpdate, onChange } = this.props;
    this.setState({ date: null });
    onUpdate({ date: null });
    onChange({ date: null });
  };

  onValidUpdate = (state) => {
    const { onUpdate } = this.props;
    this.setState(state);
    onUpdate(state);
  };

  onFocus = () => {
    const { onTogglePanel } = this.props;
    const { isOpen } = this.state;

    this.setState(
      { isOpen: true },
      () => !isOpen && onTogglePanel(true)
    );

    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  };

  onBlur = () => {
    this.blurTimeout = setTimeout(() => {
      const { onUpdate, onTogglePanel } = this.props;
      const { isOpen, date } = this.state;

      this.setState(
        { isOpen: false },
        () => isOpen && onTogglePanel(false)
      );

      onUpdate({ date });
    }, 200);
  };

  select = (date) => {
    const { onChange, onTogglePanel } = this.props;
    const isOpen = !date;

    this.setState(
      { date, isOpen },
      () => onTogglePanel(isOpen)
    );

    onChange({ date });
  };

  reset = () => {
    const { date: propsDate, format } = this.props;

    const date = propsDate
      ? moment(propsDate, format)
      : null;

    this.setState({ date });
  };

  onMouseDown = () => {
    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  };

  onPanelRef = (extRef) => {
    this.optionsPanel = extRef;
  };

  render() {
    const {
      name,
      disabled,
      isError,
      inline,
      theme,
      placeholder,
      savePlaceholder,
      monthView,
      format,
      positionX,
      positionY,
      acceptText,
      resetText,
      showPointer,
    } = this.props;
    const { date, isOpen } = this.state;


    return (
      <DatePickerInputer
        disabled={disabled}
        isError={isError}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onValidUpdate={this.onValidUpdate}
        onClear={this.onClear}
        date={date}
        name={name}
        inline={inline}
        theme={theme}
        placeholder={placeholder}
        savePlaceholder={savePlaceholder}
        monthView={monthView}
        format={format}
      >
        {isOpen && showPointer && <OptionsPointer theme={theme} />}
        <DatePickerPanel
          onRef={this.onPanelRef}
          showPointer={showPointer}
          date={date}
          visible={isOpen}
          theme={theme}
          positionX={positionX}
          positionY={positionY}
          monthView={monthView}
          reset={this.reset}
          accept={this.select}
          acceptText={acceptText}
          resetText={resetText}
        />
      </DatePickerInputer>
    );
  }
}

export default withTheme(DatePicker);

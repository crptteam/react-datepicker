import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";

import { DatePickerPanel } from "./DatePickerPanel";
import { DatePickerInputer } from "./DatePickerInputer";

import moment from "moment";
import defaultTheme from "../../theme/defaultTheme";
import OptionsPointer from "../../styled/OptionsPointer";
import PanelWrap from "../../styled/PanelWrap";

moment.locale("ru");

class DatePicker extends Component {
  static displayName = "DatePicker";

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
    outFormat: PropTypes.string,
    acceptText: PropTypes.string,
    resetText: PropTypes.string,
    showPointer: PropTypes.bool,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    rightIconReplacer: PropTypes.element,
    onClearDate: PropTypes.string
  };

  static defaultProps = {
    onUpdate: () => {},
    onChange: () => {},
    onRef: () => {},
    onTogglePanel: () => {},
    disabled: false,
    isError: false,
    theme: defaultTheme,
    positionX: "",
    positionY: "",
    format: null,
    acceptText: "Применить",
    resetText: "Сбросить",
    showPointer: false,
    minDate: undefined,
    maxDate: undefined,
    onClearDate: undefined
  };

  blurTimeout;
  im;
  optionsPanel;

  constructor(props) {
    super(props);

    const { date, format, minDate, maxDate } = this.props;

    const preparedDate = date ? moment(date, format) : null;

    this.state = {
      isOpen: false,
      date: preparedDate,
      initialDate: date,
      minDate: minDate ? moment(minDate, format) : undefined,
      maxDate: maxDate ? moment(maxDate, format) : undefined
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.date !== state.initialDate) {
      const date = props.date ? moment(props.date, props.format) : null;

      return {
        date,
        initialDate: props.date
      };
    }

    return null;
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

  onClear = e => {
    e.preventDefault();
    e.stopPropagation();
    this.clear();
  };

  clear = () => {
    const { onUpdate, onChange, onClearDate, format } = this.props;
    let date = null;
    if (onClearDate) {
      date = moment(onClearDate, format);
    }
    this.setState({ date });
    onUpdate({ date });
    onChange({ date });
  };

  onAccept = () => {
    const { onTogglePanel } = this.props;

    this.setState({ isOpen: false }, () => onTogglePanel(false));
  };

  onSelect = date => {
    const { onChange, onUpdate } = this.props;
    this.setState({ date });
    onChange({ date });
    onUpdate({ date });
  };

  onValidUpdate = state => {
    const { onUpdate } = this.props;
    this.setState(state);
    onUpdate(state);
  };

  onFocus = () => {
    const { onTogglePanel } = this.props;
    const { isOpen } = this.state;

    this.setState({ isOpen: true }, () => !isOpen && onTogglePanel(true));

    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  };

  onBlur = () => {
    this.blurTimeout = setTimeout(() => {
      const { onUpdate, onTogglePanel } = this.props;
      const { isOpen, date } = this.state;

      this.setState({ isOpen: false }, () => isOpen && onTogglePanel(false));

      onUpdate({ date });
    }, 200);
  };

  onMouseDown = () => {
    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  };

  onPanelRef = extRef => {
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
      outFormat,
      positionX,
      positionY,
      acceptText,
      resetText,
      showPointer,
      rightIconReplacer
    } = this.props;
    const { date, isOpen, minDate, maxDate } = this.state;

    return (
      <DatePickerInputer
        disabled={disabled}
        isError={isError}
        isOpen={isOpen}
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
        outFormat={outFormat}
        minDate={minDate}
        maxDate={maxDate}
        rightIconReplacer={rightIconReplacer}
      >
        <PanelWrap
          innerRef={this.onPanelRef}
          positionX={positionX}
          positionY={positionY}
          visible={isOpen}
        >
          {isOpen && showPointer && <OptionsPointer theme={theme} />}
          <DatePickerPanel
            showPointer={showPointer}
            date={date}
            theme={theme}
            monthView={monthView}
            onReset={this.onClear}
            onAccept={this.onAccept}
            onSelect={this.onSelect}
            acceptText={acceptText}
            resetText={resetText}
            minDate={minDate}
            maxDate={maxDate}
          />
        </PanelWrap>
      </DatePickerInputer>
    );
  }
}

export default withTheme(DatePicker);

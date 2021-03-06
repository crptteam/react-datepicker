import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";
import { RangePickerPanel } from "./RangePickerPanel";
import { RangePickerInputer } from "./RangePickerInputer";
import "datejs";
import moment from "moment";
import defaultTheme from "../../theme/defaultTheme";
import OptionsPointer from "../../styled/OptionsPointer";
import PanelWrap from "../../styled/PanelWrap";

moment.locale("ru");

export const PickerStep = {
  NONE: 0,
  LEFT: 1,
  RIGHT: 2
};

class RangePicker extends Component {
  static displayName = "RangePicker";

  static propTypes = {
    className: PropTypes.string,
    theme: PropTypes.object,
    disabled: PropTypes.bool,
    isError: PropTypes.bool,
    from: PropTypes.string,
    to: PropTypes.string,
    onClearFrom: PropTypes.string,
    onClearTo: PropTypes.string,
    onChange: PropTypes.func,
    onUpdate: PropTypes.func,
    monthView: PropTypes.bool,
    positionalX: PropTypes.string,
    positionalY: PropTypes.string,
    format: PropTypes.string,
    acceptText: PropTypes.string,
    resetText: PropTypes.string,
    onTogglePanel: PropTypes.func,
    leftPlaceholder: PropTypes.string,
    rightPlaceholder: PropTypes.string,
    noActions: PropTypes.bool,
    noAutoFocus: PropTypes.bool,
    showCurrent: PropTypes.bool
  };

  static defaultProps = {
    onUpdate: () => {},
    onChange: () => {},
    onRef: () => {},
    onTogglePanel: () => {},
    disabled: false,
    isError: false,
    theme: defaultTheme,
    from: null,
    to: null,
    positionX: "",
    positionY: "",
    format: null,
    acceptText: "Применить",
    resetText: "Сбросить",
    showPointer: false,
    showCurrent: false
  };

  blurTimeout;
  im;
  main;
  inputer;
  open;
  optionsPanel;

  constructor(props) {
    super(props);

    const { from, to, format, minDate, maxDate } = this.props;

    const start = from ? moment(from, format) : moment();
    const end = to ? moment(to, format) : moment(start);

    this.state = {
      step: PickerStep.NONE,
      from: from ? moment(start) : null,
      to: to ? moment(end) : null,
      initialFrom: from,
      initialTo: to,
      minDate: minDate ? moment(minDate, format) : undefined,
      maxDate: maxDate ? moment(maxDate, format) : undefined
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.from !== state.initialFrom ||
      props.to !== state.initialTo ||
      props.minDate !== moment(state.minDate, props.format) ||
      props.maxDate !== moment(state.maxDate, props.format)
    ) {
      const fromDate = props.from ? moment(props.from, props.format) : null;

      const toDate = props.to ? moment(props.to, props.format) : null;

      return {
        maxDate: props.maxDate
          ? moment(props.maxDate, props.format)
          : undefined,
        minDate: props.minDate
          ? moment(props.minDate, props.format)
          : undefined,
        from: props.from !== state.initialFrom ? fromDate : state.from || null,
        to: props.to !== state.initialTo ? toDate : state.to || null,
        initialFrom: props.from,
        initialTo: props.to,
        step:
          props.from !== state.initialFrom || props.to !== state.initialTo
            ? PickerStep.NONE
            : state.step
      };
    }

    return null;
  }

  componentDidMount() {
    const { onRef } = this.props;
    onRef(this);
    document.addEventListener("mousedown", this.handleClick, true);
  }

  componentWillUnmount() {
    const { onRef } = this.props;
    onRef(undefined);
    document.removeEventListener("mousedown", this.handleClick, true);
    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  componentDidUpdate(prevProps, prevState) {
    const { onTogglePanel, onUpdate, onChange, to, from, format } = this.props;
    if (prevProps.to !== to || prevProps.from !== from) {
      const fromDate = from ? moment(from, format) : null;

      const toDate = to ? moment(to, format) : null;
      onUpdate && onUpdate({ from: fromDate, to: toDate });
      onChange && onChange({ from: fromDate, to: toDate });
    }

    const { step } = this.state;
    if (prevState.step !== step) {
      if (step === PickerStep.NONE) onTogglePanel(false);
      else onTogglePanel(true);
    }
  }

  handleClick = e => {
    if (this.optionsPanel.contains(e.target)) {
      e.preventDefault();
      return;
    }
  };

  clear = () => {
    const { onUpdate, onChange } = this.props;
    const leftValue = this.leftClear();
    const rightValue = this.rightClear();
    const value = { from: null, to: null, ...leftValue, ...rightValue };
    console.log("value clear", value);
    onUpdate(value);
    onChange(value);

    return value;
  };

  onLeftClear = e => {
    const { step } = this.state;
    e.preventDefault();
    e.stopPropagation();
    this.leftClear();
    this.inputer.focusLeft();
  };

  onRightClear = e => {
    const { step } = this.state;
    e.preventDefault();
    e.stopPropagation();
    this.rightClear();

    this.inputer.focusRight();
  };

  leftClear = () => {
    const { onUpdate, onChange, onClearFrom, format } = this.props;
    const { to } = this.state;

    let from, returnValue;

    if (onClearFrom) {
      const start = onClearFrom && moment(onClearFrom, format);
      from = start ? start : null;
      returnValue = { from, to: to, _type: "RangePicker" };
    } else {
      from = null;
    }

    this.setState({
      from: from
    });

    onUpdate({ from: from, to: to });
    onChange({ from: from, to: to });

    return returnValue;
  };

  rightClear = () => {
    const { onUpdate, onChange, onClearTo, format } = this.props;
    const { from } = this.state;

    let to, returnValue;

    if (onClearTo) {
      const end = onClearTo && moment(onClearTo, format);
      to = end ? end : null;
      returnValue = returnValue
        ? { ...returnValue, to }
        : { from, to, _type: "RangePicker" };
    } else {
      to = null;
    }

    this.setState({
      to: to
    });

    onUpdate({ from: from, to: to });
    onChange({ from: from, to: to });

    return returnValue;
  };

  onAccept = () => {
    this.setState({ step: PickerStep.NONE });
  };

  onLeftSelect = date => {
    const { onChange, onUpdate, noAutoFocus } = this.props;
    const { minDate, maxDate } = this.state;
    let { to } = this.state;
    const from = date;

    if (date !== null) {
      if ((minDate && date < minDate) || (maxDate && date > maxDate)) return;
      if (date.isSame(to, "day")) {
        if (maxDate && to > maxDate) to = moment(date);
      } else if (date.isAfter(to)) {
        to = null;
      }
    }

    this.setState({ from, to });
    onChange({ from, to });
    onUpdate({ from, to });
    if (!noAutoFocus) {
      this.setState({
        step: PickerStep.RIGHT
      });
      this.inputer.focusRight();
    } else {
      this.setState({
        step: PickerStep.NONE
      });
    }
  };

  onRightSelect = date => {
    const { onChange, onUpdate, noActions } = this.props;
    const { minDate, maxDate } = this.state;
    let { from } = this.state;
    let to = date;

    if (date !== null) {
      if ((minDate && date < minDate) || (maxDate && date > maxDate)) return;
      if (date.isSame(from, "day")) {
        if (minDate && from < minDate) from = moment(date);
      } else if (date.isBefore(from)) {
        from = null;
      }
    }

    this.setState({ from, to });
    onChange({ from, to });
    onUpdate({ from, to });
    if (noActions) {
      this.setState({
        step: PickerStep.NONE
      });
    }
  };

  onValidUpdate = state => {
    const { onUpdate } = this.props;
    this.setState(state);
    onUpdate({ ...this.state, ...state });
  };

  onLeftFocus = () => {
    if (this.blurTimeout) clearTimeout(this.blurTimeout);
    this.setState({ step: PickerStep.LEFT });
  };

  onRightFocus = () => {
    if (this.blurTimeout) clearTimeout(this.blurTimeout);
    this.setState({ step: PickerStep.RIGHT });
  };

  onBlur = () => {
    if (this.blurTimeout) clearTimeout(this.blurTimeout);

    this.blurTimeout = setTimeout(() => {
      const { onUpdate } = this.props;
      const { from, to } = this.state;
      onUpdate({ to, from });
      this.setState({ step: PickerStep.NONE });
    }, 200);
  };

  onMouseDown = () => {
    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  };

  onPanelRef = extRef => {
    this.optionsPanel = extRef;
  };

  onClear = () => {
    this.rightClear();
    this.leftClear();
  };

  render() {
    const {
      name,
      disabled,
      isError,
      inline,
      theme,
      leftPlaceholder,
      rightPlaceholder,
      savePlaceholder,
      monthView,
      format,
      positionX,
      positionY,
      acceptText,
      resetText,
      showPointer,
      noActions,
      showCurrent
    } = this.props;
    const { from, to, step, minDate, maxDate } = this.state;
    const isOpen = step !== PickerStep.NONE;

    return (
      <RangePickerInputer
        disabled={disabled}
        isError={isError}
        onLeftFocus={this.onLeftFocus}
        onRightFocus={this.onRightFocus}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onValidUpdate={this.onValidUpdate}
        onLeftClear={this.onLeftClear}
        onRightClear={this.onRightClear}
        from={from}
        to={to}
        name={name}
        inline={inline}
        theme={theme}
        onRef={inputer => (this.inputer = inputer)}
        mainRef={el => (this.main = el)}
        savePlaceholder={savePlaceholder}
        leftPlaceholder={leftPlaceholder}
        rightPlaceholder={rightPlaceholder}
        monthView={monthView}
        format={format}
        isOpen={isOpen}
        minDate={minDate}
        maxDate={maxDate}
      >
        <PanelWrap
          innerRef={this.onPanelRef}
          positionX={step === PickerStep.LEFT ? "right" : "left"}
          positionY={positionY}
          visible={isOpen}
          theme={theme}
        >
          {isOpen && showPointer && <OptionsPointer theme={theme} />}
          <RangePickerPanel
            showPointer={showPointer}
            from={from}
            noActions={noActions}
            to={to}
            theme={theme}
            monthView={monthView}
            onReset={this.onClear}
            onAccept={this.onAccept}
            onLeftSelect={this.onLeftSelect}
            onRightSelect={this.onRightSelect}
            step={step}
            acceptText={acceptText}
            resetText={resetText}
            onBlur={this.onBlur}
            minDate={minDate}
            maxDate={maxDate}
            showCurrent={showCurrent}
          />
        </PanelWrap>
      </RangePickerInputer>
    );
  }
}

export default withTheme(RangePicker);

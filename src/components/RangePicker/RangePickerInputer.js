import React, { Component } from "react";
import PropTypes from "prop-types";
import { getValidMomentFromISOStringOrNull } from "../../utils";
import Inputmask from "inputmask";

import InputWrap from "../../styled/InputWrap";
import HalfInputWrap from "../../styled/HalfInputWrap";
import InputContentWrap from "../../styled/InputContentWrap";
import InputElem from "../../styled/InputElem";
import BetweenDates from "../../styled/BetweenDates";
import Placeholder from "../../styled/Placeholder";
import InputerIcon from "../InputerIcon";
import "datejs";
import FlexWrap from "../../styled/FlexWrap";

export class RangePickerInputer extends Component {
  static propTypes = {
    inline: PropTypes.bool,
    onLeftFocus: PropTypes.func.isRequired,
    onRightFocus: PropTypes.func.isRequired
  };

  static defaultProps = {
    inline: false
  };

  fromInput;
  toInput;
  fromMask;
  toMask;
  mask;
  im;

  constructor(props) {
    super(props);

    this.state = {
      editingFromValue: null,
      editingToValue: null,
      isLeftFocused: !!this.props.from,
      isRightFocused: !!this.props.to,
      firstFocused: false
    };

    if (!this.props.monthView) {
      const mask = this.props.format
        ? this.props.format.replace(/\w/g, "9")
        : "9999.99.99";

      this.mask = mask;
      this.im = new Inputmask(this.mask);
    }
  }

  static getDerivedStateFromProps(props, state) {

    if (!state.isRightFocused && !state.isLeftFocused && props.from && props.to) {
      return {
        isLeftFocused: true,
        isRightFocused: true
      };
    }

    if (!state.isRightFocused && !state.isLeftFocused && props.from) {
      return {
        isLeftFocused: true
      };
    }

    if (!state.isRightFocused && !state.isLeftFocused && props.to) {
      return {
        isRightFocused: true
      };
    }

    if (!props.from && !props.to && !props.isOpen) {
      return {
        isLeftFocused: false,
        isRightFocused: false,
      };
    }

    return null;
  }

  componentDidMount() {
    if (this.toInput && !this.props.monthView)
      this.toMask = this.im.mask(this.toInput);
    if (this.fromInput && !this.props.monthView)
      this.fromMask = this.im.mask(this.fromInput);
    if (this.props.onRef) this.props.onRef(this);
  }

  onFromInputChange = e => {
    const {
      monthView,
      format,
      onValidUpdate,
      from,
      to,
      minDate,
      maxDate
    } = this.props;

    if (monthView) {
      this.setState({ isFocused: true });
      return;
    }

    this.setState({
      editingFromValue: e.target.value
    });

    let newDate = getValidMomentFromISOStringOrNull(e.target.value, format);
    if (minDate && newDate < minDate) newDate = minDate;
    if (maxDate && newDate > maxDate) newDate = maxDate;

    if (newDate && to && newDate.isAfter(to, "day")) {
      newDate = null;

      this.setState({ editingFromValue: "" });
    }

    if (newDate !== from || (newDate && !newDate.isSame(from, "day"))) {
      onValidUpdate({ from: newDate });
    }

    if (newDate) {
      if (this.fromMask.isComplete()) {
        this.toInput.focus();
      }

      this.setState({ isFocused: true });
    }
  };

  onToInputChange = e => {
    const {
      monthView,
      format,
      onValidUpdate,
      from,
      to,
      minDate,
      maxDate
    } = this.props;

    if (monthView) {
      this.setState({ isFocused: true });
      return;
    }

    this.setState({
      editingToValue: e.target.value
    });

    let newDate = getValidMomentFromISOStringOrNull(e.target.value, format);
    if (minDate && newDate < minDate) newDate = minDate;
    if (maxDate && newDate > maxDate) newDate = maxDate;

    if (newDate && from) {
      if (e.target.value.indexOf("_") === -1 && newDate.isBefore(from)) {
        newDate = null;
        this.setState({ editingToValue: "" });
      }
    }

    if (newDate !== to || (newDate && !newDate.isSame(to, "day"))) {
      onValidUpdate({ to: newDate });
    }

    this.setState(oldState => ({
      isFocused: !!newDate || oldState.isFocused
    }));
  };

  getFromInputValue = () => {
    const { monthView, format, from } = this.props;
    const { editingFromValue } = this.state;

    if (editingFromValue !== null) return editingFromValue;

    const preparedFormat = monthView ? "MM.YYYY" : format || "YYYY.MM.DD";

    return from ? from.format(preparedFormat) : "";
  };

  getToInputValue = () => {
    const { monthView, format, to } = this.props;
    const { editingToValue } = this.state;

    if (editingToValue !== null) return editingToValue;

    const preparedFormat = monthView ? "MM.YYYY" : format || "YYYY.MM.DD";

    return to ? to.format(preparedFormat) : "";
  };

  onFocus = () => {
    this.setState({ isFocused: true });
  };

  onLeftFocus = () => {
    const { onLeftFocus } = this.props;

    this.setState({ firstFocused: false, isLeftFocused: true }, () => {
      this.onFocus();
      onLeftFocus();
    });
  };

  onRightFocus = () => {
    const { from, onRightFocus } = this.props;
    const { firstFocused } = this.state;

    this.setState({isRightFocused: true});

    if (from === null && firstFocused) {
      this.focusLeft();
      this.onLeftFocus();
    } else {
      this.onFocus();
      onRightFocus();
    }
  };

  focusRight = () => {
    setTimeout(() => this.toInput.focus(), 0);
  };

  focusLeft = () => {
    setTimeout(() => this.fromInput.focus(), 0);
  };

  onFromInputBlur = () => {
    const { from } = this.props;

    this.setState({ editingFromValue: null });
    if (!from) this.setState({ isLeftFocused: false });
  };

  onToInputBlur = () => {
    const { to } = this.props;

    this.setState({ editingToValue: null });
    if (!to) this.setState({ isRightFocused: false });
  };

  onLeftClear = e => {
    const { onLeftClear } = this.props;
    this.setState({ isLeftFocused: false });
    onLeftClear(e);
  };

  onRightClear = e => {
    const { onRightClear } = this.props;
    this.setState({ isRightFocused: false });
    onRightClear(e);
  };

  isDividerVisible = () => {
    const { from, to } = this.props;

    return (
      (from && to) ||
      (from && this.toInput === document.activeElement) ||
      (to && this.fromInput === document.activeElement)
    );
  };

  onKeyFromDown = e => {
    if (e.which === 39 || (this.props.from && e.which !== 37)) {
      if (e.target.selectionEnd === 10) {
        this.toInput.focus();
        if (e.which === 39)
          setTimeout(() => this.toInput.setSelectionRange(0, 0), 0);
      }
    }
  };

  onKeyToDown = e => {
    if (e.which === 8 || e.which === 37) {
      if (e.target.selectionEnd === 0) {
        this.fromInput.focus();
        setTimeout(() => this.fromInput.setSelectionRange(10, 10), 0);
      }
    }
  };

  render() {
    const {
      theme,
      inline,
      name,
      disabled,
      isError,
      onFocus,
      onBlur,
      onMouseDown,
      placeholder,
      leftPlaceholder,
      rightPlaceholder,
      savePlaceholder,
      monthView,
      children,
      onLeftFocus,
      onRightFocus,
      mainRef
    } = this.props;

    const { isLeftFocused, isRightFocused } = this.state;

    return (
      <FlexWrap innerRef={el => mainRef(el)} onBlur={onBlur}>
        <HalfInputWrap leftPanel theme={theme}>
          <InputContentWrap
            theme={theme}
            disabled={disabled}
            isError={isError}
          >
            <Placeholder
              focused={isLeftFocused}
              disabled={disabled}
              isError={isError}
              theme={theme}
              isSaved={savePlaceholder}
            >
              {leftPlaceholder || "От"}
            </Placeholder>

            <FlexWrap>
              <InputElem
                centered={!savePlaceholder}
                disabled={disabled}
                onFocus={this.onLeftFocus}
                onChange={this.onFromInputChange}
                onKeyDown={this.onKeyFromDown}
                value={this.getFromInputValue()}
                onBlur={this.onFromInputBlur}
                innerRef={el => (this.fromInput = el)}
                name={name}
                width="85px"
                noCaret={monthView}
                theme={theme}
                component="DatePicker"
              /></FlexWrap>

              <InputerIcon
                isFocused={isLeftFocused}
                disabled={disabled}
                onClear={this.onLeftClear}
              />

          </InputContentWrap>
        </HalfInputWrap>
        <HalfInputWrap theme={theme}>
          <InputContentWrap
            theme={theme}
            disabled={disabled}
            isError={isError}
          >
            <Placeholder
              focused={isRightFocused}
              disabled={disabled}
              isError={isError}
              theme={theme}
              isSaved={savePlaceholder}
            >
              {leftPlaceholder || "До"}
            </Placeholder>

            <FlexWrap>
              <InputElem
                centered={!savePlaceholder}
                disabled={disabled}
                onFocus={this.onRightFocus}
                onChange={this.onToInputChange}
                onKeyDown={this.onKeyToDown}
                value={this.getToInputValue()}
                onBlur={this.onToInputBlur}
                innerRef={el => (this.toInput = el)}
                name={name}
                width="85px"
                noCaret={monthView}
                theme={theme}
                component="DatePicker"
              /></FlexWrap>

            <InputerIcon
              isFocused={isRightFocused}
              disabled={disabled}
              onClear={this.onRightClear}
            />

          </InputContentWrap>

        </HalfInputWrap>
        {children}
      </FlexWrap>
    );
  }
}

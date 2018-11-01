import React, { Component } from "react";
import PropTypes from "prop-types";
import { getValidMomentFromISOStringOrNull } from "../../utils";
import Inputmask from "inputmask";

import InputWrap from "../../styled/InputWrap";
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
  };

  static defaultProps = {
    inline: false,
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
      isFocused: !!this.props.from || !!this.props.to
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
    if (!state.isFocused && (props.from || props.to)) {
      return {
        isFocused: true,
      };
    }

    if (!props.from && !props.to && !props.isOpen) {
      return {
        isFocused: false,
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

  onFromInputChange = (e) => {
    const { monthView, format, onValidUpdate, from, to } = this.props;

    if (monthView) {
      this.setState({ isFocused: true });
      return;
    }

    this.setState({
      editingFromValue: e.target.value
    });

    let newDate = getValidMomentFromISOStringOrNull(e.target.value, format);

    if (newDate && to && newDate.isAfter(to, "day")) {
      newDate = null;

      this.setState({ editingFromValue: "" });
    }

    if (newDate !== from || (newDate && !newDate.isSame(from, 'day'))) {
      onValidUpdate({ from: newDate });
    }

    if (newDate) {
      if (this.fromMask.isComplete()) {
        this.toInput.focus();
      }

      this.setState({ isFocused: true });
    }
  };

  onToInputChange = (e) => {
    const { monthView, format, onValidUpdate, from, to } = this.props;

    if (monthView) {
      this.setState({ isFocused: true });
      return;
    }

    this.setState({
      editingToValue: e.target.value
    });

    let newDate = getValidMomentFromISOStringOrNull(e.target.value, format);

    if (newDate && from) {
      if (e.target.value.indexOf("_") === -1 && newDate.isBefore(from)) {
        newDate = null;
        this.setState({ editingToValue: "" });
      }
    }

    if (newDate !== to || (newDate && !newDate.isSame(to, 'day'))) {
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

    const preparedFormat = monthView
      ? "MM.YYYY"
      : (format || "YYYY.MM.DD");

    return from
      ? from.format(preparedFormat)
      : "";
  };

  getToInputValue = () => {
    const { monthView, format, to } = this.props;
    const { editingToValue } = this.state;

    if (editingToValue !== null) return editingToValue;

    const preparedFormat = monthView
      ? "MM.YYYY"
      : format || "YYYY.MM.DD";

    return to
      ? to.format(preparedFormat)
      : "";
  };

  onFocus = () => {
    this.setState({ isFocused: true });
  };

  onLeftFocus = () => {
    this.onFocus();
    this.props.onLeftFocus();
  };

  onRightFocus = () => {
    this.onFocus();
    this.props.onRightFocus();
  };

  focusRight = () => {
    setTimeout(() => this.toInput.focus(), 0);
  };

  focusLeft = () => {
    setTimeout(() => this.fromInput.focus(), 0);
  };

  onFromInputBlur = () => {
    const { from, to } = this.props;

    this.setState({ editingFromValue: null });
    if (!from && !to) this.setState({ isFocused: false });
  };

  onToInputBlur = () => {
    const { from, to } = this.props;

    this.setState({ editingToValue: null });
    if (!from && !to) this.setState({ isFocused: false });
  };

  onClear = (e) => {
    const { onClear } = this.props;
    this.setState({ isFocused: false });
    onClear(e);
  };

  isDividerVisible = () => {
    const { from, to } = this.props;

    return (
      (from && to) ||
      (from && this.toInput === document.activeElement) ||
      (to && this.fromInput === document.activeElement)
    );
  };

  onKeyFromDown = (e) => {
    if (e.which === 39 || (this.props.from && e.which !== 37)) {
      if (e.target.selectionEnd === 10) {
        this.toInput.focus();
        if (e.which === 39)
          setTimeout(() => this.toInput.setSelectionRange(0, 0), 0);
      }
    }
  };

  onKeyToDown = (e) => {
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
      savePlaceholder,
      monthView,
      children,
      mainRef,
    } = this.props;

    const { isFocused } = this.state;

    return (
      <InputWrap
        inline={inline}
        disabled={disabled}
        isError={isError}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onMouseDown}
        theme={theme}
        component="DatePicker"
      >
        <InputContentWrap
          innerRef={el => mainRef(el)}
          theme={theme}
          disabled={disabled}
          isError={isError}
        >
          <Placeholder
            focused={isFocused}
            disabled={disabled}
            isError={isError}
            theme={theme}
            isSaved={savePlaceholder}
          >
            {placeholder || "Дата"}
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
            />

            <BetweenDates
              theme={theme}
              visible={this.isDividerVisible()}
              centered={!savePlaceholder}
            >
              -
            </BetweenDates>

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
            />
          </FlexWrap>

          <InputerIcon
            isFocused={isFocused}
            disabled={disabled}
            onClear={this.onClear}
          />
        </InputContentWrap>
        {children}
      </InputWrap>
    );
  }
}

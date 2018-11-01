import React, { Component } from "react";
import PropTypes from 'prop-types';
import { getValidMomentFromISOStringOrNull } from "../../utils";
import Inputmask from "inputmask";

import InputWrap from "../../styled/InputWrap";
import InputContentWrap from "../../styled/InputContentWrap";
import InputElem from "../../styled/InputElem";
import Placeholder from "../../styled/Placeholder";

import { CalendarIcon, CrossIcon } from "../../svg";
import InputerIcon from "../InputerIcon";

export class DatePickerInputer extends Component {
  static propTypes = {
    inline: PropTypes.bool,
  };

  static defaultProps = {
    inline: false,
  };

  dateInput;
  dateMask;
  mask;
  im;

  constructor(props) {
    super(props);

    this.state = {
      editingValue: null,
      isFocused: !!this.props.date
    };

    if (!this.props.monthView) {
      const mask = this.props.format
        ? this.props.format.replace(/\w/g, '9')
        : "9999.99.99";

      this.mask = mask;
      this.im = new Inputmask(this.mask);
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.isFocused && props.date) {
      return {
        isFocused: true,
      };
    }

    return null;
  }

  componentDidMount() {
    if (this.dateInput && !this.props.monthView) this.dateMask = this.im.mask(this.dateInput);
  }

  onChange = (e) => {
    if (this.props.monthView) {
      this.setState({
        isFocused: true
      });
      return;
    }

    this.setState({
      editingValue: e.target.value
    });

    let date = getValidMomentFromISOStringOrNull(e.target.value, this.props.format);

    this.setState({ date });

    if (
      date !== this.props.date ||
      (date && !date.isSame(this.props.date, "day"))
    ) {
      this.props.onValidUpdate({
        date
      });
    }
  };

  getValue = () => {
    if (this.state.editingValue !== null) return this.state.editingValue;
    const format = this.props.monthView
      ? "MMMM YYYY"
      : (this.props.format || "YYYY.MM.DD");

    return this.props.date
      ? this.props.date.format(format)
      : "";
  };

  onFocus = () => {
    this.setState({
      isFocused: true
    });
  };

  onBlur = (e) => {
    this.setState({
      editingValue: null
    });

    if (!this.props.date) {
      this.setState({
        isFocused: false
      });
    }
  };

  onClear = (e) => {
    const { onClear } = this.props;
    this.setState({ isFocused: false });
    onClear(e);
  }

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
    } = this.props;

    const {
      isFocused,
    } = this.state;

    return (
      <InputWrap
        inline={inline}
        disabled={disabled}
        isError={isError}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        theme={theme}
        component="DatePicker"
      >
        <InputContentWrap
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

          <InputElem
            centered={!savePlaceholder}
            disabled={disabled}
            onFocus={this.onFocus}
            onChange={this.onChange}
            value={this.getValue()}
            onBlur={this.onBlur}
            innerRef={el => (this.dateInput = el)}
            name={name}
            noCaret={monthView}
            theme={theme}
            component="DatePicker"
          />

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

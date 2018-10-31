import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withTheme} from 'styled-components';
import { RangePickerPanel } from './RangePickerPanel';
import { RangePickerInputer } from './RangePickerInputer';
import 'datejs';
import moment from 'moment';
import defaultTheme from '../../theme/defaultTheme';
import Placeholder from "../../styled/Placeholder";
import OptionsPointer from "../../styled/OptionsPointer";
import { DatePickerInputer } from "../DatePicker/DatePickerInputer";
import { DatePickerPanel } from "../DatePicker/DatePickerPanel";
import PanelWrap from "../../styled/PanelWrap";

moment.locale('ru');

class RangePicker extends Component {
  blurTimeout;
  im;
  main;
  inputer;
  open;

  constructor(props) {
    super(props);
    const start = this.props.from
      ? moment(this.props.from, this.props.format)
      : moment();

    const end = this.props.to
      ? moment(this.props.to, this.props.format)
      : moment(start);

    this.state = {
      isLeftOpen: false,
      isRightOpen: false,
      from: this.props.from ? moment(start) : null,
      to: this.props.to ? moment(end) : null,
      initialFrom: this.props.from,
      initialTo: this.props.to,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.from !== state.initialFrom || props.to !== state.initialTo) {
      return {
        from: props.from ? moment(props.from, props.format) : null,
        to: props.to ? moment(props.to, props.format) : null,
        initialFrom: props.from,
        initialTo: props.to,
      }
    }

    return null;
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
    document.addEventListener('mousedown', this.handleClick, true);
  }

  componentWillUnmount() {
    this.props.onRef && this.props.onRef(undefined);
    document.removeEventListener('mousedown', this.handleClick, true);
  }

  handleClick = (e) => {
    if (this.main.contains(e.target)) {
      return;
    }

    this.setState({
      isLeftOpen: false,
      isRightOpen: false
    });

    if (this.open) {
      this.open = false;
      this.props.onTogglePanel(false);
    }
  };

  onClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      from: null,
      to: null
    });

    this.props.onUpdate && this.props.onUpdate({ from: null, to: null });
    this.props.onChange && this.props.onChange({ from: null, to: null });
  };

  onValidUpdate = (state) => {
    this.setState(state);
    this.props.onChange({ ...this.state, ...state });
    this.props.onUpdate({ ...this.state, ...state });
  };

  onLeftFocus = (e) => {
    this.setState({
      isLeftOpen: true,
      isRightOpen: false
    });

    if (!this.open) {
      this.open = true;
      this.props.onTogglePanel(true);
    }

    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  };

  onRightFocus = (e) => {
    this.setState({
      isRightOpen: true,
      isLeftOpen: false
    });

    if (!this.open) {
      this.open = true;
      this.props.onTogglePanel(true);
    }

    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  };

  onBlur = (e) => {
    this.blurTimeout = setTimeout(() => {
      this.setState({
        isOpen: false
      });

      this.props.onUpdate({ to: this.state.to, from: this.state.from });
    }, 200);
  };

  select = (from, to, close) => {
    const isOpen = !(from && to);
    this.setState({ from, to, isOpen });
    this.props.onChange({ from, to });
    if (close) {
      this.setState({
        isLeftOpen: false,
        isRightOpen: false
      });

      if (this.open) {
        this.open = false;
        this.props.onTogglePanel(false);
      }
    }
  };

  reset = () => {
    const from = null;
    const to = null;
    this.setState({ from, to });
    this.props.onChange({ from, to });
    this.inputer.focusLeft();
  };

  onMouseDown = (e) => {
    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  };

  onLeftSelected = () => {
    this.setState({
      isLeftOpen: false,
      isRightOpen: true
    });

    if (!this.open) {
      this.open = true;
      this.props.onTogglePanel(true);
    }

    this.inputer.focusRight();
  };

  onRightSelected = () => {
    this.setState({
      isLeftOpen: false,
      isRightOpen: false
    });

    if (this.open) {
      this.open = false;
      this.props.onTogglePanel(false);
    }
  };

  onPanelRef = (extRef) => { this.optionsPanel = extRef; };

  render() {
    const name = this.props.name;
    const { showPointer, theme } = this.props;
    const { isLeftOpen, isRightOpen } = this.state;

    return (
      <RangePickerInputer
        inline={this.props.inline}
        disabled={this.props.disabled}
        isError={this.props.isError}
        onLeftFocus={this.onLeftFocus}
        onRightFocus={this.onRightFocus}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onValidUpdate={this.onValidUpdate}
        onRef={inputer => this.inputer = inputer}
        from={this.state.from}
        to={this.state.to}
        name={name}
        mainRef={el => this.main = el}
        theme={theme}
        placeholder={this.props.placeholder}
        savePlaceholder={this.props.savePlaceholder}
        monthView={this.props.monthView}
        format={this.props.format}
        onClear={this.onClear}
      >
        <PanelWrap
          innerRef={this.onPanelRef}
          positionX={this.props.positionX}
          positionY={this.props.positionY}
          visible={this.state.isLeftOpen || this.state.isRightOpen}
        >
          {(isLeftOpen || isRightOpen) && showPointer && (
            <OptionsPointer theme={theme} />
          )}
          <RangePickerPanel
            showPointer={showPointer}
            onLeftSelected={this.onLeftSelected}
            onRightSelected={this.onRightSelected}
            from={this.state.from}
            to={this.state.to}
            isLeftOpen={this.state.isLeftOpen}
            isRightOpen={this.state.isRightOpen}
            theme={theme}
            monthView={this.props.monthView}
            reset={this.reset}
            accept={this.select}
            acceptText={this.props.acceptText}
            resetText={this.props.resetText}
          />
        </PanelWrap>
      </RangePickerInputer>
    );
  }
}

RangePicker.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.object,
  disabled: PropTypes.bool,
  isError: PropTypes.bool,
  from: PropTypes.string,
  to: PropTypes.string,
  onChange: PropTypes.func,
  onUpdate: PropTypes.func,
  monthView: PropTypes.bool,
  positionalX: PropTypes.string,
  positionalY: PropTypes.string,
  format: PropTypes.string,
  acceptText: PropTypes.string,
  resetText: PropTypes.string,
  onTogglePanel: PropTypes.func,
};

RangePicker.defaultProps = {
  disabled: false,
  isError: false,
  theme: defaultTheme,
  from: null,
  to: null,
  positionX: '',
  positionY: '',
  onChange: val => null,
  onUpdate: val => null,
  format: null,
  acceptText: "Accept",
  resetText: "Reset",
  onTogglePanel: () => {},
};

RangePicker.displayName = 'RangePicker';

export default withTheme(RangePicker);

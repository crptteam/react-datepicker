import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withTheme} from 'styled-components';
import { RangePickerPanel } from './RangePickerPanel';
import { RangePickerInputer } from './RangePickerInputer';
import 'datejs';
import moment from 'moment';
import defaultTheme from '../../theme/defaultTheme';
import Placeholder from "../../styled/Placeholder";

moment.locale('ru');

class RangePicker extends Component {
  blurTimeout;
  im;
  main;
  inputer;

  constructor(props) {
    super(props);
    const start = this.props.from
      ? moment(this.props.from, this.props.format)
      : moment();

    const end = this.props.to
      ? moment(this.props.to, this.props.format)
      : moment(start).add(1, 'month');

    this.state = {
      isLeftOpen: false,
      isRightOpen: false,
      from: this.props.from ? moment(start) : null,
      to: this.props.to ? moment(end) : null
    };

    this.onRightFocus = this.onRightFocus.bind(this);
    this.onLeftFocus = this.onLeftFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.select = this.select.bind(this);
    this.onValidUpdate = this.onValidUpdate.bind(this);
    this.reset = this.reset.bind(this);
    this.onLeftSelected = this.onLeftSelected.bind(this);
    this.onRightSelected = this.onRightSelected.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
    document.addEventListener('mousedown', this.handleClick, true);
  }

  componentWillUnmount() {
    this.props.onRef && this.props.onRef(undefined);
    document.removeEventListener('mousedown', this.handleClick, true);

  }

  handleClick(e) {
    if (this.main.contains(e.target)) {
      return;
    }

    this.setState({
      isLeftOpen: false,
      isRightOpen: false
    });
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

  onLeftFocus(e) {

    this.setState({
      isLeftOpen: true,
      isRightOpen: false
    });

    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  onRightFocus(e) {
    this.setState({
      isRightOpen: true,
      isLeftOpen: false
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

  select(from, to, close) {
    const isOpen = !(from && to);
    this.setState({ from, to, isOpen });
    this.props.onChange({ from, to });
    if (close) {
      this.setState({
        isLeftOpen: false,
        isRightOpen: false
      });
    }
  }

  reset() {
    const from = null;
    const to = null;
    this.setState({ from, to });
    this.props.onChange({ from, to });
    this.inputer.focusLeft();
  }

  onMouseDown(e) {
    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  onLeftSelected() {
    this.setState({
      isLeftOpen: false,
      isRightOpen: true
    });

    console.log('onLeftSelected', this.inputer);
    this.inputer.focusRight();
  }

  onRightSelected() {
    this.setState({
      isLeftOpen: false,
      isRightOpen: false
    });
  }

  render() {
    const name = this.props.name;

    return (
      <RangePickerInputer
        inline={this.props.inline}
        disabled={this.props.disabled}
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
        theme={this.props.theme}
        placeholder={this.props.placeholder}
        savePlaceholder={this.props.savePlaceholder}
        monthView={this.props.monthView}
        format={this.props.format}
      >
        <RangePickerPanel
          onLeftSelected={this.onLeftSelected}
          onRightSelected={this.onRightSelected}
          from={this.state.from}
          to={this.state.to}
          isLeftOpen={this.state.isLeftOpen}
          isRightOpen={this.state.isRightOpen}
          theme={this.props.theme}
          monthView={this.props.monthView}
          positionX={this.props.positionX}
          positionY={this.props.positionY}
          reset={this.reset}
          accept={this.select}
          controls={this.props.controls}
          acceptText={this.props.acceptText}
          resetText={this.props.resetText}
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
  monthView: PropTypes.bool,
  positionalX: PropTypes.string,
  positionalY: PropTypes.string,
  format: PropTypes.string,
  controls: PropTypes.bool,
  acceptText: PropTypes.string,
  resetText: PropTypes.string,
};

RangePicker.defaultProps = {
  disabled: false,
  theme: defaultTheme,
  from: null,
  to: null,
  positionX: '',
  positionY: '',
  onChange: val => null,
  onUpdate: val => null,
  format: null,
  controls: false,
  acceptText: "Accept",
  resetText: "Reset",
};

RangePicker.displayName = 'RangePicker';

export default withTheme(RangePicker);

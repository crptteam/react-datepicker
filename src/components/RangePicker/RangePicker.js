import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withTheme} from 'styled-components';
import { RangePickerPanel } from './RangePickerPanel';
import { RangePickerInputer } from './RangePickerInputer';
import 'datejs';
import moment from 'moment';
import defaultTheme from '../../theme/defaultTheme';
import OptionsPointer from "../../styled/OptionsPointer";
import PanelWrap from "../../styled/PanelWrap";

moment.locale('ru');

export const PickerStep = {
  NONE: 0,
  LEFT: 1,
  RIGHT: 2,
};

class RangePicker extends Component {
  static displayName = 'RangePicker';

  static propTypes = {
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
    positionX: '',
    positionY: '',
    format: null,
    acceptText: "Применить",
    resetText: "Сбросить",
    showPointer: false,
  };

  blurTimeout;
  im;
  main;
  inputer;
  open;
  optionsPanel;

  constructor(props) {
    super(props);
    const start = this.props.from
      ? moment(this.props.from, this.props.format)
      : moment();

    const end = this.props.to
      ? moment(this.props.to, this.props.format)
      : moment(start);

    this.state = {
      step: PickerStep.NONE,
      from: this.props.from ? moment(start) : null,
      to: this.props.to ? moment(end) : null,
      initialFrom: this.props.from,
      initialTo: this.props.to,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.from !== state.initialFrom || props.to !== state.initialTo) {
      const fromDate = props.from
        ? moment(props.from, props.format)
        : null;

      const toDate = props.to
        ? moment(props.to, props.format)
        : null;


      const { onUpdate, onChange } = props;
      onUpdate({ from: fromDate, to: toDate });
      onChange({ from: fromDate, to: toDate });

      return {
        from: fromDate,
        to: toDate,
        initialFrom: props.from,
        initialTo: props.to,
      }
    }

    return null;
  }

  componentDidMount() {
    const { onRef } = this.props;
    onRef(this);
    document.addEventListener('mousedown', this.handleClick, true);
  }

  componentWillUnmount() {
    const { onRef } = this.props;
    onRef(undefined);
    document.removeEventListener('mousedown', this.handleClick, true);
    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  componentDidUpdate(prevProps, prevState) {
    const { onTogglePanel } = this.props;
    const { step } = this.state;
    if (prevState.step !== step) {
      if (step === PickerStep.NONE) onTogglePanel(false);
      else onTogglePanel(true);
    }
  }

  handleClick = (e) => {
    if (this.optionsPanel.contains(e.target)) {
      e.preventDefault();
      return;
    }
  };

  onClear = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.clear();

    if (step === PickerStep.RIGHT) {
      this.inputer.focusLeft();
    }
  };

  clear = () => {
    const { onUpdate, onChange } = this.props;
    const { step } = this.state;
    this.setState({ from: null, to: null });

    onUpdate({ from: null, to: null });
    onChange({ from: null, to: null });
  };

  onAccept = () => {
    this.setState({ step: PickerStep.NONE });
  };

  onLeftSelect = (date) => {
    const { onChange, onUpdate } = this.props;
    const { to } = this.state;

    this.setState({ from: date, step: PickerStep.RIGHT });
    onChange({ from: date, to });
    onUpdate({ from: date, to });
    this.inputer.focusRight();
  };

  onRightSelect = (date) => {
    const { onChange, onUpdate } = this.props;
    const { from } = this.state;

    this.setState({ to: date });
    onChange({ from, to: date });
    onUpdate({ from, to: date });
  };

  onValidUpdate = (state) => {
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
    const { from, to, step } = this.state;
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
        onClear={this.onClear}
        from={from}
        to={to}
        name={name}
        inline={inline}
        theme={theme}
        onRef={inputer => this.inputer = inputer}
        mainRef={el => this.main = el}
        placeholder={placeholder}
        savePlaceholder={savePlaceholder}
        monthView={monthView}
        format={format}
        isOpen={isOpen}
      >
        <PanelWrap
          innerRef={this.onPanelRef}
          positionX={positionX}
          positionY={positionY}
          visible={isOpen}
        >
          {isOpen && showPointer && (<OptionsPointer theme={theme} />)}
          <RangePickerPanel
            showPointer={showPointer}
            from={from}
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
          />
        </PanelWrap>
      </RangePickerInputer>
    );
  }
}


export default withTheme(RangePicker);

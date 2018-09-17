import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withTheme} from 'styled-components';
import { RangePickerPanel } from './RangePickerPanel';
import { RangePickerInputer } from './RangePickerInputer';
import 'datejs';
import moment from 'moment';
import defaultTheme from '../../theme/defaultTheme';

moment.locale('ru');

class RangePicker extends Component {
  blurTimeout;
  im;

  constructor(props) {
    super(props);
    const start = this.props.from
      ? moment(this.props.from, this.props.format)
      : moment();

    const end = this.props.to
      ? moment(this.props.to, this.props.format)
      : moment(start).add(1, 'month');

    this.state = {
      isOpen: false,
      from: this.props.from ? moment(start) : null,
      to: this.props.to ? moment(end) : null
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

  onFocus(e) {
    this.setState({
      isOpen: true
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

  select(from, to) {
    const isOpen = !(from && to);
    this.setState({ from, to, isOpen });
    this.props.onChange({ from, to });
  }

  reset() {
    const from = this.props.from
      ? moment(this.props.from, this.props.format)
      : moment();

    const to = this.props.to
      ? moment(this.props.to, this.props.format)
      : moment(start).add(1, 'month');

    this.setState({ from, to });
  }

  onMouseDown(e) {
    if (this.blurTimeout) clearTimeout(this.blurTimeout);
  }

  render() {
    const name = this.props.name;

    return (
      <RangePickerInputer
        inline={this.props.inline}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onValidUpdate={this.onValidUpdate}
        from={this.state.from}
        to={this.state.to}
        name={name}
        theme={this.props.theme}
        placeholder={this.props.placeholder}
        savePlaceholder={this.props.savePlaceholder}
        format={this.props.format}
      >
        <RangePickerPanel
          from={this.state.from}
          to={this.state.to}
          visible={this.state.isOpen}
          theme={this.props.theme}
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

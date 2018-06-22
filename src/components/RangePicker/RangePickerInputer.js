import React, { Component } from 'react';
import { getValidMomentFromISOStringOrNull } from '../../utils';
import Inputmask from 'inputmask';

import InputWrap from '../../styled/InputWrap';
import InputContentWrap from '../../styled/InputContentWrap';
import InputElem from '../../styled/InputElem';
import BetweenDates from '../../styled/BetweenDates';
import IconWrap from '../../styled/IconWrap';
import Placeholder from '../../styled/Placeholder';
import 'datejs';

import { CalendarIcon } from '../../svg';

export class RangePickerInputer extends Component {
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

    this.onFromInputChange = this.onFromInputChange.bind(this);
    this.onToInputChange = this.onToInputChange.bind(this);
    this.onKeyFromDown = this.onKeyFromDown.bind(this);
    this.onKeyToDown = this.onKeyToDown.bind(this);
    this.onFromInputBlur = this.onFromInputBlur.bind(this);
    this.onToInputBlur = this.onToInputBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);

    this.mask = '9999.99.99';
    this.im = new Inputmask(this.mask);
  }

  componentDidMount() {
    this.toMask = this.im.mask(this.toInput);
    this.fromMask = this.im.mask(this.fromInput);
  }

  isDividerVisible() {
    return (
      (this.props.from && this.props.to) ||
      (this.props.from && this.toInput === document.activeElement) ||
      (this.props.to && this.fromInput === document.activeElement)
    );
  }

  onFromInputChange(e) {
    this.setState({
      editingFromValue: e.target.value
    });

    let from = getValidMomentFromISOStringOrNull(Date.parse(e.target.value));

    if (from && this.props.to && from.isAfter(this.props.to, 'day')) {
      from = null;

      this.setState({
        editingFromValue: ''
      });
    }

    this.props.onValidUpdate({
      from
    });

    if (from) {
      if (this.fromMask.isComplete()) {
        this.toInput.focus();
      }

      this.setState({
        isFocused: true
      })
    }
  }

  onToInputChange(e) {
    this.setState({
      editingToValue: e.target.value
    });

    let to = getValidMomentFromISOStringOrNull(Date.parse(e.target.value));

    if (to && this.props.from && to.isBefore(this.props.from, 'day')) {
      to = null;
      this.setState({
        editingToValue: ''
      });
    }

    this.props.onValidUpdate({
      to
    });

    this.setState(oldState => ({
      isFocused: !!to || oldState.isFocused
    }));
  }

  onKeyFromDown(e) {
    if (e.which === 39 || (this.props.from && e.which !== 37)) {
      if (e.target.selectionEnd === 9 || e.target.selectionEnd === 10) {
        this.toInput.focus();
        if (e.which === 39)
          setTimeout(() => this.toInput.setSelectionRange(0, 0), 0);
      }
    }
  }

  onKeyToDown(e) {
    if (e.which === 8 || e.which === 37) {
      if (e.target.selectionEnd === 0) {
        this.fromInput.focus();
        setTimeout(() => this.fromInput.setSelectionRange(10, 10), 0);
      }
    }
  }

  getFromInputValue() {
    if (this.state.editingFromValue !== null)
      return this.state.editingFromValue;

    return this.props.from ? this.props.from.format('YYYY.MM.DD') : '';
  }

  onFromInputBlur(e) {
    this.setState({
      editingFromValue: null
    });

    if (!this.props.from && !this.props.to) {
      this.setState({
        isFocused: false
      });
    }
  }

  onToInputBlur(e) {
    this.setState({
      editingToValue: null
    });

    if (!this.props.from && !this.props.to) {
      this.setState({
        isFocused: false
      });
    }
  }

  onFocus(e) {
    this.setState({
      isFocused: true
    })
  }

  getToInputValue() {
    if (this.state.editingToValue !== null) return this.state.editingToValue;

    return this.props.to ? this.props.to.format('YYYY.MM.DD') : '';
  }

  render() {
    const name = this.props.name;

    return (
      <InputWrap
        inline={this.props.inline === false ? this.props.inline : true}
        width={"256px"}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        onMouseDown={this.props.onMouseDown}
        theme={this.props.theme}
        component="DatePicker"
      >
        <InputContentWrap>
          <Placeholder
            focused={this.state.isFocused}
            disabled={this.props.disabled}
            isError={this.props.isError}
            theme={this.props.theme}
            isSaved={this.props.savePlaceholder}
          >
            {this.props.placeholder || "Дата"}
          </Placeholder>

          <InputElem
            centered={!this.props.savePlaceholder}
            onFocus={this.onFocus}
            onChange={this.onFromInputChange}
            onKeyDown={this.onKeyFromDown}
            value={this.getFromInputValue()}
            onBlur={this.onFromInputBlur}
            innerRef={el => (this.fromInput = el)}
            name={name}
            width="85px"
            theme={this.props.theme}
            component="DatePicker"
          />

          <BetweenDates
            theme={this.props.theme}
            visible={this.isDividerVisible()}
            centered={!this.props.savePlaceholder}
          >
            -
          </BetweenDates>

          <InputElem
            centered={!this.props.savePlaceholder}
            onFocus={this.onFocus}
            onChange={this.onToInputChange}
            onKeyDown={this.onKeyToDown}
            value={this.getToInputValue()}
            onBlur={this.onToInputBlur}
            innerRef={el => (this.toInput = el)}
            width="85px"
            name={name}
            theme={this.props.theme}
            component="DatePicker"
          />

          <IconWrap right>
            <CalendarIcon />
          </IconWrap>

        </InputContentWrap>

        {this.props.children}
      </InputWrap>
    );
  }
}

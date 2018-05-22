import React, { Component } from 'react';
import { getValidMomentFromISOStringOrNull } from '../../utils';
import Inputmask from 'inputmask';

import InputWrap from '../../styled/InputWrap';
import InputContentWrap from '../../styled/InputContentWrap';
import InputElem from '../../styled/InputElem';

import { CalendarIcon } from '../../svg';

export class DatePickerInputer extends Component {
  dateInput;
  dateMask;
  mask;
  im;

  constructor(props) {
    super(props);

    this.state = {
      editingValue: null
    };

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.mask = '9999.99.99';
    this.im = new Inputmask(this.mask);
  }

  componentDidMount() {
    this.dateMask = this.im.mask(this.dateInput);
  }

  onChange(e) {
    this.setState({
      editingValue: e.target.value
    });

    let date = getValidMomentFromISOStringOrNull(e.target.value);

    this.setState({
      date
    });

    if (
      date !== this.props.date ||
      (date && !date.isSame(this.props.date, 'day'))
    ) {
      this.props.onValidUpdate({
        date
      });
    }
  }

  getValue() {
    if (this.state.editingValue !== null) return this.state.editingValue;

    return this.props.date ? this.props.date.format('YYYY.MM.DD') : '';
  }

  onBlur(e) {
    this.setState({
      editingValue: null
    });
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
          <InputElem
            placeholder="Дата"
            onChange={this.onChange}
            value={this.getValue()}
            onBlur={this.onBlur}
            innerRef={el => (this.dateInput = el)}
            centered
            name={name}
            theme={this.props.theme}
            component="DatePicker"
          />

          <CalendarIcon />
        </InputContentWrap>

        {this.props.children}
      </InputWrap>
    );
  }
}

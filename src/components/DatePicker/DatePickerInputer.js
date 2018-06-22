import React, { Component } from 'react';
import { getValidMomentFromISOStringOrNull } from '../../utils';
import Inputmask from 'inputmask';

import InputWrap from '../../styled/InputWrap';
import InputContentWrap from '../../styled/InputContentWrap';
import InputElem from '../../styled/InputElem';
import Placeholder from '../../styled/Placeholder';

import { CalendarIcon } from '../../svg';

export class DatePickerInputer extends Component {
  dateInput;
  dateMask;
  mask;
  im;

  constructor(props) {
    super(props);

    this.state = {
      editingValue: null,
      isFocused: !!this.props.date,
    };

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);

    this.mask = '9999.99.99';
    this.im = new Inputmask(this.mask);
  }

  componentDidMount() {
    if (this.dateInput) this.dateMask = this.im.mask(this.dateInput);
  }

  onChange(e) {
    this.setState({
      editingValue: e.target.value
    });

    let date = getValidMomentFromISOStringOrNull(e.target.value);

    this.setState({
      date,
      isFocused: !!date
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

  onFocus() {
    this.setState({
      isFocused: true
    });
  }

  onBlur(e) {
    this.setState({
      editingValue: null
    });

    if (!this.props.date) {
      this.setState({
        isFocused: false
      });
    }
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
            onChange={this.onChange}
            value={this.getValue()}
            onBlur={this.onBlur}
            innerRef={el => (this.dateInput = el)}
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

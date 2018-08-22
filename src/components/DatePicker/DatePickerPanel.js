import moment from 'moment/moment';
import React, { Component } from 'react';
import { getDaysArrayFromMomentDate } from '../../utils';

import DatePickerPanelWrap from '../../styled/DatePickerPanelWrap';
import HalfC from '../../styled/HalfC';
import TopWithPickers from '../../styled/TopWithPickers';
import PickerWrap from '../../styled/PickerWrap';
import MonthValueWrap from '../../styled/MonthValueWrap';
import YearValueWrap from '../../styled/YearValueWrap';
import BottomWithDays from '../../styled/BottomWithDays';
import IconWrap from '../../styled/IconWrap';
import Day from '../../styled/Day';
import { LeftDatepickerArrow } from '../../svg';
import { RightDatepickerArrow } from '../../svg';

moment.locale('ru');

export class DatePickerPanel extends Component {
  constructor(props) {
    super(props);

    const date = this.props.date ? moment(this.props.date) : moment();

    this.state = {
      date,
      days: getDaysArrayFromMomentDate(date),
      hovered: null
    };

    this.decreaseMonth = this.decreaseMonth.bind(this);
    this.increaseMonth = this.increaseMonth.bind(this);
    this.decreaseYear = this.decreaseYear.bind(this);
    this.increaseYear = this.increaseYear.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.props.date !== props.date) {
      this.updateSelectedDatesToSeeSelectedDays(props);
    }
  }

  updateSelectedDatesToSeeSelectedDays(nextProps) {
    const props = nextProps || this.props;
    if (props.date) {
      let date = moment(props.date);

      this.setState({
        date,
        days: getDaysArrayFromMomentDate(date)
      });
    }
  }

  transformAndUpdateDate(name, days, step, granularity, compare) {
    const newDate = moment(this.state[name]).add(step, granularity);
    if (compare(newDate)) return;

    this.setState({
      [name]: newDate,
      [days]: getDaysArrayFromMomentDate(newDate)
    });
  }

  decreaseMonth() {
    this.transformAndUpdateDate('date', 'days', -1, 'month', newDate => false);
  }

  increaseMonth() {
    this.transformAndUpdateDate('date', 'days', 1, 'month', newDate => false);
  }

  decreaseYear() {
    this.transformAndUpdateDate('date', 'days', -1, 'year', newDate => false);
  }

  increaseYear() {
    this.transformAndUpdateDate('date', 'days', 1, 'year', newDate => false);
  }

  onDayMouseEnter(e, date) {
    this.setState({
      hovered: moment(date)
    });
  }

  onDayMouseOut(e, date) {
    this.setState({
      hovered: null
    });
  }

  isOneOfSelected(date) {
    return this.props.date && this.props.date.isSame(date, 'day');
  }

  render() {
    const { theme, visible, positionX, positionY } = this.props;

    return (
      <DatePickerPanelWrap
        theme={theme}
        visible={visible}
        positionX={positionX}
        positionY={positionY}
      >
        <HalfC theme={this.props.theme}>
          <TopWithPickers>
            <PickerWrap>
              <IconWrap onClick={this.decreaseMonth}>
                <LeftDatepickerArrow />
              </IconWrap>
              <MonthValueWrap theme={this.props.theme}>
                {this.state.date.format('MMMM')}
              </MonthValueWrap>
              <IconWrap onClick={this.increaseMonth}>
                <RightDatepickerArrow />
              </IconWrap>
            </PickerWrap>

            <PickerWrap right>
              <IconWrap onClick={this.decreaseYear}>
                <LeftDatepickerArrow />
              </IconWrap>
              <YearValueWrap theme={this.props.theme}>
                {this.state.date.format('YYYY')}
              </YearValueWrap>
              <IconWrap onClick={this.increaseYear}>
                <RightDatepickerArrow />
              </IconWrap>
            </PickerWrap>
          </TopWithPickers>

          <BottomWithDays>
            {this.state.days.map(
              (d, i) =>
                d.val === 0 ? (
                  <Day key={i} theme={this.props.theme} />
                ) : (
                  <Day
                    theme={this.props.theme}
                    onMouseEnter={e => this.onDayMouseEnter(e, d.date)}
                    onMouseOut={e => this.onDayMouseOut(e, d.date)}
                    selected={this.isOneOfSelected(d.date)}
                    onMouseDown={e => this.props.select(d)}
                    key={i}
                  >
                    {d.val}
                  </Day>
                )
            )}
          </BottomWithDays>
        </HalfC>
      </DatePickerPanelWrap>
    );
  }
}

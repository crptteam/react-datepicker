import moment from 'moment/moment';
import React, { Component } from 'react';
import { getDaysArrayFromMomentDate } from '../../utils';

import DatePickerPanelWrap from '../../styled/DatePickerPanelWrap';
import HalfC from '../../styled/HalfC';
import TopWithPickers from '../../styled/TopWithPickers';
import PickerWrap from '../../styled/PickerWrap';
import MonthValueWrap from '../../styled/MonthValueWrap';
import YearValueWrap from '../../styled/YearValueWrap';
import IconWrap from '../../styled/IconWrap';
import { LeftDatepickerArrow } from '../../svg';
import { RightDatepickerArrow } from '../../svg';
import Actions from '../Actions';
import MonthView from '../MonthView';
import DaysView from '../DaysView';

moment.locale('ru');

export class DatePickerPanel extends Component {
  constructor(props) {
    super(props);

    const date = this.props.date ? moment(this.props.date) : moment();

    this.state = {
      monthDate: date,
      initialDate: this.props.date,
      days: getDaysArrayFromMomentDate(date),
      hovered: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.date !== state.initialDate) {
      const date = props.date ? moment(props.date) : moment();

      return {
        monthDate: date,
        initialDate: props.date,
        days: getDaysArrayFromMomentDate(date),
        hovered: null,
      }
    }

    return null;
  }

  decreaseMonth = () => {
    const { monthView, onSelect } = this.props;
    const { monthDate } = this.state;

    const newDate = moment(monthDate).add(-1, 'month');
    if (monthView) onSelect(newDate);
    else {
      this.setState({
        monthDate: newDate,
        days: getDaysArrayFromMomentDate(newDate),
      });
    }
  };

  increaseMonth = () => {
    const { monthView, onSelect } = this.props;
    const { monthDate } = this.state;

    const newDate = moment(monthDate).add(1, 'month');
    if (monthView) onSelect(newDate);
    else {
      this.setState({
        monthDate: newDate,
        days: getDaysArrayFromMomentDate(newDate),
      });
    }
  };

  decreaseYear = () => {
    const { monthView, onSelect } = this.props;
    const { monthDate } = this.state;

    const newDate = moment(monthDate).add(-1, 'year');
    if (monthView) onSelect(newDate);
    else {
      this.setState({
        monthDate: newDate,
        days: getDaysArrayFromMomentDate(newDate),
      });
    }
  };

  increaseYear = () => {
    const { monthView, onSelect } = this.props;
    const { monthDate } = this.state;

    const newDate = moment(monthDate).add(1, 'year');
    if (monthView) onSelect(newDate);
    else {
      this.setState({
        monthDate: newDate,
        days: getDaysArrayFromMomentDate(newDate),
      });
    }
  };

  onDayMouseEnter = (e, date) => {
    this.setState({ hovered: moment(date) });
  };

  onDayMouseOut = () => {
    this.setState({ hovered: null });
  };

  onMonthClick = (date) => {
    const { onSelect } = this.props;
    onSelect(date);
  };

  onSelect = (day) => {
    const { monthView, onSelect } = this.props;
    let { date } = this.props;

    if (date) {
      if (day.date.isSame(date, 'day')) {
        if (!monthView) date = null;
      } else {
        date = moment(day.date);
      }
    } else {
      date = moment(day.date);
    }

    onSelect(date);
  };

  isOneOfSelected = (newDate) => {
    const { date } = this.props;
    return date && date.isSame(newDate, 'day');
  };

  render() {
    const {
      date,
      theme,
      monthView,
      resetText,
      acceptText,
      showPointer,
      onAccept,
      onReset,
    } = this.props;
    const { monthDate } = this.state;

    const panelMargin = showPointer ? '15px' : undefined;

    return (
      <DatePickerPanelWrap
        theme={theme}
        marginTop={panelMargin}
      >
        <HalfC theme={theme}>
          <TopWithPickers>
            <PickerWrap>
              <IconWrap onClick={this.decreaseYear}>
                <LeftDatepickerArrow />
              </IconWrap>
              <YearValueWrap theme={theme}>
                {monthDate.format('YYYY')}
              </YearValueWrap>
              <IconWrap onClick={this.increaseYear}>
                <RightDatepickerArrow />
              </IconWrap>
            </PickerWrap>

            {!monthView && (
              <PickerWrap>
                <IconWrap onClick={this.decreaseMonth}>
                  <LeftDatepickerArrow />
                </IconWrap>
                <MonthValueWrap theme={theme}>
                  {monthDate.format('MMMM')}
                </MonthValueWrap>
                <IconWrap onClick={this.increaseMonth}>
                  <RightDatepickerArrow />
                </IconWrap>
              </PickerWrap>
            )}
          </TopWithPickers>

          {monthView && (
            <MonthView date={monthDate} onMonthClick={this.onMonthClick}/>
          )}

          {!monthView && (
            <DaysView
              days={this.state.days}
              onDayMouseEnter={this.onDayMouseEnter}
              onDayMouseOut={this.onDayMouseOut}
              theme={theme}
              selected={this.isOneOfSelected}
              onSelect={this.onSelect}
            />
          )}
        </HalfC>

        <Actions
          onAccept={onAccept}
          onReset={onReset}
          acceptText={acceptText}
          resetText={resetText}
          theme={theme}
        />
      </DatePickerPanelWrap>
    );
  }
}

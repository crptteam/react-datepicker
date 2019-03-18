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

    const { date } = this.props;
    const monthDate = date ? moment(date) : moment();

    this.state = {
      monthDate: monthDate,
      initialDate: this.props.date,
      days: getDaysArrayFromMomentDate(monthDate),
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
    const { monthView, onSelect, minDate } = this.props;
    const { monthDate } = this.state;

    let newDate = moment(monthDate).add(-1, 'month');
    if (minDate && newDate < minDate) newDate = minDate;

    if (monthView) onSelect(newDate);
    else {
      this.setState({
        monthDate: newDate,
        days: getDaysArrayFromMomentDate(newDate),
      });
    }
  };

  increaseMonth = () => {
    const { monthView, onSelect, maxDate } = this.props;
    const { monthDate } = this.state;

    let newDate = moment(monthDate).add(1, 'month');
    if (maxDate && newDate > maxDate) newDate = maxDate;

    if (monthView) onSelect(newDate);
    else {
      this.setState({
        monthDate: newDate,
        days: getDaysArrayFromMomentDate(newDate),
      });
    }
  };

  decreaseYear = () => {
    const { monthView, onSelect, minDate } = this.props;
    const { monthDate } = this.state;

    let newDate = moment(monthDate).add(-1, 'year');
    if (minDate && newDate < minDate) newDate = minDate;

    if (monthView) onSelect(newDate);
    else {
      this.setState({
        monthDate: newDate,
        days: getDaysArrayFromMomentDate(newDate),
      });
    }
  };

  increaseYear = () => {
    const { monthView, onSelect, maxDate } = this.props;
    const { monthDate } = this.state;

    let newDate = moment(monthDate).add(1, 'year');
    if (maxDate && newDate > maxDate) newDate = maxDate;

    if (monthView) onSelect(newDate);
    else {
      this.setState({
        monthDate: newDate,
        days: getDaysArrayFromMomentDate(newDate),
      });
    }
  };

  onDayMouseEnter = (e, date) => {
    const { minDate, maxDate } = this.props;
    let preparedDate = moment(date);
    if (minDate && preparedDate < minDate) return;
    if (maxDate && preparedDate > maxDate) return;

    this.setState({ hovered: preparedDate });
  };

  onDayMouseOut = () => {
    this.setState({ hovered: null });
  };

  onMonthClick = (date) => {
    const { onSelect } = this.props;
    onSelect(date);
  };

  onSelect = (day) => {
    const { monthView, onSelect, minDate, maxDate } = this.props;
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

    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;

    onSelect(date);
  };

  isOneOfSelected = (newDate) => {
    const { date } = this.props;
    return date && date.isSame(newDate, 'day');
  };

  isOneOfDisabled = (date) => {
    const { minDate, maxDate } = this.props;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;

    return false;
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
      showCurrent,
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
              disabled={this.isOneOfDisabled}
              onSelect={this.onSelect}
              showCurrent={showCurrent}
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

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
import Day from '../../styled/Day';
import Divider from '../../styled/Divider';
import IconWrap from '../../styled/IconWrap';
import { LeftDatepickerArrow } from '../../svg';
import { RightDatepickerArrow } from '../../svg';

moment.locale('ru');

export class RangePickerPanel extends Component {
  constructor(props) {
    super(props);

    const startDate = this.props.from ? moment(this.props.from) : moment();
    const endDate = this.props.to ? moment(this.props.to) : moment(startDate).add(1, 'month');

    this.state = {
      startDate,
      endDate,
      startDays: getDaysArrayFromMomentDate(startDate),
      endDays: getDaysArrayFromMomentDate(endDate),
      hovered: null
    };

    this.decreaseStartMonth = this.decreaseStartMonth.bind(this);
    this.increaseStartMonth = this.increaseStartMonth.bind(this);
    this.decreaseStartYear = this.decreaseStartYear.bind(this);
    this.increaseStartYear = this.increaseStartYear.bind(this);
    this.decreaseEndMonth = this.decreaseEndMonth.bind(this);
    this.increaseEndMonth = this.increaseEndMonth.bind(this);
    this.decreaseEndYear = this.decreaseEndYear.bind(this);
    this.increaseEndYear = this.increaseEndYear.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.props.from !== props.from || this.props.to !== props.to) {
      this.updateSelectedDatesToSeeSelectedDays(props);
    }
  }

  updateSelectedDatesToSeeSelectedDays(nextProps) {
    const props = nextProps || this.props;
    if (props.from) {
      let startDate = moment(props.from);

      if (startDate.isSameOrAfter(this.state.endDate, 'month')) {
        startDate = moment(this.state.endDate).add(-1, 'month');
      }

      this.setState({
        startDate,
        startDays: getDaysArrayFromMomentDate(startDate)
      });
    }

    if (props.to) {
      let endDate = moment(props.to);

      if (endDate.isSameOrBefore(this.state.startDate, 'month')) {
        endDate = moment(this.state.startDate).add(1, 'month');
      }

      this.setState({
        endDate,
        endDays: getDaysArrayFromMomentDate(endDate)
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

  decreaseStartMonth() {
    this.transformAndUpdateDate(
      'startDate',
      'startDays',
      -1,
      'month',
      newDate => newDate.isSameOrAfter(this.state.endDate, 'month')
    );
  }

  increaseStartMonth() {
    this.transformAndUpdateDate('startDate', 'startDays', 1, 'month', newDate =>
      newDate.isSameOrAfter(this.state.endDate, 'month')
    );
  }

  decreaseStartYear() {
    this.transformAndUpdateDate('startDate', 'startDays', -1, 'year', newDate =>
      newDate.isSameOrAfter(this.state.endDate, 'month')
    );
  }

  increaseStartYear() {
    this.transformAndUpdateDate('startDate', 'startDays', 1, 'year', newDate =>
      newDate.isSameOrAfter(this.state.endDate, 'month')
    );
  }

  decreaseEndMonth() {
    this.transformAndUpdateDate('endDate', 'endDays', -1, 'month', newDate =>
      newDate.isSameOrBefore(this.state.startDate, 'month')
    );
  }

  increaseEndMonth() {
    this.transformAndUpdateDate('endDate', 'endDays', 1, 'month', newDate =>
      newDate.isSameOrBefore(this.state.startDate, 'month')
    );
  }

  decreaseEndYear() {
    this.transformAndUpdateDate('endDate', 'endDays', -1, 'year', newDate =>
      newDate.isSameOrBefore(this.state.startDate, 'month')
    );
  }

  increaseEndYear() {
    this.transformAndUpdateDate('endDate', 'endDays', 1, 'year', newDate =>
      newDate.isSameOrBefore(this.state.startDate, 'month')
    );
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
    return (
      (this.props.to && this.props.to.isSame(date, 'day')) ||
      (this.props.from && this.props.from.isSame(date, 'day'))
    );
  }

  isBetweenSelected(date) {
    if (!this.props.to && !this.props.from) return false;

    if (this.state.hovered) {
      if (this.props.to && this.props.from) {
        if (this.isOneOfSelected(this.state.hovered)) {
          return (
            date.isBefore(this.props.to, 'day') &&
            date.isAfter(this.props.from, 'day')
          );
        }

        const diffFrom = Math.abs(
          this.props.from.diff(this.state.hovered, 'day')
        );
        const diffTo = Math.abs(this.props.to.diff(this.state.hovered, 'day'));

        if (this.state.hovered.isSameOrAfter(this.props.to, 'day')) {
          return (
            date.isAfter(this.props.to, 'day') &&
            date.isBefore(this.state.hovered, 'day')
          );
        } else if (this.state.hovered.isSameOrBefore(this.props.from, 'day')) {
          return (
            date.isAfter(this.state.hovered, 'day') &&
            date.isBefore(this.props.from, 'day')
          );
        } else if (
          this.state.hovered.isAfter(this.props.from, 'day') &&
          this.state.hovered.isBefore(this.props.to, 'day')
        ) {
          if (diffFrom > diffTo) {
            return (
              date.isBefore(this.props.to, 'day') &&
              date.isAfter(this.state.hovered, 'day')
            );
          } else {
            return (
              date.isBefore(this.state.hovered, 'day') &&
              date.isAfter(this.props.from, 'day')
            );
          }
        }
      } else if (this.props.to) {
        if (this.state.hovered.isAfter(this.props.to, 'day')) {
          return (
            date.isAfter(this.props.to, 'day') &&
            date.isBefore(this.state.hovered, 'day')
          );
        } else if (this.state.hovered.isBefore(this.props.to, 'day')) {
          return (
            date.isBefore(this.props.to, 'day') &&
            date.isAfter(this.state.hovered, 'day')
          );
        }
      } else if (this.props.from) {
        if (this.state.hovered.isAfter(this.props.from, 'day')) {
          return (
            date.isAfter(this.props.from, 'day') &&
            date.isBefore(this.state.hovered, 'day')
          );
        } else if (this.state.hovered.isBefore(this.props.from, 'day')) {
          return (
            date.isBefore(this.props.from, 'day') &&
            date.isAfter(this.state.hovered, 'day')
          );
        }
      }
    } else {
      if (this.props.to && this.props.from) {
        return (
          date.isBefore(this.props.to, 'day') &&
          date.isAfter(this.props.from, 'day')
        );
      }
    }
  }

  render() {
    return (
      <DatePickerPanelWrap
        theme={this.props.theme}
        visible={this.props.visible}
      >
        <HalfC theme={this.props.theme}>
          <TopWithPickers>
            <PickerWrap>
              <IconWrap onClick={this.decreaseStartMonth}>
                <LeftDatepickerArrow />
              </IconWrap>

              <MonthValueWrap theme={this.props.theme}>
                {this.state.startDate.format('MMMM')}
              </MonthValueWrap>

              <IconWrap onClick={this.increaseStartMonth}>
                <RightDatepickerArrow />
              </IconWrap>
            </PickerWrap>

            <PickerWrap right>
              <IconWrap onClick={this.decreaseStartYear}>
                <LeftDatepickerArrow />
              </IconWrap>

              <YearValueWrap theme={this.props.theme}>
                {this.state.startDate.format('YYYY')}
              </YearValueWrap>
              <IconWrap onClick={this.increaseStartYear}>
                <RightDatepickerArrow />
              </IconWrap>
            </PickerWrap>
          </TopWithPickers>

          <BottomWithDays>
            {this.state.startDays.map(
              (d, i) =>
                d.val === 0 ? (
                  <Day theme={this.props.theme} key={i} />
                ) : (
                  <Day
                    theme={this.props.theme}
                    onMouseEnter={e => this.onDayMouseEnter(e, d.date)}
                    onMouseOut={e => this.onDayMouseOut(e, d.date)}
                    hovered={this.isBetweenSelected(d.date)}
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

        <Divider theme={this.props.theme}>по</Divider>

        <HalfC theme={this.props.theme}>
          <TopWithPickers>
            <PickerWrap>
              <IconWrap onClick={this.decreaseEndMonth}>
                <LeftDatepickerArrow />
              </IconWrap>
              <MonthValueWrap theme={this.props.theme}>
                {this.state.endDate.format('MMMM')}
              </MonthValueWrap>
              <IconWrap onClick={this.increaseEndMonth}>
                <RightDatepickerArrow />
              </IconWrap>
            </PickerWrap>

            <PickerWrap right>
              <IconWrap onClick={this.decreaseEndYear}>
                <LeftDatepickerArrow />
              </IconWrap>
              <YearValueWrap theme={this.props.theme}>
                {this.state.endDate.format('YYYY')}
              </YearValueWrap>
              <IconWrap onClick={this.decreaseEndYear}>
                <RightDatepickerArrow />
              </IconWrap>
            </PickerWrap>
          </TopWithPickers>

          <BottomWithDays>
            {this.state.endDays.map(
              (d, i) =>
                d.val === 0 ? (
                  <Day key={i} theme={this.props.theme} />
                ) : (
                  <Day
                    theme={this.props.theme}
                    onMouseEnter={e => this.onDayMouseEnter(e, d.date)}
                    onMouseOut={e => this.onDayMouseOut(e, d.date)}
                    hovered={this.isBetweenSelected(d.date)}
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

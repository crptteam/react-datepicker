import moment from "moment/moment";
import React, { Component } from "react";
import { getDaysArrayFromMomentDate } from "../../utils";

import DatePickerPanelWrap from "../../styled/DatePickerPanelWrap";
import HalfC from "../../styled/HalfC";
import TopWithPickers from "../../styled/TopWithPickers";
import PickerWrap from "../../styled/PickerWrap";
import MonthValueWrap from "../../styled/MonthValueWrap";
import YearValueWrap from "../../styled/YearValueWrap";
import BottomWithDays from "../../styled/BottomWithDays";
import IconWrap from "../../styled/IconWrap";
import Day from "../../styled/Day";
import Circle from "../../styled/Circle";
import ArrowWrap from "../../styled/ArrowWrap";
import DayWrap from "../../styled/DayWrap";
import Months from "../../styled/Months";
import Month from "../../styled/Month";
import { LeftDatepickerArrow,
  RightDatepickerArrow,
} from "../../svg";

import ActionsWrapper from "../../styled/ActionsWrapper";
import { Button } from "@crpt/react-button";
import styled from 'styled-components';

moment.locale("ru");

export class DatePickerPanel extends Component {
  constructor(props) {
    super(props);

    const date = this.props.date ? moment(this.props.date) : moment();

    this.state = {
      monthDate: date,
      date,
      days: getDaysArrayFromMomentDate(date),
      hovered: null
    };

    this.decreaseMonth = this.decreaseMonth.bind(this);
    this.increaseMonth = this.increaseMonth.bind(this);
    this.decreaseYear = this.decreaseYear.bind(this);
    this.increaseYear = this.increaseYear.bind(this);
    this.onMonthClick = this.onMonthClick.bind(this);
    this.accept = this.accept.bind(this);
    this.reset = this.reset.bind(this);
    this.onSelect = this.onSelect.bind(this);
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
        monthDate: date,
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

    return newDate;
  }

  decreaseMonth() {
    const newDate = this.transformAndUpdateDate(
      "monthDate",
      "days",
      -1,
      "month",
      newDate => false
    );
    if (this.props.monthView) this.props.accept(newDate);
  }

  increaseMonth() {
    const newDate = this.transformAndUpdateDate(
      "monthDate",
      "days",
      1,
      "month",
      newDate => false
    );
    if (this.props.monthView) this.props.accept(newDate);
  }

  decreaseYear() {
    const newDate = this.transformAndUpdateDate(
      "monthDate",
      "days",
      -1,
      "year",
      newDate => false
    );
    if (this.props.monthView) this.props.accept(newDate);
  }

  increaseYear() {
    const newDate = this.transformAndUpdateDate(
      "monthDate",
      "days",
      1,
      "year",
      newDate => false
    );
    if (this.props.monthView) this.props.accept(newDate);
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

  onMonthClick(date) {
    this.setState({ date }, () => {
      if (!this.props.controls) {
        this.props.accept(date);
      }
    });
  }

  reset() {
    this.props.reset();
  }

  accept() {
    this.props.accept(this.state.date);
  }

  onSelect(day) {
    let date = this.state.date;

    if (date) {
      if (day.date.isSame(date, "day")) {
        if (!this.props.monthView) date = null;
      } else {
        date = moment(day.date);
      }
    } else {
      date = moment(day.date);
    }

    this.setState({ date }, () => {
      if (!this.props.controls) {
        this.props.accept(date);
      }
    });
  }

  isOneOfSelected(date) {
    return this.state.date && this.state.date.isSame(date, "day");
  }

  render() {
    const {
      theme,
      visible,
      positionX,
      positionY,
      monthView,
      controls
    } = this.props;

    const monthes = [
      moment(this.state.date).add(-3, "month"),
      moment(this.state.date).add(-2, "month"),
      moment(this.state.date).add(-1, "month"),
      moment(this.state.date),
      moment(this.state.date).add(1, "month"),
      moment(this.state.date).add(2, "month"),
      moment(this.state.date).add(3, "month")
    ];

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
              <IconWrap onClick={this.decreaseYear}>
                <Circle />
                <ArrowWrap>
                  <LeftDatepickerArrow />
                </ArrowWrap>
              </IconWrap>
              <YearValueWrap theme={this.props.theme}>
                {this.state.monthDate.format("YYYY")}
              </YearValueWrap>
              <IconWrap onClick={this.increaseYear}>
                <ArrowWrap right>
                  <RightDatepickerArrow />
                </ArrowWrap>
                <Circle />
              </IconWrap>
            </PickerWrap>
          </TopWithPickers>

          <TopWithPickers>
            <PickerWrap>
              <IconWrap onClick={this.decreaseMonth}>
                <Circle />
                <ArrowWrap>
                  <LeftDatepickerArrow />
                </ArrowWrap>
              </IconWrap>
              <MonthValueWrap theme={this.props.theme}>
                {this.state.monthDate.format("MMMM")}
              </MonthValueWrap>
              <IconWrap onClick={this.increaseMonth}>
                <ArrowWrap right>
                  <RightDatepickerArrow />
                </ArrowWrap>
                <Circle />
              </IconWrap>
            </PickerWrap>
          </TopWithPickers>

          {monthView ? (
            <Months>
              {monthes.map((m, i) => (
                <Month
                  onClick={e => this.onMonthClick(m)}
                  key={i}
                  selected={this.state.date.isSame(m, "month")}
                >
                  {m.format("MMMM")}
                </Month>
              ))}
            </Months>
          ) : (
            <BottomWithDays>
              {this.state.days.map(
                (d, i) =>
                  d.val === 0 ? (
                    <DayWrap key={i}>
                      <Day theme={this.props.theme} />
                    </DayWrap>
                  ) : (
                    <DayWrap
                      key={i}
                      value={d.val}
                      theme={this.props.theme}
                      onMouseDown={e => this.onSelect(d)}
                      onMouseEnter={e => this.onDayMouseEnter(e, d.date)}
                      onMouseOut={e => this.onDayMouseOut(e, d.date)}
                    >
                      <Day
                        theme={this.props.theme}
                        selected={this.isOneOfSelected(d.date)}
                      >
                        {d.val}
                      </Day>
                    </DayWrap>
                  )
              )}
            </BottomWithDays>
          )}
        </HalfC>
        {controls && (
          <ActionsWrapper>
            <Button
              onClick={this.reset}
              theme={theme.DatePicker.DatePickerPanelWrap.Reset}
            >
              {this.props.resetText}
            </Button>
            <Button
              onClick={this.accept}
              theme={theme.DatePicker.DatePickerPanelWrap.Accept}
            >
              {this.props.acceptText}
            </Button>
          </ActionsWrapper>
        )}
      </DatePickerPanelWrap>
    );
  }
}

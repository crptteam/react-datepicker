import moment from "moment/moment";
import React, { Component } from "react";
import { getDaysArrayFromMomentDate } from "../../utils";

import DatePickerPanelWrap from "../../styled/DatePickerPanelWrap";
import HalfC from "../../styled/HalfC";
import TopWithPickers from "../../styled/TopWithPickers";
import PickerWrap from "../../styled/PickerWrap";
import MonthValueWrap from "../../styled/MonthValueWrap";
import YearValueWrap from "../../styled/YearValueWrap";
import IconWrap from "../../styled/IconWrap";
import { LeftDatepickerArrow } from "../../svg";
import { RightDatepickerArrow } from "../../svg";
import Actions from "../Actions";
import MonthView from "../MonthView";
import DaysView from "../DaysView";

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
  }

  componentWillReceiveProps(props) {
    if (this.props.date !== props.date) {
      this.updateSelectedDatesToSeeSelectedDays(props);
    }
  }

  updateSelectedDatesToSeeSelectedDays = (nextProps) => {
    const props = nextProps || this.props;
    if (props.date) {
      let date = moment(props.date);

      this.setState({
        date,
        monthDate: date,
        days: getDaysArrayFromMomentDate(date)
      });
    }
  };

  transformAndUpdateDate = (name, days, step, granularity, compare) => {
    const newDate = moment(this.state[name]).add(step, granularity);
    if (compare(newDate)) return;

    this.setState({
      [name]: newDate,
      [days]: getDaysArrayFromMomentDate(newDate)
    });

    return newDate;
  };

  decreaseMonth = () => {
    const { monthView, accept } = this.props;

    const newDate = this.transformAndUpdateDate(
      "monthDate",
      "days",
      -1,
      "month",
      newDate => false
    );

    if (monthView) accept(newDate);
  };

  increaseMonth = () => {
    const { monthView, accept } = this.props;

    const newDate = this.transformAndUpdateDate(
      "monthDate",
      "days",
      1,
      "month",
      newDate => false
    );
    if (monthView) accept(newDate);
  };

  decreaseYear = () => {
    const { monthView, accept } = this.props;
    const newDate = this.transformAndUpdateDate(
      "monthDate",
      "days",
      -1,
      "year",
      newDate => false
    );
    if (monthView) accept(newDate);
  };

  increaseYear = () => {
    const { monthView, accept } = this.props;
    const newDate = this.transformAndUpdateDate(
      "monthDate",
      "days",
      1,
      "year",
      newDate => false
    );
    if (monthView) accept(newDate);
  };

  onDayMouseEnter = (e, date) => {
    this.setState({
      hovered: moment(date)
    });
  };

  onDayMouseOut = (e, date) => {
    this.setState({
      hovered: null
    });
  };

  onMonthClick = (date) => {
    this.setState({ date });
  };

  onReset = () => {
    const { reset } = this.props;
    reset();
  };

  onAccept = () => {
    const { accept } = this.props;
    const { date } = this.state;
    accept(date);
  };

  onSelect = (day) => {
    const { monthView } = this.props;
    let date = this.state.date;

    if (date) {
      if (day.date.isSame(date, "day")) {
        if (!monthView) date = null;
      } else {
        date = moment(day.date);
      }
    } else {
      date = moment(day.date);
    }

    this.setState({ date });
  };

  isOneOfSelected = (newDate) => {
    const { date } = this.state;
    return date && date.isSame(newDate, "day");
  };

  render() {
    const {
      theme,
      visible,
      positionX,
      positionY,
      monthView,
      onRef,
      resetText,
      acceptText,
      showPointer,
    } = this.props;
    const { date, monthDate } = this.state;

    const panelMargin = showPointer ? '15px' : undefined;

    return (
      <DatePickerPanelWrap
        innerRef={onRef}
        theme={theme}
        marginTop={panelMargin}
        visible={visible}
        positionX={positionX}
        positionY={positionY}
      >
        <HalfC theme={theme}>
          <TopWithPickers>
            <PickerWrap>
              <IconWrap onClick={this.decreaseYear}>
                <LeftDatepickerArrow />
              </IconWrap>
              <YearValueWrap theme={theme}>
                {monthDate.format("YYYY")}
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
                  {monthDate.format("MMMM")}
                </MonthValueWrap>
                <IconWrap onClick={this.increaseMonth}>
                  <RightDatepickerArrow />
                </IconWrap>
              </PickerWrap>
            )}
          </TopWithPickers>

          {monthView && (
            <MonthView date={date} onMonthClick={this.onMonthClick}/>
          )}

          {!monthView && (
            <DaysView
              days={this.state.days}
              onDayMouseOut={this.onDayMouseOut}
              theme={theme}
              onDayMouseEnter={this.onDayMouseEnter}
              selected={this.isOneOfSelected}
              onSelect={this.onSelect}
            />
          )}
        </HalfC>

        <Actions
          onAccept={this.onAccept}
          onReset={this.onReset}
          acceptText={acceptText}
          resetText={resetText}
          theme={theme}
        />
      </DatePickerPanelWrap>
    );
  }
}

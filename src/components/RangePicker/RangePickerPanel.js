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
import Months from "../../styled/Months";
import Month from "../../styled/Month";
import { LeftDatepickerArrow } from "../../svg";
import { RightDatepickerArrow } from "../../svg";
import Actions from "../Actions";
import DaysView from "../DaysView";
import { PickerStep } from "./RangePicker";

moment.locale("ru");

export class RangePickerPanel extends Component {
  constructor(props) {
    super(props);

    const startDate = this.props.from ? moment(this.props.from) : null;
    const endDate = this.props.to ? moment(this.props.to) : null;

    const leftDate = startDate ? moment(startDate) : moment();
    const rightDate = endDate ? moment(endDate) : moment();

    this.state = {
      startDate,
      endDate,
      leftDate,
      rightDate,
      initialFrom: this.props.from,
      initialTo: this.props.to,
      startDays: getDaysArrayFromMomentDate(leftDate),
      endDays: getDaysArrayFromMomentDate(rightDate),
      hovered: null
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.from !== state.initialFrom || props.to !== state.initialTo) {
      const startDate = props.from ? moment(props.from) : null;
      const endDate = props.to ? moment(props.to) : null;

      let leftDate;

      if (startDate === null && endDate !== null) {
        leftDate = moment(endDate);
      } else {
        leftDate = startDate ? moment(startDate) : moment();
      }

      let rightDate;
      if (endDate === null && startDate !== null) {
        rightDate = moment(startDate);
      } else {
        rightDate = endDate ? moment(endDate) : moment();
      }

      return {
        startDate,
        endDate,
        leftDate,
        rightDate,
        initialFrom: props.from,
        initialTo: props.to,
        startDays: getDaysArrayFromMomentDate(leftDate),
        endDays: getDaysArrayFromMomentDate(rightDate),
        hovered: null,
      };
    }

    return null;
  }

  changeLeftDate = (e, amount, unit) => {
    e.preventDefault();
    e.stopPropagation();
    const { monthView, onLeftSelect, minDate, maxDate } = this.props;
    const { leftDate } = this.state;

    let newDate = moment(leftDate).add(amount, unit);
    if (minDate && newDate < minDate) newDate = minDate;
    if (maxDate && newDate > maxDate) newDate = maxDate;

    if (monthView) onLeftSelect(newDate);
    else {
      this.setState({
        leftDate: newDate,
        startDays: getDaysArrayFromMomentDate(newDate),
      });
    }
  };

  decreaseStartMonth = (e) => this.changeLeftDate(e, -1, 'month');

  increaseStartMonth = (e) => this.changeLeftDate(e, 1, 'month');

  decreaseStartYear = (e) => this.changeLeftDate(e, -1, 'year');

  increaseStartYear = (e) => this.changeLeftDate(e, 1, 'year');

  changeRightDate = (e, amount, unit) => {
    e.preventDefault();
    e.stopPropagation();
    const { monthView, onRightSelect, minDate, maxDate } = this.props;
    const { rightDate } = this.state;

    let newDate = moment(rightDate).add(amount, unit);
    if (minDate && newDate < minDate) newDate = minDate;
    if (maxDate && newDate > maxDate) newDate = maxDate;

    if (monthView) onRightSelect(newDate);
    else {
      this.setState({
        rightDate: newDate,
        endDays: getDaysArrayFromMomentDate(newDate),
      });
    }
  };

  decreaseEndMonth = (e) => this.changeRightDate(e, -1, 'month');

  increaseEndMonth = (e) => this.changeRightDate(e, 1, 'month');

  decreaseEndYear = (e) => this.changeRightDate(e, -1, 'year');

  increaseEndYear = (e) => this.changeRightDate(e, 1, 'year');

  onDayMouseEnter = (e, date) => {
    this.setState({ hovered: moment(date) });
  };

  onDayMouseOut = () => {
    this.setState({ hovered: null });
  };

  onLeftMonthClick = (date) => {
    const { onLeftSelect } = this.props;
    onLeftSelect(date);
  };

  onRightMonthClick = (date) => {
    const { onRightSelect } = this.props;
    onRightSelect(date);
  };

  isLeftSelected = (date) => {
    const { hovered, startDate, endDate } = this.state;

    if (hovered) return date.isSame(endDate, "day");

    return (
      date.isSame(endDate, "day") ||
      date.isSame(startDate, "day")
    );
  };

  isRightSelected = (date) => {
    const { hovered, startDate, endDate } = this.state;

    if (hovered) return date.isSame(startDate, "day");

    return (
      date.isSame(endDate, "day") ||
      date.isSame(startDate, "day")
    );
  };

  isLeftHovered = (date) => {
    const { hovered, startDate, endDate } = this.state;

    if (hovered) {
      if (date.isSameOrAfter(endDate, "day")) return false;
      if (
        date.isBefore(endDate, "day") &&
        date.isAfter(hovered, "day")
      )
        return true;
    } else {
      if (date.isSameOrAfter(endDate, "day")) return false;
      if (
        date.isBefore(endDate, "day") &&
        date.isAfter(startDate, "day")
      )
        return true;
    }
  };

  isRightHovered = (date) => {
    const { hovered, startDate, endDate } = this.state;

    if (hovered) {
      if (date.isSameOrBefore(startDate, "day")) return false;
      if (
        date.isAfter(startDate, "day") &&
        date.isBefore(hovered, "day")
      )
        return true;
    } else {
      if (date.isSameOrBefore(startDate, "day")) return false;
      if (
        date.isBefore(endDate, "day") &&
        date.isAfter(startDate, "day")
      )
        return true;
    }
  };

  selectionTimeout = undefined;

  onLeftSelect = (date) => {
    const { onLeftSelect, minDate, maxDate } = this.props;
    let { startDate } = this.state;

    clearTimeout(this.selectionTimeout);
    this.selectionTimeout = setTimeout(() => {
      if (minDate && date.date < minDate) return;
      if (maxDate && date.date > maxDate) return;

      if (startDate && startDate.isSame(date.date, "day")) {
        startDate = null;
      } else {
        startDate = moment(date.date);
      }

      this.setState(
        { startDate },
        () => onLeftSelect(startDate),
      );
    }, 200);
  };

  isRightDisabled = (date) => {
    const { minDate, maxDate, from } = this.props;

    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;

    return from ? date < from : false;
  };

  isLeftDisabled = (date) => {
    const { minDate, maxDate, to } = this.props;

    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;

    return to ? date > to : false;
  };

  onRightSelect = (date) => {
    const { onRightSelect, minDate, maxDate, noActions, onAccept, onBlur } = this.props;
    let { endDate } = this.state;

    clearTimeout(this.selectionTimeout);
    this.selectionTimeout = setTimeout(() => {
      if (minDate && date.date < minDate) return;
      if (maxDate && date.date > maxDate) return;

      if (endDate && endDate.isSame(date.date, "day")) {
        endDate = null;
      } else {
        endDate = moment(date.date);
      }

      if (noActions) {
        onAccept();
        onBlur();
      }

      this.setState(
        { endDate },
        () => {
          onRightSelect(endDate);
        }
      );
    }, 200);
  };

  render() {
    const {
      theme,
      monthView,
      step,
      resetText,
      acceptText,
      showPointer,
      onAccept,
      onReset,
      noActions,
      showCurrent,
    } = this.props;
    const { leftDate, rightDate, startDays, endDays } = this.state;

    const leftMonths = [
      moment(leftDate).add(-3, "month"),
      moment(leftDate).add(-2, "month"),
      moment(leftDate).add(-1, "month"),
      moment(leftDate),
      moment(leftDate).add(1, "month"),
      moment(leftDate).add(2, "month"),
      moment(leftDate).add(3, "month")
    ];

    const rightMonths = [
      moment(rightDate).add(-3, "month"),
      moment(rightDate).add(-2, "month"),
      moment(rightDate).add(-1, "month"),
      moment(rightDate),
      moment(rightDate).add(1, "month"),
      moment(rightDate).add(2, "month"),
      moment(rightDate).add(3, "month")
    ];

    const panelMargin = showPointer ? '15px' : undefined;

    return (
      <DatePickerPanelWrap
        theme={theme}
        marginTop={panelMargin}
      >
        <HalfC hidden={step !== PickerStep.LEFT} theme={theme}>
          <TopWithPickers>
            <PickerWrap>
              <IconWrap onClick={this.decreaseStartMonth}>
                <LeftDatepickerArrow />
              </IconWrap>

              <MonthValueWrap theme={theme}>
                {leftDate && leftDate.format("MMMM")}
              </MonthValueWrap>

              <IconWrap onClick={this.increaseStartMonth}>
                <RightDatepickerArrow />
              </IconWrap>
            </PickerWrap>

            <PickerWrap right>
              <IconWrap onClick={this.decreaseStartYear}>
                <LeftDatepickerArrow />
              </IconWrap>

              <YearValueWrap theme={theme}>
                {leftDate && leftDate.format("YYYY")}
              </YearValueWrap>
              <IconWrap onClick={this.increaseStartYear}>
                <RightDatepickerArrow />
              </IconWrap>
            </PickerWrap>
          </TopWithPickers>

          {monthView ? (
            <Months>
              {leftMonths.map((m, i) => (
                <Month
                  onClick={
                    rightDate.isSameOrBefore(m, "month")
                      ? null
                      : e => this.onLeftMonthClick(m)
                  }
                  key={i}
                  selected={leftDate.isSame(m, "month")}
                >
                  {rightDate.isSameOrBefore(m, "month")
                    ? null
                    : m.format("MMMM")}
                </Month>
              ))}
            </Months>
          ) : (
            <DaysView
              days={startDays}
              onDayMouseEnter={this.onDayMouseEnter}
              onDayMouseOut={this.onDayMouseOut}
              theme={theme}
              disabled={this.isLeftDisabled}
              hovered={this.isLeftHovered}
              selected={this.isLeftSelected}
              onSelect={this.onLeftSelect}
              showCurrent={showCurrent}
            />
          )}
        </HalfC>

        <HalfC hidden={step !== PickerStep.RIGHT} theme={theme}>
          <TopWithPickers>
            <PickerWrap>
              <IconWrap onClick={this.decreaseEndMonth}>
                <LeftDatepickerArrow />
              </IconWrap>
              <MonthValueWrap theme={theme}>
                {rightDate && rightDate.format("MMMM")}
              </MonthValueWrap>
              <IconWrap onClick={this.increaseEndMonth}>
                <RightDatepickerArrow />
              </IconWrap>
            </PickerWrap>

            <PickerWrap right>
              <IconWrap onClick={this.decreaseEndYear}>
                <LeftDatepickerArrow />
              </IconWrap>
              <YearValueWrap theme={theme}>
                {rightDate && rightDate.format("YYYY")}
              </YearValueWrap>
              <IconWrap onClick={this.increaseEndYear}>
                <RightDatepickerArrow />
              </IconWrap>
            </PickerWrap>
          </TopWithPickers>

          {monthView ? (
            <Months>
              {rightMonths.map((m, i) => (
                <Month
                  onClick={
                    leftDate.isSameOrAfter(m, "month")
                      ? null
                      : e => this.onRightMonthClick(m)
                  }
                  key={i}
                  selected={rightDate.isSame(m, "month")}
                >
                  {leftDate.isSameOrAfter(m, "month")
                    ? ""
                    : m.format("MMMM")}
                </Month>
              ))}
            </Months>
          ) : (
            <DaysView
              days={endDays}
              disabled={this.isRightDisabled}
              onDayMouseEnter={this.onDayMouseEnter}
              onDayMouseOut={this.onDayMouseOut}
              theme={theme}
              hovered={this.isRightHovered}
              selected={this.isRightSelected}
              onSelect={this.onRightSelect}
              showCurrent={showCurrent}
            />
          )}
        </HalfC>

        {!noActions && <Actions
          onAccept={onAccept}
          onReset={onReset}
          acceptText={acceptText}
          resetText={resetText}
          theme={theme}
        />}
      </DatePickerPanelWrap>
    );
  }
}

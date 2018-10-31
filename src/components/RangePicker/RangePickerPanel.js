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

moment.locale("ru");

export class RangePickerPanel extends Component {
  rightBottomDays;

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
      startDays: getDaysArrayFromMomentDate(leftDate),
      endDays: getDaysArrayFromMomentDate(rightDate),
      hovered: null
    };
  }

  componentWillReceiveProps(props) {
    if (this.props.from !== props.from || this.props.to !== props.to) {
      this.updateSelectedDatesToSeeSelectedDays(props);
    }
  }

  onReset = () => {
    const { reset } = this.props;
    reset();
    setTimeout(() => this.setState({ startDate: null, endDate: null }), 0);
  };

  onAccept = () => {
    const { accept } = this.props;
    const { startDate, endDate } = this.state;
    accept(startDate, endDate, true);
  };

  onTopLevelClick = (e) => {
    if (e.target.contains(this.rightBottomDays)) {
      e.preventDefault();
    }
  };

  onLeftMonthClick = (leftDate) => {
    const { accept } = this.props;
    const { rightDate } = this.state;

    this.setState({ leftDate });
    accept(leftDate, rightDate);
  };

  onRightMonthClick = (rightDate) => {
    const { accept } = this.props;
    const { leftDate } = this.state;

    this.setState({ rightDate });
    accept(leftDate, rightDate);
  };

  updateSelectedDatesToSeeSelectedDays = (nextProps) => {
    const props = nextProps || this.props;

    const startDate = props.from ? moment(props.from) : this.state.startDate;

    const endDate = props.to ? moment(props.to) : this.state.endDate;

    if (startDate && endDate) {
      this.setState({
        startDate,
        endDate,
        leftDate: moment(startDate),
        rightDate: moment(endDate),
        startDays: getDaysArrayFromMomentDate(startDate),
        endDays: getDaysArrayFromMomentDate(endDate)
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

  decreaseStartMonth = (e) => {
    const newDate = this.transformAndUpdateDate(
      "leftDate",
      "startDays",
      -1,
      "month",
      newDate => false
    );

    if (this.props.monthView && newDate) {
      this.props.accept(moment(newDate), moment(this.state.rightDate));
    }

    e.preventDefault();
    e.stopPropagation();
  };

  increaseStartMonth = (e) => {
    const newDate = this.transformAndUpdateDate(
      "leftDate",
      "startDays",
      1,
      "month",
      newDate => false
    );

    if (this.props.monthView && newDate) {
      this.props.accept(moment(newDate), moment(this.state.rightDate));
    }

    e.preventDefault();
    e.stopPropagation();
  };

  decreaseStartYear = (e) => {
    const newDate = this.transformAndUpdateDate(
      "leftDate",
      "startDays",
      -1,
      "year",
      newDate => false
    );

    if (this.props.monthView && newDate) {
      this.props.accept(moment(newDate), moment(this.state.rightDate));
    }

    e.preventDefault();
    e.stopPropagation();
  };

  increaseStartYear = (e) => {
    const newDate = this.transformAndUpdateDate(
      "leftDate",
      "startDays",
      1,
      "year",
      newDate => false
    );

    if (this.props.monthView && newDate) {
      this.props.accept(moment(newDate), moment(this.state.rightDate));
    }

    e.preventDefault();
    e.stopPropagation();
  };

  decreaseEndMonth = (e) => {
    const newDate = this.transformAndUpdateDate(
      "rightDate",
      "endDays",
      -1,
      "month",
      newDate => false
    );

    if (this.props.monthView && newDate) {
      this.props.accept(moment(this.state.leftDate), moment(newDate));
    }

    e.preventDefault();
    e.stopPropagation();
  };

  increaseEndMonth = (e) => {
    const newDate = this.transformAndUpdateDate(
      "rightDate",
      "endDays",
      1,
      "month",
      newDate => false
    );

    if (this.props.monthView && newDate) {
      this.props.accept(moment(this.state.leftDate), moment(newDate));
    }

    e.preventDefault();
    e.stopPropagation();
  };

  decreaseEndYear = (e) => {
    const newDate = this.transformAndUpdateDate(
      "rightDate",
      "endDays",
      -1,
      "year",
      newDate => false
    );

    if (this.props.monthView && newDate) {
      this.props.accept(moment(this.state.leftDate), moment(newDate));
    }

    e.preventDefault();
    e.stopPropagation();
  };

  increaseEndYear = (e) => {
    const newDate = this.transformAndUpdateDate(
      "rightDate",
      "endDays",
      1,
      "year",
      newDate => false
    );

    if (this.props.monthView && newDate) {
      this.props.accept(moment(this.state.leftDate), moment(newDate));
    }

    e.preventDefault();
    e.stopPropagation();
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

  isOneOfSelected = (date, monthDate) => {
    const { startDate, endDate } = this.state;
    if (!date.isSame(monthDate, "month")) return false;

    return (
      (startDate && startDate.isSame(date, "day")) ||
      (endDate && endDate.isSame(date, "day"))
    );
  };

  isLeftHovered = (date) => {
    if (this.state.hovered) {
      if (date.isSameOrAfter(this.state.endDate, "day")) return false;
      if (
        date.isBefore(this.state.endDate, "day") &&
        date.isAfter(this.state.hovered, "day")
      )
        return true;
    } else {
      if (date.isSameOrAfter(this.state.endDate, "day")) return false;
      if (
        date.isBefore(this.state.endDate, "day") &&
        date.isAfter(this.state.startDate, "day")
      )
        return true;
    }
  };

  isRightHovered = (date) => {
    if (this.state.hovered) {
      if (date.isSameOrBefore(this.state.startDate, "day")) return false;
      if (
        date.isAfter(this.state.startDate, "day") &&
        date.isBefore(this.state.hovered, "day")
      )
        return true;
    } else {
      if (date.isSameOrBefore(this.state.startDate, "day")) return false;
      if (
        date.isBefore(this.state.endDate, "day") &&
        date.isAfter(this.state.startDate, "day")
      )
        return true;
    }
  };

  isLeftSelected = (date) => {
    if (this.state.hovered) {
      return date.isSame(this.state.endDate, "day");
    } else {
      return (
        date.isSame(this.state.endDate, "day") ||
        date.isSame(this.state.startDate, "day")
      );
    }
  };

  isRightSelected = (date) => {
    if (this.state.hovered) {
      return date.isSame(this.state.startDate, "day");
    } else {
      return (
        date.isSame(this.state.endDate, "day") ||
        date.isSame(this.state.startDate, "day")
      );
    }
  };

  onLeftSelect = (date, e) => {
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;

    if (this.state.startDate && this.state.startDate.isSame(date.date, "day")) {
      startDate = null;
    } else if (
      (this.state.endDate && this.state.endDate.isSame(date.date, "day")) ||
      (this.state.endDate && this.state.endDate.isBefore(date.date, "day"))
    ) {
      startDate = moment(date.date);
      endDate = null;
    } else {
      startDate = moment(date.date);
    }

    this.setState({ startDate, endDate }, () => {
      this.props.onLeftSelected();
    });

    e.preventDefault();
    e.stopPropagation();
  };

  isRightDisabled = (date) => {
    return this.state.startDate && date.isBefore(this.state.startDate, "day");
  };

  onRightSelect = (date, e) => {
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;

    if (this.state.endDate && this.state.endDate.isSame(date.date, "day")) {
      endDate = null;
    } else {
      endDate = moment(date.date);
    }

    this.setState({ startDate, endDate });

    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const {
      theme,
      positionX,
      positionY,
      monthView,
      isRightOpen,
      isLeftOpen,
      onRef,
      resetText,
      acceptText,
      showPointer,
    } = this.props;
    const { leftDate, rightDate, startDays, endDays } = this.state;

    const leftMonthes = [
      moment(leftDate).add(-3, "month"),
      moment(leftDate).add(-2, "month"),
      moment(leftDate).add(-1, "month"),
      moment(leftDate),
      moment(leftDate).add(1, "month"),
      moment(leftDate).add(2, "month"),
      moment(leftDate).add(3, "month")
    ];

    const rightMonthes = [
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
        innerRef={onRef}
        theme={theme}
        visible={isRightOpen || isLeftOpen}
        positionX={positionX}
        positionY={positionY}
        marginTop={panelMargin}
        onClick={this.onTopLevelClick}
      >
        <HalfC hidden={!isLeftOpen} theme={theme}>
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
              {leftMonthes.map((m, i) => (
                <Month
                  onClick={
                    this.state.rightDate.isSameOrBefore(m, "month")
                      ? null
                      : e => this.onLeftMonthClick(m)
                  }
                  key={i}
                  selected={this.state.leftDate.isSame(m, "month")}
                >
                  {this.state.rightDate.isSameOrBefore(m, "month")
                    ? null
                    : m.format("MMMM")}
                </Month>
              ))}
            </Months>
          ) : (
            <DaysView
              days={startDays}
              onSelect={this.onLeftSelect}
              onDayMouseEnter={this.onDayMouseEnter}
              onDayMouseOut={this.onDayMouseOut}
              theme={theme}
              hovered={this.isLeftHovered}
              selected={this.isLeftSelected}
            />
          )}
        </HalfC>

        <HalfC hidden={!isRightOpen} theme={theme}>
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
              {rightMonthes.map((m, i) => (
                <Month
                  onClick={
                    this.state.leftDate.isSameOrAfter(m, "month")
                      ? null
                      : e => this.onRightMonthClick(m)
                  }
                  key={i}
                  selected={this.state.rightDate.isSame(m, "month")}
                >
                  {this.state.leftDate.isSameOrAfter(m, "month")
                    ? ""
                    : m.format("MMMM")}
                </Month>
              ))}
            </Months>
          ) : (
            <DaysView
              onRef={el => (this.rightBottomDays = el)}
              days={endDays}
              disabled={this.isRightDisabled}
              onSelect={this.onRightSelect}
              onDayMouseEnter={this.onDayMouseEnter}
              onDayMouseOut={this.onDayMouseOut}
              theme={theme}
              hovered={this.isRightHovered}
              selected={this.isRightSelected}
            />
          )}
        </HalfC>

        <Actions
          theme={theme}
          onAccept={this.onAccept}
          resetText={resetText}
          onReset={this.onReset}
          acceptText={acceptText}
        />
      </DatePickerPanelWrap>
    );
  }
}

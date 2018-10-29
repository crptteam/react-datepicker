import moment from "moment/moment";
import React, { Component } from "react";
import { Button } from "@crpt/react-button";
import { getDaysArrayFromMomentDate } from "../../utils";

import DatePickerPanelWrap from "../../styled/DatePickerPanelWrap";
import HalfC from "../../styled/HalfC";
import TopWithPickers from "../../styled/TopWithPickers";
import PickerWrap from "../../styled/PickerWrap";
import MonthValueWrap from "../../styled/MonthValueWrap";
import YearValueWrap from "../../styled/YearValueWrap";
import BottomWithDays from "../../styled/BottomWithDays";
import Day from "../../styled/Day";
import DayWrap from "../../styled/DayWrap";
import Divider from "../../styled/Divider";
import IconWrap from "../../styled/IconWrap";
import Months from "../../styled/Months";
import Month from "../../styled/Month";
import { LeftDatepickerArrow } from "../../svg";
import { RightDatepickerArrow } from "../../svg";
import ActionsWrapper from "../../styled/ActionsWrapper";

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

    this.decreaseStartMonth = this.decreaseStartMonth.bind(this);
    this.increaseStartMonth = this.increaseStartMonth.bind(this);
    this.decreaseStartYear = this.decreaseStartYear.bind(this);
    this.increaseStartYear = this.increaseStartYear.bind(this);
    this.decreaseEndMonth = this.decreaseEndMonth.bind(this);
    this.increaseEndMonth = this.increaseEndMonth.bind(this);
    this.decreaseEndYear = this.decreaseEndYear.bind(this);
    this.increaseEndYear = this.increaseEndYear.bind(this);
    this.onLeftMonthClick = this.onLeftMonthClick.bind(this);
    this.onRightMonthClick = this.onRightMonthClick.bind(this);
    this.reset = this.reset.bind(this);
    this.accept = this.accept.bind(this);
    this.onTopLevelClick = this.onTopLevelClick.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.props.from !== props.from || this.props.to !== props.to) {
      this.updateSelectedDatesToSeeSelectedDays(props);
    }
  }

  reset() {
    this.props.reset();
    setTimeout(() => this.setState({ startDate: null, endDate: null }), 0);
  }

  accept() {
    this.props.accept(this.state.startDate, this.state.endDate, true);
  }

  onTopLevelClick(e) {
    if (e.target.contains(this.rightBottomDays)) {
      e.preventDefault();
    }
  }

  onLeftMonthClick(leftDate) {
    this.setState({ leftDate });
    this.props.accept(leftDate, this.state.rightDate);
  }

  onRightMonthClick(rightDate) {
    this.setState({ rightDate });
    this.props.accept(this.state.leftDate, rightDate);
  }

  updateSelectedDatesToSeeSelectedDays(nextProps) {
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

  decreaseStartMonth(e) {
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
  }

  increaseStartMonth(e) {
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
  }

  decreaseStartYear(e) {
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
  }

  increaseStartYear(e) {
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
  }

  decreaseEndMonth(e) {
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
  }

  increaseEndMonth(e) {
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
  }

  decreaseEndYear(e) {
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
  }

  increaseEndYear(e) {
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

  isOneOfSelected(date, monthDate) {
    const { startDate, endDate } = this.state;
    if (!date.isSame(monthDate, "month")) return false;

    return (
      (startDate && startDate.isSame(date, "day")) ||
      (endDate && endDate.isSame(date, "day"))
    );
  }

  isLeftHovered(date) {
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
  }

  isRightHovered(date) {
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
  }

  isLeftSelected(date) {
    if (this.state.hovered) {
      return date.isSame(this.state.endDate, "day");
    } else {
      return (
        date.isSame(this.state.endDate, "day") ||
        date.isSame(this.state.startDate, "day")
      );
    }
  }

  isRightSelected(date) {
    if (this.state.hovered) {
      return date.isSame(this.state.startDate, "day");
    } else {
      return (
        date.isSame(this.state.endDate, "day") ||
        date.isSame(this.state.startDate, "day")
      );
    }
  }

  onLeftSelect(date, e) {
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;

    if (this.state.startDate && this.state.startDate.isSame(date, "day")) {
      startDate = null;
    } else if (
      (this.state.endDate && this.state.endDate.isSame(date, "day")) ||
      (this.state.endDate && this.state.endDate.isBefore(date, "day"))
    ) {
      startDate = moment(date);
      endDate = null;
    } else {
      startDate = moment(date);
    }

    this.setState({ startDate, endDate }, () => {
      this.props.onLeftSelected();
      if (!this.props.controls) {
        this.props.accept(startDate, endDate);
      }
    });

    e.preventDefault();
    e.stopPropagation();
  }

  isRightDisabled(date) {
    return this.state.startDate && date.isBefore(this.state.startDate, "day");
  }

  onRightSelect(date, e) {
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;

    if (this.state.endDate && this.state.endDate.isSame(date, "day")) {
      endDate = null;
    } else {
      endDate = moment(date);
    }

    this.setState({ startDate, endDate }, () => {
      if (!this.props.controls) {
        this.props.onRightSelected();
        this.props.accept(startDate, endDate);
      }
    });

    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const {
      theme,
      positionX,
      positionY,
      controls,
      monthView,
      isRightOpen,
      isLeftOpen
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

    return (
      <DatePickerPanelWrap
        theme={theme}
        visible={isRightOpen || isLeftOpen}
        positionX={positionX}
        positionY={positionY}
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
            <BottomWithDays>
              {startDays.map(
                (d, i) =>
                  d.val === 0 ? (
                    <DayWrap theme={theme} key={i}>
                      <Day theme={theme} />
                    </DayWrap>
                  ) : (
                    <DayWrap
                      value={d.val}
                      theme={theme}
                      key={i}
                      onClick={e => this.onLeftSelect(d.date, e)}
                      onMouseEnter={e => this.onDayMouseEnter(e, d.date)}
                      onMouseOut={e => this.onDayMouseOut(e, d.date)}
                      hovered={this.isLeftHovered(d.date)}
                      selected={this.isLeftSelected(d.date)}
                    >
                      <Day
                        theme={theme}
                        hovered={this.isLeftHovered(d.date)}
                        selected={this.isLeftSelected(d.date)}
                      >
                        {d.val}
                      </Day>
                    </DayWrap>
                  )
              )}
            </BottomWithDays>
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
              <IconWrap onClick={this.decreaseEndYear}>
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
            <BottomWithDays innerRef={el => (this.rightBottomDays = el)}>
              {endDays.map(
                (d, i) =>
                  d.val === 0 ? (
                    <DayWrap theme={theme} key={i} disabled>
                      <Day theme={theme} />
                    </DayWrap>
                  ) : (
                    <DayWrap
                      disabled={this.isRightDisabled(d.date)}
                      onClick={e => this.onRightSelect(d.date, e)}
                      onMouseEnter={e => this.onDayMouseEnter(e, d.date)}
                      onMouseOut={e => this.onDayMouseOut(e, d.date)}
                      value={d.val}
                      hovered={this.isRightHovered(d.date)}
                      selected={this.isRightSelected(d.date)}
                      key={i}
                    >
                      <Day
                        theme={theme}
                        hovered={this.isRightHovered(d.date)}
                        selected={this.isRightSelected(d.date)}
                        disabled={this.isRightDisabled(d.date)}
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

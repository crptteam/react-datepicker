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

    const startDate = this.props.from ? moment(this.props.from) : moment();
    const endDate = this.props.to
      ? moment(this.props.to)
      : moment(startDate).add(1, "month");

    const leftDate = startDate;
    const rightDate = startDate.isSame(endDate, "month")
      ? moment(endDate)
      : endDate;

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
    this.onSelect = this.onSelect.bind(this);
    this.onTopLevelClick = this.onTopLevelClick.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.props.from !== props.from || this.props.to !== props.to) {
      this.updateSelectedDatesToSeeSelectedDays(props);
    }
  }

  reset() {
    this.props.reset();
  }

  accept() {
    this.props.accept(this.state.startDate, this.state.endDate);
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

  onSelect(day) {
    let from = this.state.startDate;
    let to = this.state.endDate;

    if (from && to) {
      const diffFrom = Math.abs(from.diff(day.date, "day"));
      const diffTo = Math.abs(to.diff(day.date, "day"));

      if (from.isSame(day.date, "day")) {
        if (!this.props.monthView) from = null;
      } else if (to.isSame(day.date, "day")) {
        if (!this.props.monthView) to = null;
      } else if (
        day.date.isAfter(from, "day") &&
        day.date.isBefore(to, "day")
      ) {
        if (diffFrom > diffTo) {
          from = moment(day.date);
        } else {
          to = moment(day.date);
        }
      } else if (day.date.isAfter(to, "day")) {
        from = moment(to);
        to = moment(day.date);
      } else if (day.date.isBefore(from, "day")) {
        to = moment(from);
        from = moment(day.date);
      }
    } else if (from) {
      if (day.date.isSame(from, "day")) {
        from = null;
      } else if (day.date.isAfter(from, "day")) {
        to = moment(day.date);
      } else if (day.date.isBefore(from, "day")) {
        to = moment(from);
        from = moment(day.date);
      }
    } else if (to) {
      if (day.date.isSame(to, "day")) {
        to = null;
      } else if (day.date.isAfter(to, "day")) {
        from = moment(to);
        to = moment(day.date);
      } else if (day.date.isBefore(to, "day")) {
        from = moment(day.date);
      }
    } else {
      from = moment(day.date);
    }

    this.setState({ startDate: from, endDate: to }, () => {
      if (!this.props.controls) {
        this.props.accept(from, to);
      }
    });
  }

  updateSelectedDatesToSeeSelectedDays(nextProps) {
    const props = nextProps || this.props;

    const startDate = props.from ? moment(props.from) : this.state.startDate;

    const endDate = props.to ? moment(props.to) : this.state.endDate;

    if (startDate && endDate) {
      if (startDate.isSame(endDate, "month")) {
        const rightDate = moment(startDate).add(1, "month");
        this.setState({
          startDate,
          endDate,
          leftDate: moment(startDate),
          rightDate,
          startDays: getDaysArrayFromMomentDate(startDate),
          endDays: getDaysArrayFromMomentDate(rightDate)
        });
      } else {
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

  isBetweenSelected(date, monthDate) {
    if (!this.state.endDate && !this.state.startDate) return false;
    if (!date.isSame(monthDate, "month")) return false;

    if (this.state.hovered) {
      if (this.state.endDate && this.state.startDate) {
        if (this.isOneOfSelected(this.state.hovered)) {
          return (
            date.isBefore(this.state.endDate, "day") &&
            date.isAfter(this.state.startDate, "day")
          );
        }

        const diffFrom = Math.abs(
          this.state.startDate.diff(this.state.hovered, "day")
        );
        const diffTo = Math.abs(
          this.state.endDate.diff(this.state.hovered, "day")
        );

        if (this.state.hovered.isSameOrAfter(this.state.endDate, "day")) {
          return (
            date.isAfter(this.state.endDate, "day") &&
            date.isBefore(this.state.hovered, "day")
          );
        } else if (
          this.state.hovered.isSameOrBefore(this.state.startDate, "day")
        ) {
          return (
            date.isAfter(this.state.hovered, "day") &&
            date.isBefore(this.state.startDate, "day")
          );
        } else if (
          this.state.hovered.isAfter(this.state.startDate, "day") &&
          this.state.hovered.isBefore(this.state.endDate, "day")
        ) {
          if (diffFrom > diffTo) {
            return (
              date.isBefore(this.state.endDate, "day") &&
              date.isAfter(this.state.hovered, "day")
            );
          } else {
            return (
              date.isBefore(this.state.hovered, "day") &&
              date.isAfter(this.state.startDate, "day")
            );
          }
        }
      } else if (this.state.endDate) {
        if (this.state.hovered.isAfter(this.state.endDate, "day")) {
          return (
            date.isAfter(this.state.endDate, "day") &&
            date.isBefore(this.state.hovered, "day")
          );
        } else if (this.state.hovered.isBefore(this.state.endDate, "day")) {
          return (
            date.isBefore(this.state.endDate, "day") &&
            date.isAfter(this.state.hovered, "day")
          );
        }
      } else if (this.state.startDate) {
        if (this.state.hovered.isAfter(this.state.startDate, "day")) {
          return (
            date.isAfter(this.state.startDate, "day") &&
            date.isBefore(this.state.hovered, "day")
          );
        } else if (this.state.hovered.isBefore(this.state.startDate, "day")) {
          return (
            date.isBefore(this.state.startDate, "day") &&
            date.isAfter(this.state.hovered, "day")
          );
        }
      }
    } else {
      if (this.state.endDate && this.state.startDate) {
        return (
          date.isBefore(this.state.endDate, "day") &&
          date.isAfter(this.state.startDate, "day")
        );
      }
    }
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

    if (this.state.startDate && this.state.startDate.isSame(date, 'day')) {
      startDate = null;
    }

    else if (this.state.endDate && this.state.endDate.isSame(date, 'day') || this.state.endDate && this.state.endDate.isBefore(date, 'day')) {
      startDate = moment(date);
      endDate = null;
    }

    else {
      startDate = moment(date);
    }

    this.setState({ startDate, endDate }, () => {
      if (!this.props.controls) {
        this.props.onLeftSelected();
        this.props.accept(startDate, endDate);
      }
    });

    e.preventDefault();
    e.stopPropagation();

  }

  isRightDisabled(date) {
    return this.state.startDate && date.isBefore(this.state.startDate, 'day');
  }

  onRightSelect(date, e) {
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;

    if (this.state.endDate && this.state.endDate.isSame(date, 'day')) {
      endDate = null;
    }

    else {
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
                    <Day theme={theme} key={i} />
                  ) : (
                    <Day
                      theme={theme}
                      onMouseEnter={e => this.onDayMouseEnter(e, d.date)}
                      onMouseOut={e => this.onDayMouseOut(e, d.date)}
                      hovered={this.isLeftHovered(d.date)}
                      selected={this.isLeftSelected(d.date)}
                      onClick={e => this.onLeftSelect(d.date, e)}
                      key={i}
                    >
                      {d.val}
                    </Day>
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
            <BottomWithDays innerRef={el => this.rightBottomDays = el}>
              {endDays.map(
                (d, i) =>
                  d.val === 0 ? (
                    <Day key={i} theme={theme} />
                  ) : (
                    <Day
                      theme={theme}
                      onMouseEnter={e => this.onDayMouseEnter(e, d.date)}
                      onMouseOut={e => this.onDayMouseOut(e, d.date)}
                      hovered={this.isRightHovered(d.date)}
                      selected={this.isRightSelected(d.date)}
                      onClick={e => this.onRightSelect(d.date, e)}
                      disabled={this.isRightDisabled(d.date)}
                      key={i}
                    >
                      {d.val}
                    </Day>
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

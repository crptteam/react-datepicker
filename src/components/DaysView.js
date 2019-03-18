import React from 'react';
import PropTypes from 'prop-types';
import BottomWithDays from "../styled/BottomWithDays";
import EmptyDay from "../styled/EmptyDay";
import DayWrap from "../styled/DayWrap";
import Day from "../styled/Day";
import WeekDay from '../styled/WeekDay';
import moment from 'moment';


const current = date => moment().isSame(date, 'day');

const DaysView = ({
  onRef,
  days,
  theme,
  onSelect,
  onDayMouseEnter,
  onDayMouseOut,
  disabled,
  hovered,
  selected,
  showCurrent,
}) => {
  return (
    <BottomWithDays innerRef={onRef}>
      <WeekDay>ПН</WeekDay>
      <WeekDay>ВТ</WeekDay>
      <WeekDay>СР</WeekDay>
      <WeekDay>ЧТ</WeekDay>
      <WeekDay>ПТ</WeekDay>
      <WeekDay>СБ</WeekDay>
      <WeekDay>ВС</WeekDay>
      {days.map(
        (d, i) =>
          d.val === 0 ? (
            <EmptyDay key={i} />
          ) : (
            <DayWrap
              key={i}
              value={d.val}
              theme={theme}
              onMouseDown={e => onSelect(d, e)}
              onMouseEnter={e => onDayMouseEnter(e, d.date)}
              onMouseOut={e => onDayMouseOut(e, d.date)}
              disabled={disabled(d.date)}
              hovered={hovered(d.date)}
              selected={selected(d.date)}
              current={showCurrent && current(d.date)}
            >
              <Day
                theme={theme}
                selected={selected(d.date)}
                hovered={hovered(d.date)}
                disabled={disabled(d.date)}
                current={showCurrent && current(d.date)}
              >
                {d.val}
              </Day>
            </DayWrap>
          )
      )}
      <EmptyDay />
      <EmptyDay />
      <EmptyDay />
      <EmptyDay />
      <EmptyDay />
      <EmptyDay />
    </BottomWithDays>
  );
};

DaysView.propTypes = {
  days: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  theme: PropTypes.shape({}).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDayMouseEnter: PropTypes.func.isRequired,
  onDayMouseOut: PropTypes.func.isRequired,
  selected: PropTypes.func.isRequired,
  onRef: PropTypes.func,
  disabled: PropTypes.func,
  hovered: PropTypes.func,
  showCurrent: PropTypes.bool,
};

DaysView.defaultProps = {
  onRef: () => {},
  disabled: () => false,
  hovered: () => false,
  showCurrent: false,
};


export default DaysView;

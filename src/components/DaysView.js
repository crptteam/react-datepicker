import React from 'react';
import PropTypes from 'prop-types';
import BottomWithDays from "../styled/BottomWithDays";
import EmptyDay from "../styled/EmptyDay";
import DayWrap from "../styled/DayWrap";
import Day from "../styled/Day";


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
}) => {
  return (
    <BottomWithDays innerRef={onRef}>
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
            >
              <Day
                theme={theme}
                selected={selected(d.date)}
                hovered={hovered(d.date)}
                disabled={disabled(d.date)}
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
};

DaysView.defaultProps = {
  onRef: () => {},
  disabled: () => false,
  hovered: () => false,
};


export default DaysView;

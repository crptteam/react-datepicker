import React from 'react';
import PropTypes from 'prop-types';
import Months from "../styled/Months";
import Month from "../styled/Month";
import moment from "moment";


const MonthView = ({
  date,
  onMonthClick,
 }) => {

  const months = [
    moment(date).add(-3, "month"),
    moment(date).add(-2, "month"),
    moment(date).add(-1, "month"),
    moment(date),
    moment(date).add(1, "month"),
    moment(date).add(2, "month"),
    moment(date).add(3, "month")
  ];

  return (
    <Months>
      {months.map((m, i) => (
        <Month
          onClick={e => onMonthClick(m)}
          key={i}
          selected={date.isSame(m, "month")}
        >
          {m.format("MMMM")}
        </Month>
      ))}
    </Months>
  );
};

MonthView.propTypes = {
  date: PropTypes.shape({}).isRequired,
  onMonthClick: PropTypes.func.isRequired,
};


export default MonthView;

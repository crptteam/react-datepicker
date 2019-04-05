import React from 'react';
import PropTypes from 'prop-types';
import Months from "../styled/Months";
import Month from "../styled/Month";
import {MonthsWrap} from "../styled/MonthsWrap";
import moment from "moment";


const MonthView = ({
  date,
  onMonthClick,
 }) => {

  const months = new Array(12).fill(1).map((v, i) => moment(i+1, 'MM'));

  return (
    <MonthsWrap>
      <Months>
        {months.slice(0, 6).map((m, i) => (
          <Month
            onClick={e => onMonthClick(m)}
            key={i}
            selected={date.format('MM') === m.format('MM')}
          >
            {m.format("MMMM")}
          </Month>
        ))}
      </Months>
      <Months>
        {months.slice(6,12).map((m, i) => (
          <Month
            onClick={e => onMonthClick(m)}
            key={i}
            selected={date.format('MM') === m.format('MM')}
          >
            {m.format("MMMM")}
          </Month>
        ))}
      </Months>
    </MonthsWrap>

  );
};

MonthView.propTypes = {
  date: PropTypes.shape({}).isRequired,
  onMonthClick: PropTypes.func.isRequired,
};


export default MonthView;

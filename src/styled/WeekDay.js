import styled from 'styled-components';
import { getThemeAsPlainTextByKeys, innerMerge } from '../utils';
import defaultTheme from '../theme/defaultTheme';
import React from 'react';

const Elem = styled.div`
  flex-basis: calc(100% / 7);
  margin-bottom: 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${props => props.color};
`;

const WeekDay = props => {

  const merged = innerMerge(
    {},
    defaultTheme.DatePicker,
    props.theme && props.theme.DatePicker ? props.theme.DatePicker : {}
  );

  const theme = getThemeAsPlainTextByKeys(merged);

  const mergedDay = innerMerge(
    {},
    defaultTheme.DatePicker && defaultTheme.DatePicker.Day || {},
    props.theme && props.theme.DatePicker && props.theme.DatePicker.Day || {}
  );

  Object.assign(
    theme,
    getThemeAsPlainTextByKeys(
      mergedDay,
      props.selected ? 'selected' : props.hovered ? 'hovered' : 'main'
    )
  );

  return <Elem {...theme} {...props} />;
};

export default WeekDay;

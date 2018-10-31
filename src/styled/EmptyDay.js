import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys, innerMerge } from '../utils';
import defaultTheme from '../theme/defaultTheme';

const Elem = styled.div`
  width: ${props => props.width};
  height: 0;
  display: inline-flex;
`;

const DayWrap = props => {

  const merged = innerMerge(
    {},
    defaultTheme.DatePicker,
    props.theme && props.theme.DatePicker ? props.theme.DatePicker : {}
  );

  const theme = getThemeAsPlainTextByKeys(merged);

  const mergedDay = innerMerge(
    {},
    defaultTheme.DatePicker && defaultTheme.DatePicker.DayWrap || {},
    props.theme && props.theme.DatePicker && props.theme.DatePicker.DayWrap || {}
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

export default DayWrap;

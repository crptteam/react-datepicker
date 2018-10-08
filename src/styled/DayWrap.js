import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys, innerMerge } from '../utils';
import defaultTheme from '../theme/defaultTheme';
import {Elem as DayElem} from './Day';

const Elem = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  display: inline-flex;
  vertical-align: top;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.value ? 'pointer' : 'none')};
  pointer-events: ${props => (props.disabled ? 'none' : props.children ? 'all' : 'none')};
  :nth-child(7n + 1) {
    margin-left: 4px;
  }
  :hover ${DayElem} {
    background: ${props => props.hoverBackground};
    color: ${props => props.hoverColor};
  }
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

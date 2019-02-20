import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys, innerMerge } from '../utils';
import defaultTheme from '../theme/defaultTheme';
import {Elem as DayElem} from './Day';

const Elem = styled.div`
  flex-basis: calc(100% / 7);
  margin-bottom: 8px;
  display: inline-flex;
  box-sizing: border-box;
  width: calc(100% / 7);
  vertical-align: top;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.value ? 'pointer' : 'none')};
  pointer-events: ${props => (props.disabled ? 'none' : props.children ? 'all' : 'none')};
  background: ${props => props.background};
  :hover ${DayElem} {
    background: ${props => props.hoverBackground};
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
      props.selected
        ? 'selected'
        : props.hovered
          ? 'hovered'
          : props.disabled
            ? 'disabled'
            : 'main'
    )
  );

  return <Elem {...theme} {...props} />;
};

export default DayWrap;

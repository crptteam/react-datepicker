import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys, innerMerge } from '../utils';
import defaultTheme from '../theme/defaultTheme';

export const Elem = styled.div`
  width: ${props => props.width};
  min-width: ${props => props.width};
  height: ${props => props.height};
  display: inline-block;
  border-radius: ${props => props.borderRadius};
  font-size: ${props => props.fontSize};
  text-align: center;
  line-height: 24px;
  font-weight: ${props => props.fontWeight};
  background: ${props => props.background};
  color: ${props => props.color};
  vertical-align: top;
  cursor: ${props => (props.children ? 'pointer' : 'none')};
  pointer-events: none;
  :hover {
    background: ${props => props.hoverBackground};
  }
`;

const Day = props => {

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

export default Day;

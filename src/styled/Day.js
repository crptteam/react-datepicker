import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys } from '../utils';
import defaultTheme from '../theme/defaultTheme';

const Elem = styled.div`
  width: ${props => props.width};
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
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: ${props => (props.children ? 'pointer' : 'none')};
  pointer-events: ${props => (props.children ? 'all' : 'none')};
  :nth-child(7n + 1) {
    margin-left: 4px;
  }
  :hover {
    background: ${props => props.hoverBackground};
    color: ${props => props.hoverColor};
  }
`;

const Day = props => {
  const theme = getThemeAsPlainTextByKeys(props.theme || defaultTheme);

  Object.assign(
    theme,
    getThemeAsPlainTextByKeys(
      (props.theme && props.theme.Day) || defaultTheme.Day,
      props.selected ? 'selected' : props.hovered ? 'hovered' : 'main'
    )
  );

  return <Elem {...theme} {...props} />;
};

export default Day;

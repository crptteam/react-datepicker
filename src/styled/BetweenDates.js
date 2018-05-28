import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys } from '../utils';
import defaultTheme from '../theme/defaultTheme';

const Elem = styled.span`
  display: inline-block;
  width: 16px;
  text-align: center;
  font-family: ${props => props.fontFamily};
  font-weight: ${props => props.bodyWeight};
  opacity: ${props => (props.visible ? 1 : 0)};
`;

const BetweenDates = props => {
  const theme = getThemeAsPlainTextByKeys(props.theme || defaultTheme);

  return <Elem {...theme} {...props} />;
};

export default BetweenDates;

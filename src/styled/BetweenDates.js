import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys, innerMerge } from '../utils';
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

  const merged = innerMerge(
    {},
    defaultTheme.DatePicker,
    props.theme && props.theme.DatePicker ? props.theme.DatePicker : {}
  );

  const theme = getThemeAsPlainTextByKeys(merged);

  return <Elem {...theme} {...props} />;
};

export default BetweenDates;

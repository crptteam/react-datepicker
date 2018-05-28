import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys } from '../utils';
import defaultTheme from '../theme/defaultTheme';

const Elem = styled.div`
  width: 70px;
  text-align: center;
  display: inline-block;
  font-size: ${props => props.fontSize};
  vertical-align: middle;
  padding-bottom: 2px;
`;

const MonthValueWrap = props => {
  const theme = getThemeAsPlainTextByKeys(
    props.theme || defaultTheme,
    props.disabled ? 'disabled' : props.isError ? 'error' : 'main'
  );

  return <Elem {...theme} {...props}  />;
};

export default MonthValueWrap;

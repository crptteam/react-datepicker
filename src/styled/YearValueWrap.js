import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys } from '@crpt/utils';
import defaultTheme from '../theme/defaultTheme';

const Elem = styled.div`
  width: 50px;
  text-align: center;
  display: inline-block;
  font-size: ${props => props.fontSize};
  vertical-align: middle;
  padding-bottom: 1px;
`;

const YearValueWrap = props => {
  const theme = getThemeAsPlainTextByKeys(
    props.theme || defaultTheme,
    props.disabled ? 'disabled' : props.isError ? 'error' : 'main'
  );

  return <Elem {...theme} {...props}  />;
};

export default YearValueWrap;

import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys } from '@crpt/utils';
import defaultTheme from '../theme/defaultTheme';

const Elem = styled.div`
  display: inline-block;
  width: 208px;
  font-size: ${props => props.fontSize};
  vertical-align: top;
`;

const HalfC = props => {
  const theme = getThemeAsPlainTextByKeys(
    props.theme || defaultTheme,
    props.disabled ? 'disabled' : props.isError ? 'error' : 'main'
  );

  return <Elem {...theme} {...props}  />;
};

export default HalfC;

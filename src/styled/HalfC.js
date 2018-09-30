import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys, innerMerge } from '../utils';
import defaultTheme from '../theme/defaultTheme';

const Elem = styled.div`
  display: ${props => props.hidden ? 'none' : 'inline-block'};
  width: 208px;
  font-size: ${props => props.fontSize};
  vertical-align: top;
`;

const HalfC = props => {

  const merged = innerMerge(
    {},
    defaultTheme.DatePicker,
    props.theme && props.theme.DatePicker ? props.theme.DatePicker : {}
  );

  const theme = getThemeAsPlainTextByKeys(
    merged,
    props.disabled ? 'disabled' : props.isError ? 'error' : 'main'
  );

  return <Elem {...theme} {...props}  />;
};

export default HalfC;

import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys, innerMerge } from '../utils';
import defaultTheme from '../theme/defaultTheme';

const Elem = styled.div`
  width: 100%;
  display: block;
  font-size: 0px;
  box-sizing: border-box;
  padding-left: 4px;
  padding-right: 4px;
`;

const TopWithPickers = props => {

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

export default TopWithPickers;

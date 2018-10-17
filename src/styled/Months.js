import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys, innerMerge } from '../utils';
import defaultTheme from '../theme/defaultTheme';

const Elem = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  align-items: center;
  box-sizing: border-box;
`;

const Months = props => {

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

export default Months;

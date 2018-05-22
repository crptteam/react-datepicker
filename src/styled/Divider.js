import React from 'react';
import styled from 'styled-components';

import { getThemeAsPlainTextByKeys } from '@crpt/utils';
import defaultTheme from '../theme/defaultTheme';

const Elem = styled.div`
  width: 60px;
  display: inline-block;
  font-size: ${props => props.fontSize};
  height: 100%;
  text-align: center;
  margin-top: 103px;
`;

const Divider = props => {
  const theme = getThemeAsPlainTextByKeys(props.theme || defaultTheme);

  return <Elem {...theme} {...props} />;
};

export default Divider;

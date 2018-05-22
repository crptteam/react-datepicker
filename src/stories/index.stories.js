import React from 'react';

import { storiesOf } from '@storybook/react';

import { withKnobs } from '@storybook/addon-knobs/react';

import { DatePicker, RangePicker } from '../index';

const elements = storiesOf('DatePicker', module);

elements.addDecorator(withKnobs);

elements.add('DatePicker', () => {
  return  <DatePicker
    onChange={val => console.log(val)}
  />;
});

elements.add('RangePicker', () => {
  return  <RangePicker
    onChange={val => console.log(val)}
  />;
});





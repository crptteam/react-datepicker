# react-datepicker

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

# DatePicker

Компонент выбора диапазона дат.
Может работать в режиме выбора даты и в режиме выбора диапазона.

## Usage

```javascript

import { DatePicker } from  "@crpt/crpt-react-library";


<DatePicker onChange={newVal => alert("newVal:", newVal)} double from="2012-12-12" to="2014/01/02" />

```

| PropName | Описание | Пример |
|---|---|---|
| double: Boolean  | Если равен true, то DatePicker работает в режиме выбора диапазона. |  `<DatePicker double  />` |
| from: String  | Стартовая дата диапазона в формате ISO 8601.<br/>Используется в режиме double. |  `<DatePicker double from="2012-12-12" />` |
| to: String | Конечная дата диапазона в формате ISO 8601.<br/>Используется в режиме double. |  `<DatePicker double to="2014/01/02" />` |
| date: String | Выбранная дата в формате ISO 8601.<br/>Используется в моно-режиме (режим по умолчанию). |  `<DatePicker date="2014/01/02" />` |
| onChange: Function | Вызывается, когда меняется значение в DatePicker, параметром принимает объект с полями to и from в double-режиме или date. |  `<DatePicker onChange={val => alert(val)} />` |
| onUpdate: Function | Вызывается, когда DatePicker теряет фокус или пользователь нажимает Enter. |  `<DatePicker onUpdate={val => alert(val)} />` |


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

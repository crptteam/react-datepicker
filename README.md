# react-datepicker

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

# DatePicker

Компоненты выбора даты DatePicker и диапазона дат RangePicker.

## Usage

```javascript

import { DatePicker, RangePicker } from  "@crpt/react-datepicker";


<DatePicker onChange={newVal => alert("newVal:", newVal)}  date="12.12.2012" />

```

### DatePicker

| PropName | Описание | Пример |
|---|---|---|
| date: String | Выбранная дата в формате ISO 8601.<br/>Используется в моно-режиме (режим по умолчанию). |  `<DatePicker date="2014/01/02" />` |
| onChange: Function | Вызывается, когда меняется значение в DatePicker, параметром принимает объект с полем date. |  `<DatePicker onChange={val => alert(val)} />` |
| onUpdate: Function | Вызывается, когда DatePicker теряет фокус или пользователь нажимает Enter. |  `<DatePicker onUpdate={val => alert(val)} />` |


### RangePicker

| PropName | Описание | Пример |
|---|---|---|
| from: String  | Стартовая дата диапазона в формате ISO 8601. |  `<RangePicker from="2012-12-12" />` |
| to: String | Конечная дата диапазона в формате ISO 8601. |  `<RangePicker to="2014/01/02" />` |
| onChange: Function | Вызывается, когда меняется значение в DatePicker, параметром принимает объект с полями to и from. |  `<RangePicker onChange={val => alert(val)} />` |
| onUpdate: Function | Вызывается, когда RangePicker теряет фокус или пользователь нажимает Enter. |  `<RangePicker onUpdate={val => alert(val)} />` |


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

import React from "react";
import { DatePicker } from "../src/";

describe("DatePicker", () => {

  it("Should renders without problems", () => {

    const wrapper = shallow(
      <DatePicker/>
    );

    expect(wrapper).toMatchSnapshot();
  });
});


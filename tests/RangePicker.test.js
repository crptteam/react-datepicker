import React from "react";
import { RangePicker } from "../src/";

describe("RangePicker", () => {

  it("Should renders without problems", () => {

    const wrapper = shallow(
      <RangePicker/>
    );

    expect(wrapper).toMatchSnapshot();
  });
});


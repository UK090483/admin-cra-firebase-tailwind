/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FirstRoundFilter from "./FirstRoundFilter";
import { TestWrap } from "tests/testPrepare";
import { testRows } from "components/Table/tests/testPrepare";

describe("FirstRoundFilter", () => {
  test("sets Filter", () => {
    const setFilter = jest.fn();
    const { getByText, debug } = render(
      <TestWrap>
        <FirstRoundFilter
          setFilter={setFilter}
          filter={null}
          columns={[]}
          rows={testRows}
        />
      </TestWrap>
    );

    fireEvent.click(getByText("Offen 4"));
    expect(setFilter).toBeCalledTimes(1);
    expect(setFilter).toBeCalledWith({ statePre: [["===", undefined]] });

    setFilter.mockRestore();

    fireEvent.click(getByText("All 4"));
    expect(setFilter).toBeCalledTimes(1);
    expect(setFilter).toBeCalledWith(null);

    setFilter.mockRestore();

    fireEvent.click(getByText("Vielleicht 0"));
    expect(setFilter).toBeCalledTimes(1);
    expect(setFilter).toBeCalledWith({ statePre: [["===", "postponed"]] });

    setFilter.mockRestore();

    fireEvent.click(getByText("Nein 0"));
    expect(setFilter).toBeCalledTimes(1);
    expect(setFilter).toBeCalledWith({ statePre: [["===", "declined"]] });

    setFilter.mockRestore();

    fireEvent.click(getByText("Ja 0"));
    expect(setFilter).toBeCalledTimes(1);
    expect(setFilter).toBeCalledWith({ statePre: [["===", "accepted"]] });
  });
});

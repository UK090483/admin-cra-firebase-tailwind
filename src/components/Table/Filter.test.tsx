/**
 * @jest-environment jsdom
 */

import React from "react";

import Filter from "./Filter";
import { testRows, testColumns } from "./tests/testPrepare";
import { ITableOptions } from "./types";
import { render } from "@testing-library/react";

describe("TableFilter", () => {
  it("should not render with no Option", async () => {
    const { queryByTestId } = render(
      <Filter
        rows={[]}
        filter={{}}
        setFilter={() => {}}
        columns={testColumns}
        options={{}}
      ></Filter>
    );
    expect(queryByTestId("filter")).toBeFalsy();
  });
  it("should  render with no Option.showFilter true", async () => {
    const { queryByTestId } = render(
      <Filter
        rows={[]}
        filter={{}}
        setFilter={() => {}}
        columns={testColumns}
        options={{ showFilter: true }}
      ></Filter>
    );
    expect(queryByTestId("filter")).toBeTruthy();
  });

  it("should show filter", async () => {
    const { queryByTestId, getByText } = render(
      <Filter
        rows={[]}
        filter={{ name: [["===", "b"]] }}
        setFilter={() => {}}
        columns={testColumns}
        options={{ showFilter: true }}
      ></Filter>
    );
    expect(queryByTestId("table_show_filter")).toBeTruthy();

    getByText("name");
    getByText("===");
    getByText("b");
  });

  it("should  render fixed Filters", async () => {
    const { queryByTestId } = render(
      <Filter
        rows={[]}
        filter={{}}
        setFilter={() => {}}
        columns={testColumns}
        options={{
          fixedFilter: (filter, setFilter, columns) => (
            <div data-testid="fixedFilter"></div>
          ),
        }}
      ></Filter>
    );
    expect(queryByTestId("fixedFilter")).toBeTruthy();
  });
});

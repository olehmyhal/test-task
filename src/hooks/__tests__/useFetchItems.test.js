import { renderHook } from "@testing-library/react";
import useFetchItems from "../useFetchItems";

describe("useFetchItems", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
        ok: true,
      })
    );
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it("should return an array containing data, isLoading and error", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchItems("/items")
    );

    expect(result.current).toEqual([[], false, null]);

    await waitForNextUpdate();

    expect(result.current).toEqual([[], false, null]);
  });

  it("should set isLoading to true when fetching data", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchItems("/items")
    );

    expect(result.current[1]).toEqual(false);

    await waitForNextUpdate();

    expect(result.current[1]).toEqual(true);
  });

  it("should set data when fetch is successful", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, name: "Item 1" }]),
        ok: true,
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchItems("/items")
    );

    await waitForNextUpdate();

    expect(result.current[0]).toEqual([{ id: 1, name: "Item 1" }]);
  });

  it("should set error when fetch fails", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.reject(new Error("Error occurred")),
        ok: false,
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchItems("/items")
    );

    await waitForNextUpdate();

    expect(result.current[2]).toEqual("Error occurred");
  });
});

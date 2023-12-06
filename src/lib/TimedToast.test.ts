import "@testing-library/jest-dom/vitest";
import { cleanup, render, waitFor } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import TimedToast from "./TimedToast.svelte";

describe("TimedToast", function () {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
  });

  it("should dispatch a toast:closed event when the toast becomes invisible", () => {
    const { component } = render(TimedToast, {
      props: { id: 1 },
    });

    const callback = vi.fn();

    component.$on("toast:closed", callback);

    vi.runAllTimers();

    return waitFor(() => {
      expect(callback).toHaveBeenCalledOnce();
      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({ detail: { id: 1 } }),
      );
    });
  });
});

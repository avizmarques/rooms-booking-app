import { describe, expect, it, vi } from "vitest";

import * as useRooms from "@/context/roomsContext";
import {
  fireEvent,
  getByLabelText,
  getByRole,
  render,
} from "@testing-library/react";
import { BookingDialog } from "@/components/BookingDialog";

describe("Booking Dialog", () => {
  const useRoomsSpy = vi.spyOn(useRooms, "useRooms");

  describe("if there is a booking room in context", () => {
    const updateRoomsMock = vi.fn();

    useRoomsSpy.mockReturnValue({
      rooms: [],
      setRooms: () => {},
      bookingRoom: {
        name: "Helmold",
        spots: 5,
        thumbnail:
          "https://images.unsplash.com/photo-1539872209618-fb1770aa6ff8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1251&q=80",
      },
      setBookingRoom: () => {},
      updateRoom: updateRoomsMock,
    });

    const { getByTestId } = render(<BookingDialog />);

    it("should display the booking dialog", () => {
      expect(getByTestId("booking-dialog")).toBeTruthy();
    });

    it("should display a form", () => {
      expect(getByTestId("booking-form")).toBeTruthy();
    });

    it("should display a spots input field", () => {
      expect(getByLabelText(getByTestId("booking-form"), "Spots")).toBeTruthy();
    });

    it("should not allow you to submit if the number of spots to book is more than the available number of spots", () => {
      const form = getByTestId("booking-form");

      fireEvent.change(getByLabelText(form, "Spots"), {
        target: { value: 10 },
      });

      fireEvent.click(getByRole(form, "button"));

      expect(updateRoomsMock).toHaveBeenCalledTimes(0);
    });
  });
});

import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";

import * as useRooms from "@/context/roomsContext";
import { RoomCard } from "@/components/RoomCard";

describe("RoomCard", () => {
  const useRoomsSpy = vi.spyOn(useRooms, "useRooms");
  const setBookingRoomMock = vi.fn();

  useRoomsSpy.mockReturnValue({
    rooms: [],
    setRooms: () => {},
    bookingRoom: null,
    setBookingRoom: setBookingRoomMock,
    updateRoom: () => {},
  });

  describe("When the book button is clicked", () => {
    const room = {
      name: "Mostafa",
      spots: 4,
      thumbnail:
        "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    };

    const { getByRole } = render(<RoomCard room={room} />);
    fireEvent.click(getByRole("button"));

    it("should call the setBookingRoom function once", () => {
      expect(setBookingRoomMock).toHaveBeenCalledOnce();
    });
  });
});

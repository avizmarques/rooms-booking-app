import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

import Home from "@/pages";
import * as useRooms from "@/context/roomsContext";

describe("Home", () => {
  const useRoomsSpy = vi.spyOn(useRooms, "useRooms");

  describe("if the API returns an array with 3 elements", () => {
    const rooms = [
      {
        name: "Ljerka",
        spots: 43,
        thumbnail:
          "https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1504&q=80",
      },
      {
        name: "Mostafa",
        spots: 4,
        thumbnail:
          "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      },
      {
        name: "Helmold",
        spots: 86,
        thumbnail:
          "https://images.unsplash.com/photo-1539872209618-fb1770aa6ff8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1251&q=80",
      },
    ];

    useRoomsSpy.mockReturnValue({
      rooms,
      setRooms: () => {},
      bookingRoom: null,
      setBookingRoom: () => {},
      updateRoom: () => {},
    });

    it("should render 3 rooms", () => {
      const { getByTestId } = render(<Home rooms={rooms} />);
      expect(getByTestId("rooms-list").children.length).toBe(rooms.length);
    });
  });
});

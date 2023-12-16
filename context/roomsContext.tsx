import { Room } from "@/pages";
import { ReactNode, createContext, useContext, useState } from "react";

type RoomsContextType = {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
  updateRoom: ({ name, spotsToBook }: UpdateRoomProps) => void;
  bookingRoom: Room | null;
  setBookingRoom: (room: Room | null) => void;
};

type UpdateRoomProps = {
  name: Room["name"];
  spotsToBook: Room["spots"];
};

const RoomsContext = createContext<RoomsContextType>({
  rooms: [],
  setRooms: () => {},
  updateRoom: () => {},
  bookingRoom: null,
  setBookingRoom: () => {},
});

export function RoomsProvider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookingRoom, setBookingRoom] =
    useState<RoomsContextType["bookingRoom"]>(null);

  const updateRoom = ({ name, spotsToBook }: UpdateRoomProps) => {
    const updatedRooms = rooms.map((room) =>
      room.name === name
        ? { name, spots: room.spots - spotsToBook, thumbnail: room.thumbnail }
        : room
    );

    setRooms(updatedRooms);
  };

  return (
    <RoomsContext.Provider
      value={{ rooms, setRooms, updateRoom, bookingRoom, setBookingRoom }}
    >
      {children}
    </RoomsContext.Provider>
  );
}

export function useRooms() {
  return useContext(RoomsContext);
}

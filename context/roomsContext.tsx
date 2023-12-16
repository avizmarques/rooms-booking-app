import { Room } from "@/pages";
import { ReactNode, createContext, useContext, useState } from "react";

type RoomsContextType = {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
};

const RoomsContext = createContext<RoomsContextType>({
  rooms: [],
  setRooms: () => {},
});

export function RoomsProvider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>([]);

  return (
    <RoomsContext.Provider value={{ rooms, setRooms }}>
      {children}
    </RoomsContext.Provider>
  );
}

export function useRooms() {
  return useContext(RoomsContext);
}

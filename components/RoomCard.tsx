import Image from "next/image";

import { useRooms } from "@/context/roomsContext";
import { Room } from "@/pages";

export const RoomCard = ({ room }: { room: Room }) => {
  const { setBookingRoom } = useRooms();

  return (
    <li>
      <button
        onClick={() => setBookingRoom(room)}
        className="flex flex-col items-stretch w-full text-start group"
      >
        <div className="aspect-[328/220] overflow-hidden rounded-xl relative">
          <Image
            src={room.thumbnail}
            alt={room.name}
            fill
            // sizes="" todo: optimization
            className="object-cover rounded-[11px] relative hover:scale-110 transition-all duration-500"
          />
        </div>
        <div className="flex items-start justify-between text-lg mt-3 pb-11">
          <div>
            <h2 className="text-lg font-bold text-theme-black">{room.name}</h2>
            <p className="text-lg text-primary">{room.spots} spots remaining</p>
          </div>

          <div className="min-w-[90px] h-[29px] bg-primary rounded-[4px] text-white text-xs font-bold flex items-center justify-center group-hover:bg-fuchsia-900 transition-colors duration-500">
            Book!
          </div>
        </div>
      </button>
    </li>
  );
};

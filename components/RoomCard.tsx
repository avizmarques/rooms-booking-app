import Image from "next/image";

import { useRooms } from "@/context/roomsContext";
import { Room } from "@/pages";

export const RoomCard = ({ room }: { room: Room }) => {
  const { setBookingRoom } = useRooms();

  return (
    <li>
      <button
        onClick={() => setBookingRoom(room)}
        disabled={room.spots === 0}
        className="flex flex-col items-stretch w-full text-start group disabled:opacity-60"
      >
        <div className="aspect-[328/220] overflow-hidden rounded-xl relative">
          <Image
            src={room.thumbnail}
            alt={room.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className={`object-cover rounded-[11px] relative ${
              room.spots !== 0 && "hover:scale-110 transition-all duration-500"
            }`}
          />
        </div>
        <div className="flex items-start justify-between text-lg mt-3 pb-11">
          <div>
            <h2 className="text-lg font-bold text-theme-black">{room.name}</h2>
            <p className="text-lg text-primary">{room.spots} spots remaining</p>
          </div>

          <div className="min-w-[90px] h-[29px] bg-primary rounded-[4px] text-white text-xs font-bold flex items-center justify-center group-hover:bg-fuchsia-900 transition-colors duration-500 group-disabled:bg-primary">
            Book!
          </div>
        </div>
      </button>
    </li>
  );
};

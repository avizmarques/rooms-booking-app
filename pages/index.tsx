import { GetStaticProps, InferGetStaticPropsType } from "next";

import { RoomCard } from "@/components/RoomCard";
import { useRooms } from "@/context/roomsContext";
import { useEffect } from "react";
import { BookingDialog } from "@/components/BookingDialog";

export type Room = {
  name: string;
  spots: number;
  thumbnail: string;
};

export default function Home({
  rooms: initialRooms,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { rooms, setRooms } = useRooms();
  const displayedRooms = rooms.length > 0 ? rooms : initialRooms;

  useEffect(() => {
    setRooms(initialRooms);
  }, [setRooms, initialRooms]);

  return (
    <main className="pt-[30px] pb-[60px] max-w-[1440px] px-4 md:px-[34px] mx-auto">
      <h1 className="text-4xl text-theme-black">Rooms</h1>
      <p className="text-theme-gray max-w-[562px] mt-2 text-xl">
        Odio nisi, lectus dis nulla. Ultrices maecenas vitae rutrum dolor
        ultricies donec risus sodales. Tempus quis et.
      </p>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5 mt-[72px]">
        {displayedRooms.map((room, i) => (
          <RoomCard room={room} key={i} />
        ))}
      </ul>

      <BookingDialog />
    </main>
  );
}

export const getStaticProps = (async () => {
  const res = await fetch("https://wetransfer.github.io/rooms.json");
  const { rooms } = await res.json();

  return { props: { rooms } };
}) satisfies GetStaticProps<{
  rooms: Room[];
}>;

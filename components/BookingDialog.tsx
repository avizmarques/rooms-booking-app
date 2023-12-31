import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";

import { useRooms } from "@/context/roomsContext";
import { XMarkIcon } from "@heroicons/react/20/solid";

export const BookingDialog = () => {
  const { bookingRoom, setBookingRoom, updateRoom } = useRooms();
  const [spotsToBook, setSpotsToBook] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (bookingRoom?.name && spotsToBook) {
      updateRoom({ name: bookingRoom.name, spotsToBook: Number(spotsToBook) });
    }

    setSpotsToBook("");
    setBookingRoom(null);
  };

  return (
    <Dialog.Root
      open={Boolean(bookingRoom)}
      onOpenChange={() => setBookingRoom(null)}
    >
      <AnimatePresence>
        {Boolean(bookingRoom) ? (
          <Dialog.Portal forceMount>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, animationDuration: "0.18s" }}
              exit={{ opacity: 0 }}
            >
              <Dialog.Overlay className="fixed inset-0 z-40 bg-black opacity-30" />
            </motion.div>

            <Dialog.Content data-testid="booking-dialog" asChild forceMount>
              <motion.div
                initial={{ transform: "translate(-50%, -48%) scale(0.95)" }}
                animate={{
                  transform: "translate(-50%, -50%) scale(1)",
                  opacity: 1,
                  animationDuration: "0.18s",
                }}
                exit={{
                  transform: "translate(-50%, -48%) scale(0.95)",
                  opacity: 0,
                }}
                className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[90vw] max-w-[450px] bg-white rounded-md py-6 px-4 md:px-6 z-50"
              >
                <Dialog.Title className="text-lg font-bold text-theme-black">
                  Book meeting room {bookingRoom?.name}
                </Dialog.Title>
                <Dialog.Description className="text-theme-gray mt-2">
                  Spots available: {bookingRoom?.spots}
                </Dialog.Description>

                <form
                  data-testid="booking-form"
                  onSubmit={onSubmit}
                  className="mt-4 flex flex-col"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="spots"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Spots
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="spots"
                        id="spots"
                        placeholder="1"
                        value={spotsToBook}
                        onChange={(e) => setSpotsToBook(e.target.value)}
                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        min={1}
                        max={bookingRoom?.spots}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={
                      !Boolean(spotsToBook) ||
                      Number(spotsToBook) > Number(bookingRoom?.spots)
                    }
                    className="mt-10 min-w-[90px] h-[40px] bg-primary hover:bg-fuchsia-900 transition-color duration-500 rounded-[4px] text-white font-bold flex items-center justify-center disabled:opacity-30 disabled:bg-primary"
                  >
                    Book!
                  </button>
                </form>

                <Dialog.Close className="absolute top-6 right-6 text-gray-800">
                  <XMarkIcon className="w-6 h-6" />
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function DesktopMenu() {
  return (
    <div className="hidden md:flex space-x-10 items-center">
      <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-400">
        Explore
      </Link>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-blue-400">
          Event Creator
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 mt-2 w-56 bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-800">
            <MenuItem>
              <Link
                to="/create-event"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Create Event
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/my-events"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                My Events
              </Link>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
      <Link
        to="/contact-us"
        className="hover:text-blue-500 dark:hover:text-blue-400"
      >
        Contact Us
      </Link>
    </div>
  );
}

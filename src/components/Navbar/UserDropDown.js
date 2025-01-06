import React, { Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function UserDropdown({ user, handleLogout }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex items-center gap-1 font-bold hover:text-blue-500 dark:hover:text-blue-400">
        Hi, {user.name}!
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
        <MenuItems className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-800">
          <MenuItem>
            <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Dashboard
            </Link>
          </MenuItem>
          <MenuItem>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Logout
            </button>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

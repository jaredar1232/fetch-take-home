import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import DogLogo from "../assets/dog.svg"
import { useAuth } from "../context/AuthContext";
import ProfilePic from "../assets/pfp.jpg";

export default function Navbar() {
    const { logout } = useAuth();
    const activeClass = "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900";
    const inactiveClass = "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700";

    return (
        <Disclosure as="nav" className="fixed top-0 left-0 right-0 z-50 bg-white p-4 sm:bg-transparent">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 rounded-3xl bg-white shadow-md">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="hidden sm:flex shrink-0 items-center">
                            <NavLink to="/">
                                <img alt="Your Company" src={DogLogo} className="h-8 w-auto" />
                            </NavLink>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                            >
                                Explore Dogs
                            </NavLink>
                            <NavLink
                                to="/favorites"
                                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                            >
                                Favorites
                            </NavLink>
                            <NavLink
                                to="/get-a-match"
                                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                            >
                                Get A Match
                            </NavLink>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <button
                            type="button"
                            className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="w-6 h-6" />
                        </button>
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="flex rounded-full bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt="User profile"
                                        src={ProfilePic}
                                        className="w-8 h-8 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                <MenuItem>
                                    {({ focus }) => (
                                        <NavLink
                                            to="/profile"
                                            className={`block px-4 py-2 text-sm ${focus ? 'bg-gray-100 text-gray-700' : 'text-gray-700'}`}
                                        >
                                            Your Profile
                                        </NavLink>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ focus }) => (
                                        <NavLink
                                            to="/settings"
                                            className={`block px-4 py-2 text-sm ${focus ? 'bg-gray-100 text-gray-700' : 'text-gray-700'}`}
                                        >
                                            Settings
                                        </NavLink>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ focus }) => (
                                        <button
                                            onClick={() => logout()}
                                            className={`block px-4 py-2 text-sm ${focus ? 'bg-gray-100' : 'text-gray-700'}`}
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block w-6 h-6 group-data-open:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden w-6 h-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="sm:hidden">
                <div className="space-y-1 pt-2 pb-3">
                    <DisclosureButton
                        as={NavLink}
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700"
                                : "block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                        }
                    >
                        Explore Dogs
                    </DisclosureButton>
                    <DisclosureButton
                        as={NavLink}
                        to="/favorites"
                        className={({ isActive }) =>
                            isActive
                                ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700"
                                : "block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                        }
                    >
                        Favorites
                    </DisclosureButton>
                    <DisclosureButton
                        as={NavLink}
                        to="/get-a-match"
                        className={({ isActive }) =>
                            isActive
                                ? "block border-l-4 border-indigo-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-indigo-700"
                                : "block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                        }
                    >
                        Get A Match
                    </DisclosureButton>
                </div>
                <div className="border-t border-gray-200 pt-4 pb-3">
                    <div className="flex items-center px-4">
                        <div className="shrink-0">
                            <img
                                alt="User profile"
                                src={ProfilePic}
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium text-gray-800">Tom Cook</div>
                            <div className="text-sm font-medium text-gray-500">tom@example.com</div>
                        </div>
                        <button
                            type="button"
                            className="ml-auto rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-3 space-y-1">
                        <DisclosureButton
                            as={NavLink}
                            to="/profile"
                            className={({ isActive }) =>
                                isActive
                                    ? "block px-4 py-2 text-base font-medium text-indigo-700 bg-indigo-50"
                                    : "block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                            }
                        >
                            Your Profile
                        </DisclosureButton>
                        <DisclosureButton
                            as={NavLink}
                            to="/settings"
                            className={({ isActive }) =>
                                isActive
                                    ? "block px-4 py-2 text-base font-medium text-indigo-700 bg-indigo-50"
                                    : "block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                            }
                        >
                            Settings
                        </DisclosureButton>
                        <DisclosureButton
                            as={NavLink}
                            to="/signout"
                            className={({ isActive }) =>
                                isActive
                                    ? "block px-4 py-2 text-base font-medium text-indigo-700 bg-indigo-50"
                                    : "block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                            }
                        >
                            Sign out
                        </DisclosureButton>
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
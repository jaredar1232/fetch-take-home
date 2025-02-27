import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function SizeDropdown({ size, setSize }) {
    // Pre-set values for dropdown, currently set for displaying rows of three
    const options = [9, 24, 48, 99]

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                    {size}
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 h-5 w-5 text-gray-400"
                    />
                </MenuButton>
            </div>
            <MenuItems className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-none">
                <div className="py-1">
                    {options.map((option) => (
                        <MenuItem key={option}>
                            {({ focus }) => (
                                <button
                                    onClick={() => setSize(option)}
                                    className={`block w-full px-4 py-2 text-left text-sm ${
                                        focus
                                            ? 'bg-gray-100 text-gray-900'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    {option}
                                </button>
                            )}
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    )
}

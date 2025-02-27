import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const ageOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

function AgeDropdown({ value, setValue }) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                    {value}
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 h-5 w-5 text-gray-400"
                    />
                </MenuButton>
            </div>
            <MenuItems className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-none">
                <div className="py-1">
                    {ageOptions.map((option) => (
                        <MenuItem key={option}>
                            {({ focus }) => (
                                <button
                                    onClick={() => setValue(option)}
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

export default function AgeRangeDropdown({
    minAge,
    setMinAge,
    maxAge,
    setMaxAge,
}) {
    return (
        <div className="flex flex-col items-center">
            <label className="mb-1 block text-center text-sm font-medium text-gray-700">
                Age Range
            </label>
            <div className="flex space-x-2">
                <AgeDropdown value={minAge} setValue={setMinAge} />
                <AgeDropdown value={maxAge} setValue={setMaxAge} />
            </div>
        </div>
    )
}

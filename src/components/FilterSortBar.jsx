import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import {
    ChevronDownIcon,
    ChevronRightIcon,
    AdjustmentsHorizontalIcon,
} from '@heroicons/react/20/solid'
import { breedList } from './BreedList'
import AgeRangeDropdown from './AgeDropdowns'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const sortOptions = [
    { value: 'breed:asc', label: 'Breed A-Z' },
    { value: 'breed:desc', label: 'Breed Z-A' },
    { value: 'age:asc', label: 'Age Asc' },
    { value: 'age:desc', label: 'Age Desc' },
]

function ZipCodeInput({ zipCode, setZipCode }) {
    return (
        <div className="flex items-center">
            <label
                htmlFor="zipcode"
                className="mr-2 text-sm font-medium text-gray-900"
            >
                Zip Code:
            </label>
            <input
                id="zipcode"
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="e.g., 90210"
                className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
        </div>
    )
}

function SortDropdown({ sortOption, setSortOption }) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    Sort:{' '}
                    {sortOptions.find((opt) => opt.value === sortOption)
                        ?.label || 'Select'}
                    <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                    />
                </MenuButton>
            </div>
            <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-none">
                {sortOptions.map((option) => (
                    <MenuItem key={option.value}>
                        {({ focus }) => (
                            <button
                                onClick={() => setSortOption(option.value)}
                                className={classNames(
                                    focus
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                    'block w-full px-4 py-2 text-left text-sm'
                                )}
                            >
                                {option.label}
                            </button>
                        )}
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    )
}

function BreedFilterDisclosure({ selectedBreeds, setSelectedBreeds }) {
    const handleBreedToggle = (breed) => {
        if (selectedBreeds.includes(breed)) {
            setSelectedBreeds(selectedBreeds.filter((b) => b !== breed))
        } else {
            setSelectedBreeds([...selectedBreeds, breed])
        }
    }

    const clearFilters = () => setSelectedBreeds([])

    return (
        <Disclosure as="section" className="border-t border-gray-200">
            {({ open }) => (
                <>
                    <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <DisclosureButton className="flex cursor-pointer items-center font-medium text-gray-700">
                            <AdjustmentsHorizontalIcon
                                className="mr-2 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            Filter by Breed
                            {open ? (
                                <ChevronDownIcon
                                    className="ml-2 h-5 w-5 text-purple-600"
                                    aria-hidden="true"
                                />
                            ) : (
                                <ChevronRightIcon
                                    className="ml-2 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            )}
                        </DisclosureButton>
                        <button
                            onClick={clearFilters}
                            className="cursor-pointer text-sm text-gray-500 hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                    <DisclosurePanel className="px-4 pb-4 sm:px-6 lg:px-8">
                        <div className="columns-4 gap-y-2">
                            {breedList.map((breed, idx) => (
                                <div
                                    key={breed}
                                    className="mb-2 flex break-inside-avoid items-center"
                                >
                                    <input
                                        id={`breed-${idx}`}
                                        type="checkbox"
                                        checked={selectedBreeds.includes(breed)}
                                        onChange={() =>
                                            handleBreedToggle(breed)
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                        htmlFor={`breed-${idx}`}
                                        className="ml-2 text-sm text-gray-700"
                                    >
                                        {breed}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    )
}

export default function FilterSortBar({
    selectedBreeds,
    setSelectedBreeds,
    sortOption,
    setSortOption,
    zipCode,
    setZipCode,
    minAge,
    setMinAge,
    maxAge,
    setMaxAge,
}) {
    return (
        <div className="mb-4 rounded-3xl border-b border-gray-200 bg-white shadow">
            <div className="px-4 py-4 sm:px-6 lg:px-8">
                <h2 className="text-xl font-bold text-gray-900">
                    Filters & Sorting
                </h2>
            </div>
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <ZipCodeInput zipCode={zipCode} setZipCode={setZipCode} />
                <AgeRangeDropdown
                    minAge={minAge}
                    setMinAge={setMinAge}
                    maxAge={maxAge}
                    setMaxAge={setMaxAge}
                />
                <SortDropdown
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                />
            </div>
            <BreedFilterDisclosure
                selectedBreeds={selectedBreeds}
                setSelectedBreeds={setSelectedBreeds}
            />
        </div>
    )
}

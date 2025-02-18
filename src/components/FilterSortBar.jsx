import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react';
import {
    ChevronDownIcon,
    ChevronRightIcon,
    AdjustmentsHorizontalIcon,
} from '@heroicons/react/20/solid';
import { breedList } from './BreedList';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const sortOptions = [
    { value: 'breed:asc', label: 'Breed A-Z' },
    { value: 'breed:desc', label: 'Breed Z-A' },
    { value: 'age:asc', label: 'Age Asc' },
    { value: 'age:desc', label: 'Age Desc' },
];

function ZipCodeInput({ zipCode, setZipCode }) {
    return (
        <div className="flex items-center">
            <label htmlFor="zipcode" className="mr-2 text-sm font-medium text-gray-900">
                Zip Code:
            </label>
            <input
                id="zipcode"
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="e.g., 27601"
                className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
        </div>
    );
}

function SortDropdown({ sortOption, setSortOption }) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    Sort: {sortOptions.find((opt) => opt.value === sortOption)?.label || 'Select'}
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </MenuButton>
            </div>
            <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                {sortOptions.map((option) => (
                    <MenuItem key={option.value}>
                        {({ active }) => (
                            <button
                                onClick={() => setSortOption(option.value)}
                                className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block w-full text-left px-4 py-2 text-sm'
                                )}
                            >
                                {option.label}
                            </button>
                        )}
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
}

function BreedFilterDisclosure({ selectedBreeds, setSelectedBreeds }) {
    const handleBreedToggle = (breed) => {
        if (selectedBreeds.includes(breed)) {
            setSelectedBreeds(selectedBreeds.filter((b) => b !== breed));
        } else {
            setSelectedBreeds([...selectedBreeds, breed]);
        }
    };

    const clearFilters = () => setSelectedBreeds([]);

    return (
        <Disclosure as="section" className="border-t border-gray-200">
            {({ open }) => (
                <>
                    <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <DisclosureButton className="flex items-center font-medium text-gray-700 cursor-pointer">
                            <AdjustmentsHorizontalIcon className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                            Filter by Breed
                            {open ? (
                                <ChevronDownIcon className="ml-2 h-5 w-5 text-purple-600" aria-hidden="true" />
                            ) : (
                                <ChevronRightIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                            )}
                        </DisclosureButton>
                        <button onClick={clearFilters} className="text-sm text-gray-500 hover:underline cursor-pointer">
                            Clear filters
                        </button>
                    </div>
                    <DisclosurePanel className="px-4 pb-4 sm:px-6 lg:px-8">
                        <div className="columns-4 gap-y-2">
                            {breedList.map((breed, idx) => (
                                <div key={breed} className="break-inside-avoid flex items-center mb-2">
                                    <input
                                        id={`breed-${idx}`}
                                        type="checkbox"
                                        checked={selectedBreeds.includes(breed)}
                                        onChange={() => handleBreedToggle(breed)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor={`breed-${idx}`} className="ml-2 text-sm text-gray-700">
                                        {breed}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}

export default function FilterSortBar({
    selectedBreeds,
    setSelectedBreeds,
    sortOption,
    setSortOption,
    zipCode,
    setZipCode,
}) {
    return (
        <div className="bg-white shadow border-b rounded-3xl border-gray-200 mb-4">
            <div className="px-4 py-4 sm:px-6 lg:px-8">
                <h2 className="text-xl font-bold text-gray-900">Filters & Sorting</h2>
            </div>
            <div className="px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <ZipCodeInput zipCode={zipCode} setZipCode={setZipCode} />
                <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
            </div>
            <BreedFilterDisclosure selectedBreeds={selectedBreeds} setSelectedBreeds={setSelectedBreeds} />
        </div>
    );
}
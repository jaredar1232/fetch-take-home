export default function TextInput({
    field = 'email',
    ...props
}) {
    // Capitalize label
    const label = field.charAt(0).toUpperCase() + field.slice(1);
    // Use email type if field is email, otherwise text
    const inputType = field === 'email' ? 'email' : 'text';
    // Set a default placeholder based on field
    const placeholder = field === 'email' ? 'truthless1@example.com' : 'Szeth';
    const id = field;

    return (
        <div>
            <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    name={id}
                    type={inputType}
                    placeholder={placeholder}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    {...props}
                />
            </div>
        </div>
    )
}

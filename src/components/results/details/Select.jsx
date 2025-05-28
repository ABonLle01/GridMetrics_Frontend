import clsx from 'clsx'

function Select({ label, name, options, value, onChange }) {
    return (
        <div className="mb-4 d-flex flex-direction-row gap-3 align-items-center">
        <label className="block font-medium" htmlFor={name}> {label}: </label>
        <select id={name} name={name} value={value} onChange={onChange} className={clsx(
            'w-full border rounded p-2',
            'focus:outline-none focus:ring focus:ring-blue-200'
            )}
        >
            {Object.entries(options).map(([optValue, optLabel]) => (
                <option key={optValue} value={optValue}> {optLabel} </option>
            ))}
        </select>
        </div>        
    )
}

export default Select
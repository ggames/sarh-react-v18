
type Props = React.LabelHTMLAttributes<HTMLLabelElement>;

import React from 'react'

export const Label = ({ children, ...props }: Props) => {
    return (
        <label {...props} className="block py-1 text-sm/6 font-medium text-gray-900">
            {children}
        </label>
    )
}


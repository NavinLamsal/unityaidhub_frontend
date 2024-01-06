import React, { ComponentPropsWithRef } from 'react'
import classNames from "classnames";
import { Input } from '../ui/input';

type Props = ComponentPropsWithRef<"input">;

const CustomFileSelector = (props:Props) => {
  return (
    <Input
    {...props}
    type = "file"
    multiple
    className={classNames({"file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100": true,
    "file:rounded-lg file:rounded-tr-none file:rounded-br-none": true,
    "file:px-4 file:py-2 file:mr-4 file:border-none": true,
    "hover:cursor-pointer border rounded-lg text-gray-400": true,
  })}

    />
  )
}

export default CustomFileSelector

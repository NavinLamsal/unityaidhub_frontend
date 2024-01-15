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
    className={classNames({
      'rounded-lg': true,
      'rounded-tr-none': true,
      'rounded-br-none': true,
      'border-none': true,
      'hover:cursor-pointer': true,
      'border': true,
      'text-gray-400': true,
      
    })}
    style={{ margin: 0, padding:0}}

    />
  )
}

export default CustomFileSelector

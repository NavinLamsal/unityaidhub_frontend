import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "./input"
import { EyeIcon, EyeOff } from "lucide-react"

export interface passwordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, passwordInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword]= React.useState(false)
    return (
        <div className="relative">
        <input className={cn(
      'flex h-10 w-full rounded-md border border-zinc-950 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-50 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 pr-9',
      className
    )} 
    type={showPassword ? 'text':'password'}
    {...props} ref={ref}/>
        {showPassword ? 
        <EyeOff className="absolute right-2 top-2 w-6 h-6 select-none cursor-pointer" onClick={()=>setShowPassword(false)}/>:
        <EyeIcon className="absolute right-2 top-2 w-7 h-7 select-none cursor-pointer" onClick={()=>setShowPassword(true)}/>
        }
        </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }

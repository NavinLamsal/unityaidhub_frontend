import React, { useEffect, useState } from 'react'
import { Input } from './input'

export interface CurrencyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onInputChange: (value: string) => void;
    currencyCode: string;
}
const CurrencyList = [
    {
        id:'111',
        currency:'NPR'
    },
    {
        id:'112',
        currency:'INR'
    },
    {
        id:'113',
        currency:'USD'
    },
    {
        id:'114',
        currency:'GBP'
    },
    {
        id:'115',
        currency:'EUR'
    },
] 

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
    ({ className, type, onInputChange, currencyCode, ...props }, ref) => {
        const [selectedCurrency, setSelectedCurrency] = useState<string>(currencyCode);
        const [inputValue, setInputValue] = useState<string>('0');

        const handleCurrencyChange = (value: string) => {
            setSelectedCurrency(value);
            setInputValue('0')

        };

        useEffect(() => {
            const debounceTimeout = setTimeout(() => {
                console.log(props.value)
                const formattedAmount = formatCurrency(String(props.value));
            onInputChange(formattedAmount);
              }, 2000);
              return () => clearTimeout(debounceTimeout);

          
        }, [selectedCurrency, props.value, onInputChange]);

        const formatCurrency = (amount: string) => {

            const numericAmount = parseFloat(amount.replace(/[$,]/g, '').replace(/[^\d.]/g, ''))
            if (isNaN(numericAmount)) {
                return amount;
            }

            const formattedAmount = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: selectedCurrency,
            }).format(numericAmount);
            console.log(formattedAmount)

            return formattedAmount;
        };


        return (
            <div className='flex h-10 max-w-lg border rounded-md border-zinc-950 dark:border-zinc-50  focus-within:ring-offset-2 focus-within:focus-visible:outline-none 
            focus-within:focus-visible:ring-2 focus-within:focus-visible:ring-zinc-950 
            focus-within:focus-visible:ring-offset-2'>
                <select name="currency"
                    id="currency"
                    onChange={(event) => handleCurrencyChange(event.target.value)}
                    className='max-w-fit  bg-zinc-300 dark:bg-zinc-600 flex h-9 w-full items-center justify-between rounded-md border-0 border-zinc-950  px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-0 focus:ring-zinc-950 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-zinc-50  dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-300 rounded-r-none border-r-0'
                >   
                {CurrencyList.map((cur)=>(
                    <option key={cur.id} value={cur.currency} className={`bg-zinc-50 dark:bg-zinc-600  hover:bg-Secondary dark:hover:bg-Primary dark:hover:text-zinc-50 ${selectedCurrency === cur.currency? 'bg-Primary':''} `}>{cur.currency}</option>
                ))
                }
                </select>
                <Input
                    className=' h-9 rounded-l-none border-l-0 border-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-zinc-950 focus-visible:ring-offset-0'
                    type={'text'}
                    value={inputValue}
                    onChange={(e) => {
                        // Allow only numeric input
                        const numericValue = e.target.value.replace(/[^0-9]/g, '');
                        onInputChange(numericValue);
                    }}
                    onKeyPress={(e) => {
                        // Allow only numeric input
                        const isValidChar = /^[0-9]*$/.test(e.key);
                        if (!isValidChar) {
                          e.preventDefault();
                        }
                      }}
                    // onChange={(e) => onInputChange(e.target.value)}
                    onBlur={(e) => onInputChange(formatCurrency(e.target.value))}
                    ref={ref}
                    {...props}
                />
            </div>
        )
    }
)
CurrencyInput.displayName = "CurrencyInput"

export { CurrencyInput }
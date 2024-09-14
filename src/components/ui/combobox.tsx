'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

export function Combobox({
    defaultValue,
    options,
    disabled,
    callback,
    onClick,
}: {
    options: { value: string; label: string }[];
    onClick?: () => void;
    disabled?: boolean;
    defaultValue?: string;
    callback?: (value: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(defaultValue);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    disabled={disabled}
                    aria-expanded={open}
                    className='w-[200px] justify-between'
                    onClick={onClick}>
                    {value
                        ? options.find((item) => item.value === value)?.label ||
                          value
                        : 'Select'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
                <Command>
                    <CommandInput placeholder='Search' />
                    <CommandList>
                        <CommandEmpty>Nothing found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ''
                                                : currentValue,
                                        );
                                        setOpen(false);
                                        if (callback) callback(currentValue);
                                    }}>
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value === item.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

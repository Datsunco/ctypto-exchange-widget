import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CommandList } from "cmdk"

const frameworks = [
    {
        value: "BTC",
        label: "BTC",
        path: '/btc.svg'
    },
    {
        value: "ETH",
        label: "ETH",
        path: '/eth.svg'
    },
    {
        value: "USDT",
        label: "USDT",
        path: '/usdt.svg'
    }
]

interface ComboBoxProps{
    initValue: string 
    onSelectValue: (value: string) => void
}

export function Combobox({initValue, onSelectValue}: ComboBoxProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(initValue)

    return (
        <div >
            
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className="rounded-none rounded-r-lg" asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[60px] h-[45px] justify-center"
                    >
                        <div className="flex flex-col text-[10px] pt-[5px] font-bold">
                            {value
                                ? <img className="w-[15px] h-[15px] m-auto" src={frameworks.find((framework) => framework.value === value)?.path} />
                                : null}
                            {value
                                ? frameworks.find((framework) => framework.value === value)?.label
                                : "Выб..."}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[120px] gap-[5px] p-0">
                    <Command>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            <CommandList>
                                {frameworks.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        className="gap-[5px]"
                                        onSelect={(currentValue) => {
                                            setValue(currentValue)
                                            setOpen(false)
                                            onSelectValue(currentValue)
                                        }}
                                        
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === framework.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        <img className="w-[25px] h-[25px]" src={framework.path} />

                                        {framework.label}
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

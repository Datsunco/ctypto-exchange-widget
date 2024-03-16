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

export function Combobox() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("BTC")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[120px] justify-between"
                >
                    {value
                        ? <img className="w-[25px] h-[25px]" src={frameworks.find((framework) => framework.value === value)?.path}/>
                        : null}
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Выб..."}
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
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <img className="w-[25px] h-[25px]" src={framework.path}/>
                                    
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

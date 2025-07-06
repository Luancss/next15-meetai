import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandResponsiveDialog,
} from "./ui/command";

interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSerchable?: boolean;
  className?: string;
}

const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Select an option",
  className,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.id === value);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon />
      </Button>
      <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandEmpty className="text-muted-foreground text-sm">
          <span>No options found</span>
        </CommandEmpty>
        {options.map((option) => (
          <CommandItem
            key={option.id}
            onSelect={() => {
              onSelect(option.value);
              setOpen(false);
            }}
          >
            {option.children}
          </CommandItem>
        ))}
      </CommandResponsiveDialog>
    </>
  );
};

export default CommandSelect;

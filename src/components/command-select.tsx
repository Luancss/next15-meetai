import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSerchable?: boolean;
  className?: string;
}

const CommandSelect = ({
  options,
  onChange,
  onSearch,
  value,
  placeholder,
  isSerchable,
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
    </>
  );
};

export default CommandSelect;

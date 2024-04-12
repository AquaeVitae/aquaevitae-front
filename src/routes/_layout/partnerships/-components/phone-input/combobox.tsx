import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CountryCode } from "libphonenumber-js";
import { FlagProps } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import language from "react-phone-number-input/locale/pt";

export type Option = Record<"value" | "label", string> & Record<string, string>;

type ComboboxCountryInputProps<T extends Option> = {
  value: T;
  onValueChange: (value: T) => void;
  options: T[];
  renderOption: ({
    option,
    isSelected,
  }: {
    option: T;
    isSelected: boolean;
  }) => React.ReactNode;
  renderValue: (option: T) => string;
  emptyMessage: string;
  placeholder?: string;
  className?: string;
};

export function ComboboxCountryInput<T extends Option>({
  value,
  onValueChange,
  options,
  renderValue,
  placeholder,
  emptyMessage,
}: ComboboxCountryInputProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          aria-label={
            value.value ? `Selected: ${renderValue(value)}` : "Escolha um país"
          }
          className="inline-flex h-10 items-center justify-between self-start rounded-md border border-stone-200 bg-white px-4 py-2 text-sm font-medium ring-offset-white transition-colors hover:bg-stone-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 "
        >
          <FlagComponent
            country={value.value as CountryCode}
            countryName={value.value}
          />
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2 pb-0" align="start">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandList>
            <CommandGroup className="mt-2 h-full max-h-48 overflow-auto p-0 [&_div[cmdk-group-items]]:flex [&_div[cmdk-group-items]]:flex-col [&_div[cmdk-group-items]]:gap-1">
              <CommandItem
                key="ZZ"
                value=""
                onSelect={() => {
                  onValueChange({} as T);
                  setOpen(false);
                }}
                className="gap-2"
                aria-disabled={true}
              >
                <FlagComponent country={{} as CountryCode} countryName={""} />
                <span className="flex-1 text-sm">--</span>
              </CommandItem>
              {options.map((option) => {
                const isSelected = value.value === option.value;

                return (
                  <CommandItem
                    key={option.value}
                    value={renderValue(option)}
                    onSelect={() => {
                      onValueChange(option);
                      setOpen(false);
                    }}
                    className="gap-2"
                    aria-disabled={true}
                  >
                    <FlagComponent
                      country={option.value as CountryCode}
                      countryName={option.value}
                    />
                    <span className="flex-1 text-sm">
                      {language[option.value as CountryCode]}
                    </span>
                    {isSelected ? (
                      <Check className="ml-auto mr-2 h-4 w-4" />
                    ) : null}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export const FlagComponent = ({ country, countryName }: FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};
FlagComponent.displayName = "FlagComponent";

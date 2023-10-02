import { cn } from "@/lib/utils";
import { PropsWithChildren, type FC } from "react";

interface InputProps {
  inputValue: string;
  setInputValue: (newValue: string) => void;
  label: string;
  required?: boolean;
  placeholder?: string;
  wrapperClassName?: string;
}

export const Input: FC<PropsWithChildren<InputProps>> = ({
  inputValue,
  setInputValue,
  label,
  required = true,
  placeholder = " ",
  children,
  wrapperClassName,
}) => {
  return (
    <div className={cn("relative z-0 flex w-full items-end", wrapperClassName)}>
      <input
        type="text"
        name={inputValue}
        id={inputValue}
        className="peer z-0 mt-2 block w-full appearance-none border-0 border-b-2 border-primary400 bg-transparent px-0 py-1 text-lg text-base50 focus:mt-2 focus:border-primary600 focus:outline-none focus:ring-0"
        placeholder={placeholder}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        required={required}
      />
      {children}
      <label
        htmlFor={inputValue}
        className="absolute top-2 z-0 origin-[0] -translate-y-6 scale-75 transform text-xs text-primary400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-90 peer-focus:font-medium peer-focus:text-primary600"
      >
        {label}
      </label>
    </div>
  );
};

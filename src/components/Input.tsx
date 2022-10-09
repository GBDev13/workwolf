import classNames from "classnames";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Input({ name, label, className, ...rest }: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-medium pl-2">
        {label}
      </label>
      <input
        name={name}
        id={name}
        className={classNames(
          "h-8 border border-[#c1c1c1] p-5 rounded-md",
          className
        )}
        {...rest}
      />
    </div>
  );
}

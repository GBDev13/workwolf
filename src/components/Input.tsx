import classNames from "classnames";
import { forwardRef, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, className, ...rest }, ref) => {
    const {
      formState: { errors },
    } = useFormContext();
    const fieldError = errors[name as string]?.message as string;

    return (
      <div className="flex flex-col">
        <label htmlFor={name} className="font-medium pl-2">
          {label}
        </label>
        <input
          name={name}
          id={name}
          className={classNames(
            "h-8 border border-[#c1c1c1] py-5 px-1 rounded-md sm:p-5",
            { "border-warning": !!fieldError },
            className
          )}
          ref={ref}
          {...rest}
        />
        {fieldError && <p className="text-warning mt-2">{fieldError}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

import { forwardRef } from "react";

const Input = forwardRef(({ label, name, className, as = "input", type = "text", ...props }, ref) => {
    const Component = as;
    const baseStyles = "border border-zinc-300 rounded-md p-2 outline-none bg-zinc-50 " +
        "focus:ring-2 focus:ring-blue-900/20 focus:border-blue-400 focus:bg-blue-50/70";
    return (
        <div className='flex flex-col gap-1 text-sm'>
            {
                label && (

                    <label htmlFor={name} className='text-zinc-500 font-[550]'>{label}</label>
                )
            }

            <Component ref={ref} id={name} name={name} type={as === "input" ? type : undefined} className={`${baseStyles} ${className}`} {...props} />

        </div>
    )
});

export default Input;
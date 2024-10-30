import clsx from "clsx";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { get } from "react-hook-form";
import Eye from "../../icons/eye";
import EyeOff from "../../icons/eye-off";

type InputProps = Omit<
 React.InputHTMLAttributes<HTMLInputElement>,
 "placeholder"
> & {
    label: string;
    errors?: Record<string,unknown>;
    touched?: Record<string, unknown>;
    name: string;
}

const Input = React.forwardRef<HTMLInputElement,InputProps>(({
    type,name,label,errors,touched,required,...props
},ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [inputType,setInputType] = useState(type);
    const [showPassword, setShowPassword] = useState(false);
    const [hasFocus,setHasFocus] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const hasError = get(errors,name);

    useEffect(() => {
      if(inputRef.current?.value){
        setHasValue(true);
      }
    })

    const handleFocus = () => {
        if (type === "password" && showPassword) {
          setInputType("text");
        }
  
        if (type === "password" && !showPassword) {
          setInputType("password");
        }
        setHasFocus(true);
      };

      const handleBlur = () => {
        if (type === "password" && showPassword) {
          setInputType("text");
        }
  
        if (type === "password" && !showPassword) {
          setInputType("password");
        }
        setHasFocus(false);
      };
  
      useEffect(() => {
        if (type === "password" && showPassword) {
          setInputType("text");
        }
  
        if (type === "password" && !showPassword) {
          setInputType("password");
        }
       const inputElement = inputRef.current;
  
        if (inputElement) {
          inputElement.addEventListener("focus", handleFocus);
          inputElement.addEventListener("blur", handleBlur);
  
          return () => {
            inputElement.removeEventListener("focus", handleFocus);
            inputElement.removeEventListener("blur", handleBlur);
          };
        }
  
       
      }, [type, showPassword]);
  
      useImperativeHandle(ref, () => inputRef.current!);
      
  return(
    <div className="w-full relative">
        <input 
        type={inputType} 
        name={name}
        placeholder=""
        ref={inputRef}
        className={clsx("mt-0 block rounded w-full appearance-none border border-gray-600 bg-transparent px-4 pb-1 pt-5 focus:outline-none focus:ring-0",
            {
                "border-rose-500 focus:border-rose-500": hasError,
            }
        )}
        {...props}
        />
        <label
        htmlFor={name}
        onClick={() => inputRef.current?.focus()}
        className={clsx(
            "-z-1 origin-0 absolute pt-1 text-gray-500 transition-all duration-300 ",
            {
              "!text-rose-500": hasError,
              "top-2 mx-3 px-1": !hasFocus && !hasValue,
              "top-0 mx-2 px-0 text-sm": hasFocus || hasValue,
            }
          )}
        >
            {label}
            {required && <span className="text-rose-500">*</span>}
            {hasError && (
              <span
                className={clsx("ml-2 text-red-500 ", {
                  "hidden": !hasFocus,
                },
                {"":hasFocus}
                )}
              >
                (Invalid)
              </span>
            )}
        {required && <span className="text-rose-500">*</span>}
        </label>
        {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-3 px-4 text-gray-400 outline-none transition-all duration-150 focus:text-gray-700 focus:outline-none"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
    </div>
  )
})
Input.displayName = "Input";
export default Input
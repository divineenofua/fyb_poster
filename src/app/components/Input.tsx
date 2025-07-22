import React from 'react'
import { UseFormRegister , Path} from 'react-hook-form';
import { FormData } from '../schemas/schema';
type props = {
  label: string;
  type: string;
  styling?:string;
  stylingLabel?:string;
  name: Path<FormData>;
  placeholder: string;
  register: UseFormRegister<FormData>;
};

const Input: React.FC<props> = (props) => {
  return (
    <div
      className={`mb-5  bg-gradient-to-r from-[#003366] to-[#000337] p-3 rounded-sm  border border-[#277fd6]  border-dotted ${props.styling}`}
    >
      <label
        className={` block text-cyan-500 uppercase text-sm mb-[1px] ${props.stylingLabel}`}
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <input
        className="text-white   text-sm outline-0 focus:border border-cyan-500 py-2  w-full  focus:px-2  rounded-md placeholder:text-gray-200 placeholder:capitalize"
        type={props.type}
        placeholder={props.placeholder}
        {...props.register(props.name)}
      />
    </div>
  );
}

export default Input
import React from 'react'

type props = {
  label: string;
  styling?:string;
  stylingLabel?:string;
   value: string;
};
const GradBox: React.FC<props> = (props)  => {
  return (
    <div>
      <div
        className={` bg-gradient-to-r from-[#003366] to-[#000337] p-3 rounded-sm  border border-[#277fd6]  border-dotted ${props.styling}`}
      >
        <div
          className={` block text-[#0891b2] uppercase text-sm mb-[1px] ${props.stylingLabel}`}
        >
          {props.label}
        </div>
        <div className="text-white   text-sm outline-0 focus:border  rounded-md  capitalize">
          {" "}
          {props.value}
        </div>
      </div>
    </div>
  );
}

export default GradBox
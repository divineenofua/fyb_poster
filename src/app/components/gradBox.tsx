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
        className={` bg-gradient-to-r from-[#003366] pb-[2px]  to-[#000337]  px-3 rounded-sm  border border-[#277fd6]  border-dotted h-[51px] ${props.styling}`}
      >
        <div
          className={`pb-[2px]    text-[#0891b2]  capitalize text-sm mb-[1px]   ${props.stylingLabel}`}
        >
          {props.label}
        </div>
        <div className="pb-2 text-white   overflow-clip  text-sm outline-0 focus:border  rounded-md  capitalize">
          {" "}
          {props.value}
        </div>
      </div>
    </div>
  );
}

export default GradBox
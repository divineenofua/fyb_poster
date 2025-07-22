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
        className={` bg-gradient-to-r from-[#003366] flex item-center  to-[#000337]  px-3 rounded-sm  border border-[#277fd6]  border-dotted h-[51px] ${props.styling}`}
      >
        <div className=' flex  flex-col   items-start'>
          <div
            className={`text-[#0891b2]  p-0 m-0 capitalize text-sm   ${props.stylingLabel}`}
          >
            {props.label}
          </div>
          <div className="text-white   text-sm outline-0   rounded-md  capitalize ">
            {" "}
            {props.value}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradBox
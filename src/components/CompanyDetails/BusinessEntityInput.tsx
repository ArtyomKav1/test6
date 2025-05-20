// import { useEffect, useState } from "react"
import Chevron from "../../assets/Chevron.svg";

type BusinessEntityInputType = {
  setBusinessEntity: (arg: string) => void;
  businessEntity: string;
  dropForBusinessEntity: boolean;
  dropFunForBusinessEntity: () => void;
};

function BusinessEntityInput(props: BusinessEntityInputType) {
  const variants = [
    "Sole Proprietorship",
    "Partnership",
    "Limited Liability Company",
  ];
  return (
    <>
      <div
        className={`w-full max-md:w-[240px] h-[40px] rounded-[8px] py-[10px] px-[12px]
                bg-[#FFFFFF] border  relative  ${props.dropForBusinessEntity ? "border-[#35CDFD] border-[2px]" : "border-[#000000]/20 hover:border-[#000000]/50"}`}
        onClick={props.dropFunForBusinessEntity}
      >
        {props.businessEntity}
        {props.dropForBusinessEntity && (
          <ul className="flex flex-col absolute z-10 bg-white w-full left-0 top-[40px] rounded-[8px] border border-[#000000]/20">
            {variants.map((variant) => (
              <li
                onClick={() => props.setBusinessEntity(variant)}
                className={`px-[16px] py-[12px] ${props.businessEntity === variant && "bg-[#000000]/5"}`}
              >
                {variant}
              </li>
            ))}
          </ul>
        )}
        <div className="absolute right-[10px] top-[10px] rotate-270">
          <img src={Chevron} alt="" className="invert-100" />
        </div>
      </div>
    </>
  );
}
export default BusinessEntityInput;

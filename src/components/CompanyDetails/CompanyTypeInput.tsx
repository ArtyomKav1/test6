// import { useState } from "react"
import Chevron from "../../assets/Chevron.svg";
import Check from "../../assets/Check.svg";
type CompanyTypeInputType = {
  type: string[];
  setType: (arg: string[]) => void;
  dropForCompanyType: boolean;
  dropFunForCompanyType: () => void;
};

function CompanyTypeInput(props: CompanyTypeInputType) {
  const variants = [
    "Funeral Home",
    "Logistics Services",
    "Burial Care Contractor",
  ];
  const CompanyType = props.type.map((item) => {
    const words = item.split("_");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    );
    return capitalizedWords.join(" ");
  });

  const changesType = (variant: string) => {
    let newType = CompanyType;

    if (newType.includes(variant)) {
      newType = newType.filter((i) => i !== variant);
    } else {
      newType.push(variant);
    }

    props.setType(newType);
  };

  return (
    <>
      <div className="relative max-md:w-[240px] ">
        <div
          className={`w-full h-[40px] rounded-[8px] py-[10px] px-[12px]
                bg-[#FFFFFF] border   ${props.dropForCompanyType ? "border-[#35CDFD] border-[2px]" : "border-[#000000]/20 hover:border-[#000000]/50"}`}
          onClick={props.dropFunForCompanyType}
        >
          <div className="">Types</div>
          <div className="absolute right-[10px] top-[10px] rotate-270">
            <img src={Chevron} alt="" className="invert-100" />
          </div>
        </div>

        {props.dropForCompanyType && (
          <ul className="flex flex-col absolute z-10 bg-white w-full left-0 top-[40px] rounded-[8px] border border-[#000000]/20">
            {variants.map((variant) => (
              <li
                onClick={() => changesType(variant)}
                className={`px-[16px] py-[12px] flex gap-[12px] items-center ${CompanyType.includes(variant) && "bg-[#000000]/5"}`}
              >
                <div className="w-[20px] h-[20px] border border-[#000000]/30 rounded-[4px] flex items-center justify-center">
                  {CompanyType.includes(variant) && (
                    <img
                      src={Check}
                      alt=""
                      className="invert-100 w-[16px] h-[16px]"
                    />
                  )}
                </div>
                <div>{variant}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default CompanyTypeInput;

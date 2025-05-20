import { ReactElement } from "react";
interface WrapperForInputProps {
  title: string;
  children: ReactElement;
}
function WrapperForInput({ title, children }: WrapperForInputProps) {
  return (
    <>
      <div className="flex  items-center max-md:flex-col max-md:items-start">
        <div className="text-[#000000]/50 text-[13px] tracking-[0.25px] leading-[20px] w-[130px] ">
          {title}
        </div>
        <div className="text-[#000000]/80 text-[14px] tracking-[0.3px] leading-[24px] flex-1">
          {children}
        </div>
      </div>
    </>
  );
}
export default WrapperForInput;

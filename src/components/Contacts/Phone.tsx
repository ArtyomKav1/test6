import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

type ContactsInputProps = {
  title: string;
  value: string;
  onChangeFun: (value: string) => void;
};

export default function Phone({
  title,
  value,
  onChangeFun,
}: ContactsInputProps) {
  return (
    <div className="flex items-center gap-[12px] relative max-sm:flex-col max-sm:items-start">
      <div className="text-[#000000]/50 text-[13px] tracking-[0.25px] leading-[20px] w-[160px]">
        {title}
      </div>
      <PhoneInput
        country={"ru"}
        value={value}
        onChange={onChangeFun}
        disableDropdown
        buttonClass="!hidden"
        inputClass="!w-full !h-[40px] !rounded-[8px] !py-[10px] !px-[12px] !bg-[#FFFFFF] !border !border-[#000000]/20 
                        !text-[#000000]/80 !text-[14px] !leading-[24px] !tracking-[0.3px] focus:!border-[#35CDFD] focus:!border-[2px] 
                        hover:!border-[#000000]/50 max-msm:!w-[240px]"
        containerClass="!flex-1 max-msm:!w-[240px]"
        specialLabel=""
      />
    </div>
  );
}

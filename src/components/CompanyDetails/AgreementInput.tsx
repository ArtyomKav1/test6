type AgreementInputProps = {
  no: string;
  setNo: (arg: string) => void;
  issue_date: string;
  setIssue_date: (arg: string) => void;
  formattedDateFun: (data: string) => string;
};

function AgreementInput(props: AgreementInputProps) {
  return (
    <>
      <div className="w-full  flex gap-[12px] items-center max-md:flex-col max-md:pt-[12px]">
        <input
          type="date"
          className="h-full w-full  rounded-[8px] py-[10px] px-[12px] bg-[#FFFFFF] border border-[#000000]/20 
                    text-[#000000]/80 text-[14px] leading-[24px] tracking-[0.3px] focus:outline-none focus:border-[#35CDFD]
                    focus:border-[2px] hover:border-[#000000]/50 "
          onChange={(e) => props.setNo(e.target.value)}
          value={props.no}
        />
        <div className="flex items-center gap-[12px] max-md:flex-col max-md:items-start max-md:text-[#000000]/80">
          <div>Date:</div>
          <input
            type="date"
            className="h-full w-full max-md:w-[240px]  rounded-[8px] py-[10px] px-[12px] bg-[#FFFFFF] border border-[#000000]/20
                    text-[#000000]/80 text-[14px] leading-[24px] tracking-[0.3px] focus:outline-none focus:border-[#35CDFD]
                    focus:border-[2px] hover:border-[#000000]/50 "
            onChange={(e) => props.setIssue_date(e.target.value)}
            value={props.formattedDateFun(props.issue_date)}
          />
        </div>
      </div>
    </>
  );
}
export default AgreementInput;

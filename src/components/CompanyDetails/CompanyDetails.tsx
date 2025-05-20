import { useState } from "react";
import { companiesGetType, companyPatchBodyType } from "../../api/typeApi";
import edit from "../../assets/Edit.svg";
import WrapperForInput from "./WrapperForInput";
import CompanyTypeInput from "./CompanyTypeInput";
import BusinessEntityInput from "./BusinessEntityInput";
import AgreementInput from "./AgreementInput";
import check from "../../assets/Check.svg";
import X from "../../assets/X.svg";
import { API } from "../../api/api";
import loader from "../../assets/Loader_white.svg";
import { toast } from "sonner";

function CompanyDetails(props: {
  data: companiesGetType;
  setData: (arg: companiesGetType) => void;
}) {
  const formattedDateFun = (propsDate: string) => {
    const date = new Date(propsDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}.${day}.${year}`;
  };
  const [companyEdit, setCompanyEdit] = useState(false);
  const [type, setType] = useState(props.data.type);
  const [businessEntity, setBusinessEntity] = useState(
    props.data.businessEntity,
  );
  const [no, setNo] = useState(formattedDateFun(props.data.contract.no));
  const [issue_date, setIssue_date] = useState(props.data.contract.issue_date);
  const [dropForBusinessEntity, setDropForBusinessEntity] = useState(false);
  const [dropForCompanyType, setCompanyType] = useState(false);
  const dropFunForBusinessEntity = () => {
    if (!dropForCompanyType) setDropForBusinessEntity(!dropForBusinessEntity);
  };
  const dropFunForCompanyType = () => {
    if (!dropForBusinessEntity) setCompanyType(!dropForCompanyType);
  };
  const [fetchLoading, setFetchLoading] = useState(false);
  const SendDataСompany = async () => {
    let send = false;
    const body: companyPatchBodyType = {};
    if (no && issue_date) body["contract"] = { no: no, issue_date: issue_date };
    send = true;
    if (businessEntity) body["businessEntity"] = businessEntity;
    send = true;
    if (type) {
      const sendType = type.map((item) => {
        let words = item.split(" ");
        words = words.map((i) => i.toLowerCase());
        return words.join("_");
      });
      body["type"] = sendType;
      send = true;
    }
    if (send) {
      setFetchLoading(true);
      try {
        const response = await API.companiesPatch(body);
        if (response.statusText === "OK") {
          toast.success("Данные успешно отправлены!");
          props.setData(response.data);
        } else {
          throw Error;
        }
      } catch (error) {
        toast.warning("Ошибка отправки данных");
        console.error("Ошибка при запросе SendDataСompany:", error);
      } finally {
        setCompanyEdit(false);
        setFetchLoading(false);
      }
    } else {
      setCompanyEdit(false);
    }
  };
  const CompanyType = props.data.type.map((item) => {
    const words = item.split("_");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    );
    return capitalizedWords.join(" ");
  });
  return (
    <>
      {!companyEdit ? (
        <div className="  bg-[#FFFFFF] shadow-xl rounded-[16px] p-[24px] flex flex-col gap-[16px]">
          <div className="flex justify-between">
            <div className="text-[#3B3B3B] text-[14px] font-bold leading-[24px] tracking-[0.3px]">
              Company Details
            </div>
            <button
              className="flex gap-[12px] py-[4px] pr-[12px] pl-[8px] rounded-[8px] border active:border-[#6243E6]
                                border-[#000000]/20 items-center cursor-pointer hover:border-[#000000]/40"
              onClick={() => setCompanyEdit(true)}
            >
              <div>
                <img
                  src={edit}
                  alt=""
                  className="invert-100 w-[16px] h-[16px]"
                />
              </div>
              <div className="text-[#000000]/80 text-[11px] font-semibold leading-[24px] tracking-[0.3px]">
                Edit
              </div>
            </button>
          </div>
          <div className=" w-[592px]  flex flex-col gap-[12px]   text-[#000000]">
            <div className="flex items-center ">
              <div className="opacity-50 text-[13px] tracking-[0.25px] leading-[20px]  w-[160px] max-sm:w-[100px]">
                Agreement:
              </div>
              <div className="opacity-80 text-[14px] tracking-[0.3px] leading-[24px] flex-1">
                {props.data.contract.no} /{" "}
                {formattedDateFun(props.data.contract.issue_date)}
              </div>
            </div>
            <div className="flex items-center ">
              <div className="opacity-50 text-[13px] tracking-[0.25px] leading-[20px w-[160px] max-sm:w-[100px]">
                Business entity:
              </div>
              <div className="opacity-80 text-[14px] tracking-[0.3px] leading-[24px] flex-1">
                {props.data.businessEntity}
              </div>
            </div>
            <div className="flex items-start">
              <div className="opacity-50 text-[13px] tracking-[0.25px] leading-[20px w-[160px] max-sm:w-[100px]">
                Company type:
              </div>
              <div className="opacity-80 text-[14px] tracking-[0.3px] leading-[24px] flex-1 flex max-sm:flex-col">
                {CompanyType.map((itemType, index) => (
                  <div key={index}>{itemType}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="  bg-[#FFFFFF] shadow-xl rounded-[16px] p-[24px] flex flex-col gap-[16px] relative">
          {fetchLoading && (
            <>
              <div className="absolute inset-0 bg-black/30 rounded-[16px] z-50"></div>
              <div className="absolute right-[45%] animate-spin z-50">
                <img src={loader} alt="" />
              </div>
            </>
          )}
          <div className="flex justify-between max-msm:flex-col gap-[10px]">
            <div className="text-[#3B3B3B] text-[14px] font-bold leading-[24px] tracking-[0.3px]">
              Company Details
            </div>
            <div className="flex gap-[12px] h-[28px]">
              <div
                className="flex gap-[12px] py-[4px] pr-[12px] pl-[8px] rounded-[8px] border border-[#000000]/20 items-center active:border-[#6243E6] hover:border-[#000000]/40"
                onClick={() => SendDataСompany()}
              >
                <div>
                  <img
                    src={check}
                    alt=""
                    className="invert-100 w-[16px] h-[16px]"
                  />{" "}
                </div>
                <div className="text-[#000000]/80 text-[11px] font-semibold leading-[24px] tracking-[0.3px] ">
                  Save changes
                </div>
              </div>
              <div
                className="flex gap-[12px] py-[4px] pr-[12px] pl-[8px] rounded-[8px] border border-[#000000]/20 items-center cursor-pointer active:border-[#6243E6] hover:border-[#000000]/40"
                onClick={() => setCompanyEdit(false)}
              >
                <div>
                  <img
                    src={X}
                    alt=""
                    className="invert-100 w-[16px] h-[16px]"
                  />
                </div>
                <div className="text-[#000000]/80 text-[11px] font-semibold leading-[24px] tracking-[0.3px]">
                  Cancel
                </div>
              </div>
            </div>
          </div>
          <div className="   flex flex-col gap-[12px] ">
            <WrapperForInput title="Agreement:">
              <AgreementInput
                no={no}
                setNo={setNo}
                issue_date={issue_date}
                setIssue_date={setIssue_date}
                formattedDateFun={formattedDateFun}
              />
            </WrapperForInput>
            <WrapperForInput title="Business entity:">
              <BusinessEntityInput
                setBusinessEntity={setBusinessEntity}
                businessEntity={businessEntity}
                dropForBusinessEntity={dropForBusinessEntity}
                dropFunForBusinessEntity={dropFunForBusinessEntity}
              />
            </WrapperForInput>
            <WrapperForInput title="Company type:">
              <CompanyTypeInput
                type={type}
                setType={setType}
                dropForCompanyType={dropForCompanyType}
                dropFunForCompanyType={dropFunForCompanyType}
              />
            </WrapperForInput>
          </div>
        </div>
      )}
    </>
  );
}

export default CompanyDetails;

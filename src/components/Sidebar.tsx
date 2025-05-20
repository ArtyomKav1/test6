import Company from "../assets/Company.svg";
import MainContent from "./MainContent";
import Contractor from "../assets/Contractor.svg";
import { companiesGetType, contactsGetType } from "../api/typeApi";
import { useEffect, useState } from "react";
import { API } from "../api/api";
// import { toast } from "sonner"
function Sidebar() {
  const [data, setData] = useState<companiesGetType | null>(null);
  const [contactsData, setContactsData] = useState<contactsGetType | null>(
    null,
  );
  console.log(data);
  useEffect(() => {
    const companiesGetFetch = async () => {
      try {
        const response = await API.companiesGet();
        setData(response.data);
      } catch (error) {
        // toast.warning('Ошибка запроса данных')
        console.error("Ошибка при запросе companiesGetFetch:", error);
      }
    };
    companiesGetFetch();
  }, []);
  useEffect(() => {
    const contactsGetFetch = async () => {
      try {
        const response = await API.contactsGet();
        setContactsData(response.data);
      } catch (error) {
        // toast.warning('Ошибка запроса данных')
        console.error("Ошибка при запросе contactsGetFetch:", error);
      }
    };
    contactsGetFetch();
  }, []);
  if (!contactsData) {
    return <div>Загрузка...</div>;
  }
  if (!data) {
    return <div>Загрузка...</div>;
  }
  return (
    <>
      <div className="flex max-md:flex-col flex-1  max-md:overflow-x-hidden">
        <div className="sticky top-0 z-50 w-[250px] max-lg:w-[65px] h-screen  max-md:h-[65px] max-md:w-screen bg-[#FFFFFF] shadow-xl px-[20px] pt-[20px] max-md:pt-[10px] max-lg:px-[10px] pb-[24px] flex flex-col gap-[20px]">
          <div className="max-lg:hidden">
            <div className="text-[#000000]/80 text-[14px] font-bold leading-[24px] tracking-[0.3px]">
              Oak Tree Cemetery
            </div>
            <div className="text-[#000000]/80 text-[11px] leading-[16px] tracking-[0.24px]">
              Process Manager
            </div>
          </div>
          <div className="h-[1px] w-[210px] max-lg:hidden bg-[#000000]/10"></div>
          <div
            className="text-[13px] font-semibold leading-[20px] tracking-[0.48px] flex-1 flex md:flex-col gap-[12px] 
                    [&>*]:max-lg:w-[45px] [&>*]:max-lg:pr-[12px]  text-[#3B3B3B] [&>*]:py-[10px] [&>*]:pl-[12px] [&>*]:pr-[40px]
                    [&>*]:rounded-[8px] [&>*]:flex [&>*]:gap-[12px] [&>*]:border [&>*]:border-[#000000]/20   "
          >
            <button className=" bg-[#3B3B3B] text-[#FFFFFF]">
              <img src={Company} alt="" />
              <div className="w-[130px] max-lg:hidden">Organizations</div>
            </button>
            <button>
              <img src={Contractor} alt="" className="invert-100" />
              <div className="w-[130px] max-lg:hidden">Contractors</div>
            </button>
            <button>
              <img src={Company} alt="" className="invert-100 " />
              <div className="w-[130px] max-lg:hidden">Clients</div>
            </button>
          </div>
          <div className="text-[#000000]/30 text-[11px] leading-[16px] tracking-[0.24px] max-lg:hidden">
            All Funeral Services © 2015-2025
          </div>
        </div>
        <MainContent
          data={data}
          contactsData={contactsData}
          setData={setData}
          setContactsData={setContactsData}
        />
      </div>
    </>
  );
}
export default Sidebar;

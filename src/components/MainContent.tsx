import Contacts from "./Contacts/Contacts";
import Chevron from "../assets/Chevron.svg";
import Photos from "./Photos/Photos";
import { companiesGetType, contactsGetType } from "../api/typeApi";
import CompanyDetails from "./CompanyDetails/CompanyDetails";
import Name from "./Name/Name";

type MainContentType = {
  data: companiesGetType;
  contactsData: contactsGetType;
  setData: (arg: companiesGetType) => void;
  setContactsData: (arg: contactsGetType) => void;
};

function MainContent(props: MainContentType) {
  return (
    <>
      <div className="bg-white flex-1 transition-all duration-300 overflow-y-scroll overflow-x-hidden">
        <div className="lg:max-w-[640px] max-lg:w-[100%]  lg:mx-auto flex flex-col gap-[16px] pt-[40px] pb-[28px] px-[20px]">
          <div className="  relative flex justify-between items-center ">
            <button
              className="max-lg:relative max-lg:left-[0px] absolute left-[-45px] w-[32px] h-[32px] flex items-center justify-center
                            hover:bg-[#3B3B3B]/5 rounded-full active:bg-[#9981FF]/20"
            >
              <img
                src={Chevron}
                alt=""
                className="invert-100 w-[20px] h-[20px]"
              />
            </button>
            <Name initName={props.data.name} setData={props.setData} />
          </div>
          <CompanyDetails setData={props.setData} data={props.data} />
          <Contacts
            contactsData={props.contactsData}
            setContactsData={props.setContactsData}
          />
          <Photos photo={props.data.photos} />
        </div>
      </div>
    </>
  );
}
export default MainContent;

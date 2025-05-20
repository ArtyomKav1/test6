import edit from "../../assets/Edit.svg";
import { contactsGetType, contactsPatchBodyType } from "../../api/typeApi";
import { useState } from "react";
import { API } from "../../api/api";
import { ContactsInput } from "./ContactsInput";
import check from "../../assets/Check.svg";
import X from "../../assets/X.svg";
import { toast } from "sonner";
import loader from "../../assets/Loader_white.svg";
import Phone from "./Phone";

function Contacts(props: {
  setContactsData: (arg: contactsGetType) => void;
  contactsData: contactsGetType;
}) {
  const responsiblePersonInition = `${props.contactsData?.firstname} ${props.contactsData?.lastname}`;
  const [responsiblePerson, setResponsiblePerson] = useState(
    responsiblePersonInition,
  );
  const [phoneNumber, setPhoneNumber] = useState(props.contactsData?.phone);
  const [email, setEmail] = useState(props.contactsData?.email);
  const [contactsEdit, setContactsEdit] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const SendDataContacts = async () => {
    let send = false;
    const body: contactsPatchBodyType = {};
    let responsiblePersonmass = responsiblePerson
      .trim()
      .split(" ")
      .filter((i) => i.length > 0);
    if (responsiblePersonmass[0]) body["firstname"] = responsiblePersonmass[0];
    send = true;
    if (responsiblePersonmass[1]) body["lastname"] = responsiblePersonmass[1];
    send = true;
    if (phoneNumber) body["phone"] = phoneNumber;
    send = true;
    if (email) body["email"] = email;
    send = true;
    if (send) {
      setFetchLoading(true);
      try {
        const response = await API.contactsPatch(body);
        if (response.statusText === "OK") {
          toast.success("Данные успешно отправлены!");
          props.setContactsData(response.data);
        } else {
          throw Error;
        }
      } catch (error) {
        toast.warning("Ошибка отправки данных");
        console.error("Ошибка при запросе contactsPatchFetch:", error);
      } finally {
        setFetchLoading(false);
        setContactsEdit(false);
      }
    } else {
      setContactsEdit(false);
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handleResponsiblePerson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setResponsiblePerson(value);
  };

  return (
    <>
      {!contactsEdit ? (
        <div className="  bg-[#FFFFFF] shadow-xl rounded-[16px] p-[24px] flex flex-col gap-[16px]">
          <div className="flex justify-between">
            <div className="text-[#3B3B3B] text-[14px] font-bold leading-[24px] tracking-[0.3px]">
              Contacts
            </div>
            <div
              className="flex gap-[12px] py-[4px] pr-[12px] pl-[8px] rounded-[8px] border border-[#000000]/20 items-center active:border-[#6243E6] hover:border-[#000000]/40"
              onClick={() => setContactsEdit(true)}
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
            </div>
          </div>
          <div className="  flex flex-col gap-[12px]  tracking-[0.25px] leading-[20px] text-[13px]">
            <div className="flex items-center max-msm:flex-col max-msm:items-start">
              <div className="text-[#000000]/50  text-[13px] tracking-[0.25px] leading-[20px] w-[160px] max-sm:w-[130px]">
                Responsible person:
              </div>
              <div className="text-[#000000]/80 text-[14px] tracking-[0.3px] leading-[24px] flex-1">
                {props.contactsData.firstname} {props.contactsData.lastname}
              </div>
            </div>
            <div className="flex items-center max-msm:flex-col max-msm:items-start">
              <div className="text-[#000000]/50 text-[13px] tracking-[0.25px] leading-[20px] w-[160px] max-sm:w-[130px]">
                Phone number:
              </div>
              <div className="text-[#000000]/80 text-[14px] tracking-[0.3px] leading-[24px] flex-1">
                {props.contactsData.phone}
              </div>
            </div>
            <div className="flex items-center max-msm:flex-col max-msm:items-start max-msm:w-[240px] max-msm:overflow-x-scroll">
              <div className="text-[#000000]/50 text-[13px] tracking-[0.25px] leading-[20px] w-[160px] max-sm:w-[50px]">
                E-mail:
              </div>
              <div className="text-[#000000]/80 text-[14px] tracking-[0.3px] leading-[24px] flex-1 flex ">
                {props.contactsData.email}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" bg-[#FFFFFF] shadow-xl rounded-[16px] p-[24px] flex flex-col gap-[16px] relative">
          {fetchLoading && (
            <>
              <div className="absolute inset-0 bg-black/30 rounded-[16px] z-40"></div>
              <div className="absolute right-[45%] animate-spin z-40">
                <img src={loader} alt="" />
              </div>
            </>
          )}
          <div className="flex justify-between max-msm:flex-col max-msm:gap-[10px]">
            <div className="text-[#3B3B3B] text-[14px] font-bold leading-[24px] tracking-[0.3px]">
              Contacts
            </div>
            <div className="flex gap-[12px] h-[28px]">
              <div
                className="flex gap-[12px] py-[4px] pr-[12px] pl-[8px] rounded-[8px] border border-[#000000]/20 items-center active:border-[#6243E6] hover:border-[#000000]/40"
                onClick={() => SendDataContacts()}
              >
                <div>
                  <img
                    src={check}
                    alt=""
                    className="invert-100 w-[16px] h-[16px]"
                  />{" "}
                </div>
                <div className="text-[#000000]/80 text-[11px] font-semibold leading-[24px] tracking-[0.3px]">
                  Save changes
                </div>
              </div>
              <div
                className="flex gap-[12px] py-[4px] pr-[12px] pl-[8px] rounded-[8px] border border-[#000000]/20 items-center cursor-pointer active:border-[#6243E6] hover:border-[#000000]/40"
                onClick={() => setContactsEdit(false)}
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
          <div className="flex flex-col gap-[12px]  tracking-[0.25px] leading-[20px] text-[13px]">
            <ContactsInput
              title={"Responsible person:"}
              onChangeFun={handleResponsiblePerson}
              value={responsiblePerson}
              type={"name"}
            />
            <Phone
              title={"Phone number:"}
              onChangeFun={setPhoneNumber}
              value={phoneNumber}
            />
            <ContactsInput
              title={"Responsible person:"}
              onChangeFun={handleChangeEmail}
              value={email}
              type={"email"}
            />
          </div>
        </div>
      )}
    </>
  );
}
export default Contacts;

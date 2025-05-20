import { useState } from "react";
import edit from "../../assets/Edit.svg";
import { API } from "../../api/api";
import check from "../../assets/Check.svg";
import X from "../../assets/X.svg";
import loader from "../../assets/Loader_black.svg";
import { companiesGetType } from "../../api/typeApi";
import { toast } from "sonner";

function Name(props: {
  initName: string;
  setData: (arg: companiesGetType) => void;
}) {
  const [name, setName] = useState(props.initName);
  const [nameEdit, setNameEdit] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const updateName = async () => {
    if (name.length > 0) {
      const body: { name: string } = { name: name };
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
        setName(props.initName);
        console.error("Ошибка при запросе updateName:", error);
      } finally {
        setNameEdit(false);
        setFetchLoading(false);
      }
    } else {
      setNameEdit(false);
    }
  };
  const inputHandler = (e: string) => {
    if (name.length < 50) {
      setName(e);
    } else {
      toast.warning("Максимальный размер 50 символов.");
    }
  };
  const closeNameEdit = () => {
    setName(props.initName);
    setNameEdit(false);
  };
  return (
    <>
      {!nameEdit ? (
        <>
          <div className="text-[#000000]/80 font-medium text-[28px] max-sm:text-[16px] max-sm:tracking-[0px] leading-[40px] max-sm:leading-[20px] tracking-[0.25px]">
            {name}
          </div>

          <div
            className="w-[32px] h-[32px] flex items-center justify-center"
            onClick={() => setNameEdit(true)}
          >
            <img src={edit} alt="" className="invert-100 w-[20px] h-[20px]" />
          </div>
        </>
      ) : (
        <div className="flex max-sm:flex-col max-sm:items-end w-full gap-[12px] items-center relative ">
          {fetchLoading && (
            <>
              <div className="absolute inset-0 bg-black/30 rounded-[8px]"></div>
              <div className="absolute right-[-50px] animate-spin">
                <img src={loader} alt="" />
              </div>
            </>
          )}
          <input
            type="text"
            className="flex-1 max-sm:w-[100%]  rounded-[8px] py-[10px] px-[12px] bg-[#FFFFFF] border border-[#000000]/20 
                    text-[#000000]/80 text-[14px] leading-[24px] tracking-[0.3px] focus:outline-none focus:border-[#35CDFD]
                    focus:border-[2px] hover:border-[#000000]/50 "
            onChange={(e) => inputHandler(e.target.value)}
            value={name}
          />
          <div className="flex gap-[12px] h-[38px]">
            <div
              className="flex gap-[12px] py-[4px] pr-[12px] pl-[8px] rounded-[8px] border border-[#000000]/20 items-center"
              onClick={() => updateName()}
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
              className="flex gap-[12px] py-[4px] pr-[12px] pl-[8px] rounded-[8px] border border-[#000000]/20 items-center cursor-pointer"
              onClick={closeNameEdit}
            >
              <div>
                <img src={X} alt="" className="invert-100 w-[16px] h-[16px]" />
              </div>
              <div className="text-[#000000]/80 text-[11px] font-semibold leading-[24px] tracking-[0.3px]">
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Name;

// import React from 'react';
// import { Flex, Input } from 'antd';

// const { TextArea } = Input;

// const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     console.log('Change:', e.target.value);
// };

// const App: React.FC = () => (
//     <Flex vertical gap={32}>
//         <Input showCount maxLength={20} onChange={onChange} />
//         <TextArea showCount maxLength={100} onChange={onChange} placeholder="can resize" />
//         <TextArea
//             showCount
//             maxLength={100}
//             onChange={onChange}
//             placeholder="disable resize"
//             style={{ height: 120, resize: 'none' }}
//         />
//     </Flex>
// );

// export default App;

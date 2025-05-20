import { ChangeEvent, useState } from "react";
import { PhotosType } from "../../api/typeApi";
import AddFhoto from "../../assets/AddFhoto.svg";
import PhotosItem from "./PhotosItem";
import { API } from "../../api/api";
import { toast } from "sonner";
import loader from "../../assets/Loader_white.svg";
type Photos = {
  photo: Array<PhotosType>;
};

function Photos(props: Photos) {
  const [photo, setPhoto] = useState(props.photo);
  const [fetchLoading, setFetchLoading] = useState(false);

  const addNewPhotos = async (File: File) => {
    setFetchLoading(true);
    try {
      const response = await API.companiesImagePost(File);
      if (response.statusText === "OK") {
        toast.success("Фото успешно загружено!");
        setPhoto([...photo, response.data]);
      } else {
        throw Error;
      }
    } catch (error) {
      toast.warning("Ошибка при загрузке фото");
      console.error("Ошибка при запросе companiesImagePost:", error);
    } finally {
      setFetchLoading(false);
    }
  };
  const deletPhotos = async (name: string) => {
    setFetchLoading(true);
    try {
      const response = await API.companiesImageDelete(name);
      console.log(response);
      setPhoto(photo.filter((i) => i.name !== name));
      toast.success("Фото успешно удалено!");
    } catch (error) {
      toast.warning("Ошибка при удалении фото");
      console.error("Ошибка при запросе deletNewPhotos:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      addNewPhotos(event.target.files[0]);
    }
  };

  return (
    <>
      <div className="w-full  bg-[#FFFFFF] shadow-xl rounded-[16px] p-[24px] relative">
        {fetchLoading && (
          <>
            <div className="absolute inset-0 bg-black/30 z-20 rounded-[8px]"></div>
            <div className="absolute z-30 right-[50%] animate-spin">
              <img src={loader} alt="" />
            </div>
          </>
        )}

        <div className="flex justify-between">
          <div className="text-[#3B3B3B] text-[14px] font-bold leading-[24px] tracking-[0.3px]">
            Photos
          </div>
          <div
            className="flex gap-[12px] py-[4px] pr-[12px] pl-[8px] rounded-[8px] border border-[#000000]/20 items-center relative 
                        cursor-pointer active:border-[#6243E6] hover:border-[#000000]/40 hover:text-[#6D4AFF] active:text-[#6D4AFF]"
          >
            <div>
              <img
                src={AddFhoto}
                alt=""
                className="invert-100 w-[16px] h-[16px]"
              />
            </div>
            <button className="text-[#000000]/80 text-[11px] font-semibold leading-[24px] tracking-[0.3px]">
              Add
            </button>
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 "
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex gap-[12px] w-[100%] flex-wrap  justify-center pt-[10px]">
          {photo.map((item) => (
            <PhotosItem
              key={item.filepath}
              item={item}
              photos={item.filepath}
              deletPhotos={deletPhotos}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Photos;

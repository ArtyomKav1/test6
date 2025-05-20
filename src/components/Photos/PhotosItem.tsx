import { PhotosType } from "../../api/typeApi";
import Trash from "../../assets/Trash.svg";
function PhotosItem(props: {
  photos: string;
  deletPhotos: (name: string) => void;
  item: PhotosType;
}) {
  return (
    <>
      <div className="relative">
        <img
          src={props.photos}
          className="w-[144px] max-smm:w-[200px] h-[108px] max-smm:h-[150px] rounded-[10px] object-cover"
          alt=""
        />
        <div
          className="bg-[#3B3B3B] rounded-[8px] h-[28px] w-[28px]   flex items-center justify-center absolute right-[8px] top-[8px]"
          onClick={() => props.deletPhotos(props.item.name)}
        >
          <img src={Trash} className="w-[16px] h-[16px]" alt="" />
        </div>
      </div>
    </>
  );
}
export default PhotosItem;

import MainLogo from "../assets/MainLogo.svg";
import Settings from "../assets/Settings.svg";
import Company from "../assets/Company.svg";
import Search from "../assets/Search.svg";
import SingOut from "../assets/SingOut.svg";
import Sidebar from "./Sidebar";

function MainMenu() {
  return (
    <>
      <div className="flex ">
        <div className="bg-[#3B3B3B] h-screen w-[48px] flex flex-col justify-between items-center py-[20px] px-[6px] sticky top-0">
          <div className="flex flex-col items-center gap-[20px]">
            <div>
              <img src={MainLogo} width={36} alt="error" />
            </div>
            <div className="w-[36px] h-[36px] p-[8px] bg-[#FFFFFF]/20 rounded-[8px] ">
              <img src={Company} width={20} alt="error" />
            </div>
            <div>
              <img src={Search} width={20} alt="error" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-[20px] ">
            <div className="h-[1px] w-[19px] bg-[#FFFFFF]/20"></div>
            <div>
              <img src={Settings} width={20} alt="error" />
            </div>
            <div>
              <img src={SingOut} width={20} alt="error" />
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default MainMenu;

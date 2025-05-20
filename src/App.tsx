import { useEffect } from "react";
import MainMenu from "./components/MainMenu";
import { API } from "./api/api";
import { Toaster } from "sonner";

function App() {
  useEffect(() => {
    const authFetch = async () => {
      try {
        const response = await API.authGET();
        localStorage.setItem("token", response.headers.authorization);
      } catch (error) {
        console.error("Ошибка при запросе authFetch:", error);
      }
    };
    authFetch();
  });

  return (
    <>
      <div className="w-screen h-screen bg-[#f7f7f7]">
        <MainMenu />
        <Toaster richColors position="top-right" />
      </div>
    </>
  );
}

export default App;

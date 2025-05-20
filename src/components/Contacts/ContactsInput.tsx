import { useState, useEffect } from "react";
type ContactsInputProps = {
  title: string;
  onChangeFun: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined;
  type?: "email" | "name";
  required?: boolean;
};
export function ContactsInput(props: ContactsInputProps) {
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (isTouched) {
      validateInput(props.value || "");
    }
  }, [props.value, isTouched, props.type]);
  const validateInput = (value: string) => {
    if (props.type === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = regex.test(value);
      setIsValid(isValidEmail);
      setErrorMessage(
        isValidEmail ? "" : "Пожалуйста, введите корректный email",
      );
    } else if (props.type === "name") {
      const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,}$/;
      const isValidName = regex.test(value);
      setIsValid(isValidName);
      setErrorMessage(
        isValidName ? "" : "Имя должно содержать минимум 2 буквы и без цифр",
      );
    } else {
      setIsValid(true);
      setErrorMessage("");
    }
  };
  const handleBlur = () => {
    setIsTouched(true);
    validateInput(props.value || "");
  };

  return (
    <div className="flex flex-col gap-[4px] w-full">
      <div className="flex items-center gap-[12px] max-sm:flex-col max-sm:items-start">
        <div className="text-gray-500 text-sm w-40">
          {props.title}
          {props.required && <span className="text-red-500 ml-[4px]">*</span>}
        </div>
        <div className="flex-1 max-sm:w-full">
          <input
            type="text"
            required={props.required}
            className={`w-full h-[40px] rounded-[8px] py-[8px] px-[12px] bg-white border ${!isValid && isTouched ? "border-red-500 border-[2px]" : "border-gray-200"}
                            text-gray-800 text-[14px] focus:outline-none ${isValid ? "focus:border-blue-300 focus:ring-[2px] focus:ring-blue-100" : "focus:border-red-500"}
                            hover:border-gray-300 transition-colors`}
            onChange={props.onChangeFun}
            onBlur={handleBlur}
            value={props.value}
          />
        </div>
      </div>
      {!isValid && isTouched && (
        <div className="ml-[160px] max-sm:ml-0">
          <p className="text-red-500 text-[12px] mt-[4px]">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

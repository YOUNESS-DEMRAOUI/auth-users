import { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GoIssueClosed } from "react-icons/go";
const FlashMessage = ({ message, setBackMsg, type, setType }) => {
  useEffect(() => {
    setTimeout(() => {
      setBackMsg("");
      setType("");
    }, 3000);
  }, []);
  return message ? (
    <div className="absolute z-20 bottom-4 right-4">
      {type == "error" ? (
        <div className="bg-red-300 py-2 px-4 rounded-md flex justify-center items-center gap-2">
          <AiOutlineCloseCircle className="text-red-900" size={20} />
          <p className="text-red-900 font-medium">{message}</p>
        </div>
      ) : (
        <div className="bg-green-300 py-2 px-4 rounded-md flex justify-center items-center gap-2">
          <GoIssueClosed size={20} className="" />
          <p className="text-green-900 font-medium">{message}</p>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default FlashMessage;

import React from "react";
import { AiOutlineWarning, AiOutlineCheck } from "react-icons/ai";

type Props = {
  status: string;
  message: string;
};
const Alerts = ({ status, message }: Props) => {
  return (
    <div className="max-w-[700px] mx-auto flex justify-center py-6">
      {status === "error" && (
        <div className="w-full p-6 text-center alert bg-red-400/20 rounded-xl border-red-500">
          <span className="text-2xl text-red-700">
            <AiOutlineWarning />
          </span>
          <span className="font-medium text-red-700">{message}</span>
        </div>
      )}

      {status === "success" && (
        <div className="py-6 text-center alert bg-success/40 rounded-xl border-green-500">
          <span className="text-2xl text-green-900">
            <AiOutlineCheck />
          </span>
          <span className="font-medium text-green-900">{message}</span>
        </div>
      )}
    </div>
  );
};

export default Alerts;

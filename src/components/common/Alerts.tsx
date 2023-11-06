import React from "react";
import { AiOutlineWarning, AiOutlineCheck } from "react-icons/ai";

type Props = {
  status: string;
  message: string;
};
const Alerts = ({ status, message }: Props) => {
  return (
    <div className="w-full flex justify-center py-6">
      {status === "error" && (
        <div className="max-w-[500px] alert bg-red-400/80 rounded-xl border-red-500">
          <span className="text-2xl text-red-900">
            <AiOutlineWarning />
          </span>
          <span className="font-medium text-red-900">{message}</span>
        </div>
      )}

      {status === "success" && (
        <div className="max-w-[500px] alert bg-success/40 rounded-xl border-green-500">
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

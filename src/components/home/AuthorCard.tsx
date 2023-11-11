import React from "react";

const AuthorCard = ({ border }: { border?: boolean }) => {
  return (
    <ul className={border ? "p-3 border-b " : "p-3"}>
      <li className="flex gap-2">
        <img
          src="/avatar.jpg"
          className="w-10 h-10 object-cover rounded-full"
        />
        <div>
          <p className="font-semibold text-sm hover:text-primary cursor-pointer">
            Shariar Hossain Sun
          </p>
          <p className="flex items-center gap-1 text-neutral text-xs">
            Programmer
          </p>
        </div>
      </li>
    </ul>
  );
};

export default AuthorCard;

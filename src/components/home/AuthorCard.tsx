import React from "react";
import Link from "next/link";

const AuthorCard = ({ author, border }: any) => {
  return (
    <ul className={border ? "p-3 border-b border-accent " : "p-3"}>
      <li className="flex items-center gap-2">
        <Link href={`/profile/${author?.user_id}`}>
          <img
            src={author?.photo || "/avatar.jpg"}
            className="w-10 h-10 object-cover rounded-full"
          />
        </Link>
        <div>
          <Link href={`/profile/${author?.user_id}`}>
            <p className="font-semibold text-sm hover:text-primary cursor-pointer">
              {author?.name}
            </p>
          </Link>
          <p className="flex items-center gap-1 text-neutral text-xs">
            {author?.occupation}
          </p>
        </div>
      </li>
    </ul>
  );
};

export default AuthorCard;

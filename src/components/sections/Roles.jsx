import { useState } from "react";

const Roles = ({ role }) => {
  const [mouseHover, setMouseHover] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setMouseHover(true);
      }}
      onMouseLeave={() => {
        setMouseHover(false);
      }}
      className="p-6 bg-white hover:shadow-xl shadow-gray-200 rounded-xl w-full border border-gray-200 hover:border-picto-primary relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 h-full w-1 bg-picto-primary transform scale-y-0 transition-transform duration-300 origin-top hover:scale-y-100"></div>
      <div className="w-full">
        <p className="text-xl sm:text-2xl font-semibold text-gray-900 pb-3 gradient-text">
          {role?.title}
        </p>
        <p className="text-[13px] sm:text-[16px] font-normal text-gray-600">
          {role?.description}
        </p>
      </div>
    </div>
  );
};

export default Roles;
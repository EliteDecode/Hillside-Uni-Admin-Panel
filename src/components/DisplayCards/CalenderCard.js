import React from "react";

const CalenderCard = ({
  title,
  description,
  year,
  isPublished,
  start,
  end,
}) => {
  return (
    <div className=" bg-white shadow-lg rounded-lg overflow-hidden sm:mx-4 mx-1 sm:mt-0 mt-1">
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 text-[20px] mt-2">{description}</p>
        <p className="text-gray-500 text-sm mt-2 font-bold">
          Calender Year: {year}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-sm mt-2 font-bold">
            Starts Date:{" "}
            {new Date(start).toLocaleString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",

              hour12: true,
            })}
          </p>
          <p className="text-gray-500 text-sm mt-2 font-bold">
            End Date:{" "}
            {new Date(end).toLocaleString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",

              hour12: true,
            })}
          </p>
        </div>
        <button
          className={`mt-4 px-4 py-2 rounded-full ${
            isPublished ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}>
          {isPublished ? "Published" : "Not Published"}
        </button>
      </div>
    </div>
  );
};

export default CalenderCard;

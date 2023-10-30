import React from "react";

const DisplayCards = ({ title, description, date, isPublished, img }) => {
  return (
    <div className=" bg-white shadow-lg rounded-lg overflow-hidden sm:mx-4 mx-1 sm:mt-0 mt-1">
      <img src={img} alt="Selected" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 text-[20px] mt-2">{description}</p>
        <p className="text-gray-500 text-sm mt-2 font-bold">Date: {date}</p>
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

export default DisplayCards;

import React from "react";

const DisplayCards = ({ title, description, date, isPublished, img, id }) => {
  return (
    <div className=" bg-white border-l-2 p-3 rounded-lg overflow-hidden sm:mx-4 mx-1 sm:mt-0 mt-1">
      <img src={img} alt="Selected" width={id ? "60%" : "100%"} />
      <div className="">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 text-[20px] mt-2">{description}</p>
        {date && (
          <p className="text-gray-500 text-sm mt-2 font-bold">
            {id ? "Date of Application" : "Date"}:{" "}
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
        {id ? (
          <>
            <h3 className="text-[18px] mb-1">Status:</h3>
            <button
              className={` px-4 py-2 rounded-full ${
                isPublished
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}>
              {isPublished ? "Approved" : "Pending"}
            </button>
          </>
        ) : (
          <button
            className={`mt-4 px-4 py-2 rounded-full ${
              isPublished ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}>
            {isPublished ? "Published" : "Not Published"}
          </button>
        )}
      </div>
    </div>
  );
};

export default DisplayCards;

import React from "react";

type Props = {
  heading: string;
  backgroundColor?: string;
  textColor?: string;
  buttonInfo: {
    link: string;
    text: string;
    backgroundColor?: string;
    textColor?: string;
  };
  children: React.ReactNode;
};

function InfoBox({
  heading,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  buttonInfo,
  children,
}: Props) {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`text-2xl ${textColor}  font-bold`}>{heading}</h2>
      <p className="mt-2 mb-4">{children} </p>
      <a
        href={buttonInfo.link}
        className={`inline-block ${buttonInfo.backgroundColor} ${buttonInfo.textColor} rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {buttonInfo.text}
      </a>
    </div>
  );
}

export default InfoBox;

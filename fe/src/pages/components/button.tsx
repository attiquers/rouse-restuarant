import React from "react";

interface ButtonProps {
  name: string;
  link: string;
}

const SecondaryButton: React.FC<ButtonProps> = ({ name, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <button className="text-[1rem] px-6 py-1 bg-white text-background border-background border-2 rounded-2xl hover:bg-background hover:text-white transition-all duration-75 shadow-md  active:translate-y-1 hover:shadow-sm shadow-[#363636]">
        {name}
      </button>
    </a>
  );
};

const PrimaryButton: React.FC<ButtonProps> = ({ name, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <button className="text-[1rem] px-6 py-1 bg-background text-white border-white border-2 rounded-2xl hover:bg-white hover:text-background transition-all duration-75 shadow-md  active:translate-y-1 hover:shadow-sm shadow-[#363636]">
        {name}
      </button>
    </a>
  );
};

export { SecondaryButton, PrimaryButton };

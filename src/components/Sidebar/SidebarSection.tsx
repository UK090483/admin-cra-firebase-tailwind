import * as React from "react";

interface ISidebarSectionProps {
  label: string;
}

const SidebarSection: React.FC<ISidebarSectionProps> = (props) => {
  return (
    <>
      {/* <hr className="my-4 md:min-w-full" /> */}
      <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
        {props.label}
      </h6>

      <ul className="md:flex-col md:min-w-full flex flex-col list-none">
        {props.children}
      </ul>
    </>
  );
};

export default SidebarSection;

import * as React from "react";

interface IAccordionProps {
  label: string | JSX.Element;
}

const Accordion: React.FunctionComponent<IAccordionProps> = (props) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = React.useState<number | string>(0);
  const [animate, setAnimate] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   let timeOut = null;
  //   if (innerRef.current) {
  //     open
  //       ? setHeight(innerRef.current.getBoundingClientRect().height)
  //       : setHeight(0);

  //     if (open) {
  //       timeOut = setTimeout(() => {
  //         setHeight("fit-content");
  //       }, 1000);
  //     }
  //   }
  // }, [open]);

  const handleClick = () => {
    if (open) {
      setHeight(0);
      setOpen(false);
      return;
    }

    if (innerRef.current) {
      setOpen(true);
      setHeight(innerRef.current.getBoundingClientRect().height);
    }
  };

  const { label } = props;
  return (
    <div className="group flex align-center flex-col ">
      <div
        onMouseDown={() => handleClick()}
        className="w-full px-5 py-3 bg-indigo-300 text-white group-focus:text-yellow-300   inline-block hover:opacity-75 hover:shadow hover:-mb-3 rounded-t"
      >
        {label}
      </div>

      <div
        className={`h-0 transition-all duration-500   overflow-hidden border`}
        style={{ minHeight: height }}
      >
        <div ref={innerRef} className="p-4">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;

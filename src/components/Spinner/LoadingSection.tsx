import { Spinner } from "./Spinner";
interface ILoadingSection {
  loading: boolean;
  children: JSX.Element;
}

const LoadingSection: React.FC<ILoadingSection> = ({ loading, children }) => {
  return (
    <div className={"overflow-hidden relative"}>
      <div
        className={` absolute flex justify-center items-center h-0 ${
          loading ? "opacity-50 h-full w-full  z-50" : "opacity-0"
        } `}
      >
        <Spinner size={"1/3"} />
      </div>
      <div className={` ${loading ? "opacity-40" : "opacity-100"} `}>
        {children}
      </div>
    </div>
  );
};

export default LoadingSection;

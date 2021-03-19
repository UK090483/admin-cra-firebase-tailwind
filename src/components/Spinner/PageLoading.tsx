import { Spinner } from "./Spinner";

const PageLoading: React.FC = () => {
  return (
    <div
      data-testid="pageLoading"
      className="w-full flex justify-center items-center"
    >
      <Spinner size="1/2" />
    </div>
  );
};

export default PageLoading;

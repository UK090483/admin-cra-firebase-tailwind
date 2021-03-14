import { useHistory } from "react-router-dom";

const useRedirect = () => {
  let history = useHistory();

  const redirect = (path: string) => {
    history.push(`/${path}`);
  };
  return { redirect };
};

export default useRedirect;

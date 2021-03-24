import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Reducers/RootReducer";

interface IAlertProps {}

const Alert: React.FunctionComponent<IAlertProps> = (props) => {
  const { errors, hasErrors } = useSelector((state: RootState) => ({
    errors: state.errors.errors,
    hasErrors: state.errors.errors.length > 0,
  }));

  const [shown, setShown] = React.useState(0);

  React.useEffect(() => {
    if (!hasErrors) return;
    if (errors.length === shown) return;

    setTimeout(() => {
      setShown(shown + 1);
    }, 2000);
  }, [errors]);

  return (
    <div className={` fixed bottom-12 right-6 z-50`}>
      {hasErrors &&
        errors.slice(shown).map((err, index) => {
          return (
            <div key={index} className={`bg-red-500 p-12 `}>
              {err.message}
            </div>
          );
        })}
    </div>
  );
};

export default Alert;

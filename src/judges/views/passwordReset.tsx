import Button from "components/Buttons/Button";
import * as React from "react";
import { useFirebase } from "react-redux-firebase";

interface IPasswordResetProps {
  email: string;
}

const PasswordReset: React.FunctionComponent<IPasswordResetProps> = ({
  email,
}) => {
  const firebase = useFirebase();
  const handleClick = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail("web@konradullrich.com");
    } catch (error) {}
  };

  return <Button onClick={handleClick}>Send Reset Password Email</Button>;
};

export default PasswordReset;

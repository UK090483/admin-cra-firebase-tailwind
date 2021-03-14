import { FormField } from "components/Form/Form";

import { IUserRecord } from "../UserTypes";

interface Field {
  label: string;
  src: string;
  type: string;
  formType: string;
  options?: any;
  validation?: (val: string) => string | undefined;
  initialValue?: string | boolean;
}

interface Fields {
  [key: string]: Field;
}

interface IUserType {
  [propName: string]: any;
  fields: Fields;
}

class UserH {
  fields: IUserType;

  constructor(a: IUserType) {
    this.fields = a;
  }

  getFormFields = (user?: IUserRecord): FormField[] => {
    return Object.entries(this.fields.fields).map(([key, value]) => {
      return {
        name: value.src,
        type: value.formType,
        label: value.label,
        ...(value.initialValue && { initialValue: value.initialValue }),
        ...(value.validation && { validation: value.validation }), //@ts-ignore
        ...(user && { initialValue: user[value.src] }),
        ...(value.options && { options: value.options }),
      } as FormField;
    });
  };
}

const userType: IUserType = {
  fields: {
    name: {
      label: "Name",
      src: "name",
      type: "string",
      formType: "text",
    },
    email: {
      label: "Email",
      src: "email",
      type: "string",
      formType: "text",
      validation: (value) => {
        if (!value) {
          return "Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          return "Invalid email address";
        }
      },
    },
    admin: {
      label: "Admin",
      src: "admin",
      type: "boolean",
      formType: "checkbox",
      initialValue: true,
    },
    active: {
      label: "Active",
      src: "active",
      type: "boolean",
      formType: "checkbox",
      initialValue: true,
    },
    write: {
      label: "Write",
      src: "write",
      type: "boolean",
      formType: "checkbox",
      initialValue: false,
    },
  },
};

const userHelper = new UserH(userType);

export { userHelper };

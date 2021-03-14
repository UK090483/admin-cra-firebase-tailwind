import { FormField } from "components/Form/Form";
import { IJudgeRecord } from "../JudgeTypes";

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

interface IJudgeType {
  [propName: string]: any;
  fields: Fields;
}

class JudgeH {
  fields: IJudgeType;

  constructor(a: IJudgeType) {
    this.fields = a;
  }

  getFormFields = (judge?: IJudgeRecord): FormField[] => {
    return Object.entries(this.fields.fields).map(([key, value]) => {
      return {
        name: value.src,
        type: value.formType,
        label: value.label,
        ...(value.initialValue && { initialValue: value.initialValue }),
        ...(value.validation && { validation: value.validation }), //@ts-ignore
        ...(judge && { initialValue: judge[value.src] }),
        ...(value.options && { options: value.options }),
      } as FormField;
    });
  };
  getFormBuilderFields = (judge?: IJudgeRecord): any[] => {
    return Object.entries(this.fields.fields).map(([key, value]) => {
      return {
        name: value.src,
        type: value.formType,
        label: value.label,
        ...(value.initialValue && { initialValue: value.initialValue }),
        ...(value.validation && { validation: value.validation }), //@ts-ignore
        ...(judge && { initialValue: judge[value.src] }),
        ...(value.options && { options: value.options }),
      };
    });
  };
}

const judgeType: IJudgeType = {
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
        return value && value.length > 10
          ? undefined
          : "must be longer than 10";
      },
    },
    color: {
      label: "Color",
      src: "color",
      type: "string",
      formType: "color",
    },
    judgeType: {
      label: "Type",
      src: "judgeType",
      type: "string",
      formType: "select",
      initialValue: "pre",
      options: {
        options: [
          { label: "Pre", value: "pre" },
          { label: "Main", value: "main" },
        ],
      },
    },
    active: {
      label: "Active",
      src: "active",
      type: "boolean",
      formType: "checkbox",
      initialValue: true,
    },
  },
};

const JudgeHelper = new JudgeH(judgeType);

export { JudgeHelper };

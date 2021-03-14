import { ApplicationHelper } from "applications/helper/ApplicationHelper";
import ListField from "components/Fields/ListField";
import MediaArrayField from "components/Fields/MediaArrayField";
import TextField from "components/Fields/TextField";
import * as React from "react";
import { IApplicationRecord } from "../../applications/ApplicationTypes";

interface IAccordionFieldsProps {
  extraClasses: string;
  topic: string;
  application: IApplicationRecord;
}

const AccordionFields: React.FunctionComponent<IAccordionFieldsProps> = ({
  topic,
  extraClasses,
  application,
}) => {
  return (
    <div className={`${extraClasses}`}>
      {ApplicationHelper.getFields(topic).map((field, index) => {
        if (field.field.type === "text") {
          return (
            <TextField
              key={index}
              label={field.field.label}
              // @ts-ignore
              text={application[field.key]}
            />
          );
        }

        if (field.field.type === "list") {
          return (
            <ListField
              key={index}
              label={field.field.label}
              // @ts-ignore
              list={application[field.key]}
            />
          );
        }

        if (field.field.type === "mediaArray") {
          return (
            <MediaArrayField
              key={index}
              label={field.field.label}
              // @ts-ignore
              mediaArray={application[field.key]}
            />
          );
        }
      })}
    </div>
  );
};

export default AccordionFields;

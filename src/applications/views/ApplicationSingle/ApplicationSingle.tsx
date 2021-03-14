import React from "react";
import { useParams } from "react-router-dom";
import { RoutingParam } from "types";
import ApplicationAccordion from "./ApplicationAccordion/ApplicationAccordion";
import useApplicationById from "../../hooks/useApplicationById";
import ApplicationSingleTable from "./ApplicationSingleTable";
import ActionButton from "components/Buttons/ActionButton";

const ApplicationSingle: React.FC = () => {
  let { id } = useParams<RoutingParam>();
  const application = useApplicationById(id);

  return (
    <>
      {application && (
        <h2 className="mt-0 text-4xl">{application.startupName}</h2>
      )}

      {application?.assessments && (
        <ApplicationSingleTable application={application} />
      )}

      <h2 className="py-10 text-4xl">Antworten</h2>

      {application && (
        <div className="mb-8 -mt-8">
          <ActionButton
            path={`/applications/${application.id}/update`}
            type="update"
          />
        </div>
      )}

      {application && <ApplicationAccordion application={application} />}
    </>
  );
};

export default ApplicationSingle;

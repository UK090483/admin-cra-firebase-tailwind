/*eslint-disable*/
import React from "react";
import SidebarLink from "./SideBarLink";
import SidebarSection from "./SidebarSection";
import SidebarContainer from "./SidebarContainer";

import { Scale, Users, AcademicCap } from "heroicons-react";

import Seed from "../Seed/Seed";

interface ISidebar {}
const Sidebar: React.FC<ISidebar> = () => {
  return (
    <SidebarContainer>
      <SidebarSection label={""}>
        <SidebarLink
          route={"/applications"}
          label={"Applications"}
          Icon={AcademicCap}
        />

        <SidebarLink route={"/judges"} label={"Judges"} Icon={Scale} />
        <SidebarLink route={"/users"} label={"Users"} Icon={Users} />
      </SidebarSection>

      <SidebarSection label={""}>{/* <Seed /> */}</SidebarSection>
    </SidebarContainer>
  );
};

export default Sidebar;

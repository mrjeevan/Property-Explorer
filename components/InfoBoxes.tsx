import React from "react";
import InfoBox from "./InfoBox";

type Props = {};

function InfoBoxes({}: Props) {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading={"For Renters"}
            backgroundColor={"bg-gray-100"}
            buttonInfo={{
              link: "/properties",
              text: "Browse properties",
              backgroundColor: "bg-blue-500",
              textColor: "text-white",
            }}
          >
            Find your dream rental properties
          </InfoBox>
          <InfoBox
            heading={"For Renters"}
            backgroundColor={"bg-blue-100"}
            buttonInfo={{
              link: "/properties/add",
              text: "Add properties",
              backgroundColor: "bg-black",
              textColor: "text-white",
            }}
          >
            List Your properties and reach out potential clients
          </InfoBox>
        </div>
      </div>
    </section>
  );
}

export default InfoBoxes;

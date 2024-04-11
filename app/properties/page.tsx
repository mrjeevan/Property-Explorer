import PropertyCard from "@/components/Properties/PropertyCard";
import { IProperty } from "@/types/property";
import { ReactNode } from "react";
import { fetchProperties } from "@/utils/requests";
type Props = {};

async function PropertiesPage({}: Props) {
  const properties: IProperty[] = await fetchProperties();
  // sort properties wrt dates
  properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
    properties && (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.length === 0 ? (
              <div>No Properties found</div>
            ) : (
              properties.map((property: IProperty): ReactNode => {
                return (
                  <PropertyCard
                    key={property._id}
                    property={property}
                  ></PropertyCard>
                );
              })
            )}
          </div>
        </div>
      </section>
    )
  );
}

export default PropertiesPage;

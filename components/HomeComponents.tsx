import PropertyCard from "@/components/Properties/PropertyCard";
import { IProperty } from "@/types/property";
import { fetchProperties } from "@/utils/requests";
import Link from "next/link";

async function HomeComponents() {
  let data = await fetchProperties();

  const randomProperties = data.properties || [];

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/*  */}
            {randomProperties.length === 0 ? (
              <p>No Properties found</p>
            ) : (
              randomProperties.map((property: IProperty) => {
                return <PropertyCard key={property._id} property={property} />;
              })
            )}
            {/*  */}
          </div>
        </div>
      </section>
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
}

export default HomeComponents;

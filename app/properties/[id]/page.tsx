"use client";
import BookMarkButton from "@/components/Properties/BookMarkButtons";
import PropertyContactForm from "@/components/Properties/PropertyContactForm";
import PropertyDetails from "@/components/Properties/PropertyDetails";
import PropertyHeaderImage from "@/components/Properties/PropertyHeaderImage";
import PropertyImages from "@/components/Properties/PropertyImages";
import SharePropertyButtons from "@/components/Properties/SharePropertyButton";
import Spinner from "@/components/spinner";
import { IProperty } from "@/types/property";
import { fetchProperty } from "@/utils/requests";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

//  function PropertyPage({ params }: { params: { id: string } }) {

function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<IProperty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id as string);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching Property : ", error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="text-center mt-10 font-bold text-2xl">
        Property Not Found !
      </h1>
    );
  }
  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />

                <aside className="space-y-4">
                  <BookMarkButton property={property} />
                  <SharePropertyButtons property={property} />

                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
}

export default PropertyPage;

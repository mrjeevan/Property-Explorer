"use client";
import PropertyCard from "@/components/Properties/PropertyCard";
import Spinner from "@/components/spinner";
import { IProperty } from "@/types/property";
import React, { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {};

export default function SavedPages({}: Props) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      console.log("fetchSavedProperties call");
      setLoading(true);
      try {
        const res = await fetch("/api/bookmarks/check");
        if (res.ok) {
          const data = await res.json();
          setProperties(data);
        } else {
          console.log(res.statusText);
          toast.error("Failed to fetch saved properties");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch saved properties");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProperties();
  }, []);

  console.log(properties);
  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          {properties && (
            <section className="px-4 py-6">
              <h1 className="text-center text-3xl mb-4 ">Saved Properties</h1>
              <div className="container-xl lg:container m-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {properties.length === 0 ? (
                    <div>No saved properties found</div>
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
          )}
        </>
      )}
    </>
  );
}

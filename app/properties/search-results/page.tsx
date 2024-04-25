"use client";
import PropertyCard from "@/components/Properties/PropertyCard";
import PropertySearchForm from "@/components/Properties/PropertySearchForm";
import Spinner from "@/components/spinner";
import { IProperty } from "@/types/property";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

type Props = {};
// TODO fix search wrt propertyType // keyword=an&propertyType=Studio not working properly
export default function PropertySearchResult({}: Props) {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?keyword=${keyword}&propertyType=${propertyType}`
        );
        if (res.ok) {
          const properties = await res.json();
          setProperties(properties);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [keyword, propertyType]);

  return (
    <>
      <div className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8 ">
          <PropertySearchForm />
        </div>
      </div>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="px-4 py-6">
          <Link
            href={"/properties"}
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to properties
          </Link>
          <h1 className="text-2xl m-4 text-center">Search Results</h1>
          {properties && (
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
          )}
        </div>
      )}
    </>
  );
}

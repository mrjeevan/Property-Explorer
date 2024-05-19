"use client";
import { IProperty } from "@/types/property";
import React, { ReactNode, useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import Spinner from "../spinner";
import Pagination from "../Pagination";

const Properties = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  const handlePageChange = (newPage: number) => {
    console.log("handle page change", newPage);
    if (newPage >= 1 && newPage <= Math.ceil(totalItems / pageSize)) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pagesize=${pageSize}`
        );
        if (res.ok) {
          const data = await res.json();
          setProperties(data.properties || []);
          setTotalItems(data.total);
        } else {
          console.log("Failed to fetch data");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchAllProperties();
  }, [page, pageSize]);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
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
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Properties;

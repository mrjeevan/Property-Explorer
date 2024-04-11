"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession as UseSession } from "next-auth/react";
import DefaultProfile from "@/assets/images/profile.png";
import Spinner from "@/components/spinner";
import { IProperty } from "@/types/property";
import { toast } from "react-toastify";
type Props = {};

function ProfilePage({}: Props) {
  const { data: session } = UseSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [properties, setProperties] = useState<IProperty[]>([] as IProperty[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProperties = async (userId: string) => {
      if (!userId) {
        return;
      } else {
        try {
          const res = await fetch(`/api/properties/user/${userId}`);
          if (res.status === 200) {
            const data = await res.json();
            setProperties(data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    // fetch user Properties only if session is present
    if (session?.user && "id" in session.user) {
      fetchUserProperties(session.user?.id as string);
    }
  }, [session]);

  const handlePropertyDelete = async (id: string) => {
    const confirmed = window.confirm(
      "are you sure you want to delete this property?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });

      if (res.ok) {
        setProperties((properties) =>
          properties.filter((property) => property._id !== id)
        );
        toast.success("Successfully Deleted!");
      } else toast.error("Failed to Deleted!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Deleted!");
    }
  };

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || DefaultProfile}
                  alt="User Profile image"
                  width={240}
                  height={240}
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && properties.length === 0 && (
                <p>No properties added Yet</p>
              )}
              {loading ? (
                <Spinner loading />
              ) : (
                properties.map((property, index) => {
                  return (
                    <div key={index} className="mb-10">
                      <Link href={`/properties/${property._id}`}>
                        <Image
                          className="h-32 w-full rounded-md object-cover"
                          src={property.images[0]}
                          alt="Property"
                          width={500}
                          height={100}
                          priority={true}
                        />
                      </Link>
                      <div className="mt-2">
                        <p className="text-lg font-semibold">{property.name}</p>
                        <p className="text-gray-600">
                          {property.location.street} {property.location.city}{" "}
                          {property.location.state}
                        </p>
                      </div>
                      <div className="mt-2">
                        <a
                          href={`/properties/${property._id}/edit`}
                          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                        >
                          Edit
                        </a>
                        <button
                          onClick={() => {
                            handlePropertyDelete(property._id);
                          }}
                          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;

import connectDb from "@/config/database";
import Property from "@/models/Property";
import { IProperty } from "@/types/property";
import { getSessionUser } from "@/utils/getSessionUser";

type Params = {
  id: string;
};

export const GET = async (request: Request, context: { params: Params }) => {
  const { id } = context.params;

  try {
    // Connect to the database
    await connectDb();

    // Query for the property by id
    const property = await Property.findById(id);

    // If property is not found, return 404 response
    if (!property) return new Response("Property not found", { status: 404 });

    // Return the property as JSON
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.error(error); // Log any errors that occur
    return new Response(`Something went wrong: ${error}`, { status: 500 });
  }
};

export const DELETE = async (request: Request, context: { params: Params }) => {
  const { id: propertyId } = context.params;
  const session = await getSessionUser();

  // always check for session b4 deleting/editing
  if (!session || !session.userID) {
    return new Response("User Id is required", { status: 401 });
  }

  const { userID } = session;

  try {
    // Connect to the database
    await connectDb();

    // Query for the property by id
    const property = await Property.findById(propertyId);
    console.log("delete property", property);
    console.log("property.owner", property.owner);
    console.log("userID", userID);
    // If property is not found, return 404 response
    if (!property) return new Response("Property not found", { status: 404 });

    if (property.owner.toString() !== userID)
      return new Response("Unauthorized", { status: 401 });

    await property.deleteOne();

    // Return the property as JSON
    return new Response("Property Deleted", { status: 200 });
  } catch (error) {
    console.error(error); // Log any errors that occur
    return new Response(`Something went wrong: ${error}`, { status: 500 });
  }
};

// PUT is to update an existing record (replace)
// PATCH is to update few fields of existing record (partial modification)
export const PUT = async (req: Request, context: { params: Params }) => {
  const { id: propertyId } = context.params;

  try {
    await connectDb();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userID) {
      return new Response("User ID is required", { status: 401 });
    }

    const formData = await req.formData();
    //  access all amenities and images
    const amenities = formData.getAll("amenities");

    // create property object to submit to DB
    // we need connector because form data is
    // { name: 'type', value: 'Apartment' }

    // get property to update also check if owner === user

    const existingProperty = await Property.findById(propertyId);

    if (!existingProperty) {
      return new Response("Property not found", { status: 404 });
    }

    if (existingProperty.owner.toString() !== sessionUser.userID) {
      return new Response("Unauthorized", { status: 401 });
    }

    const propertyData: any = {
      types: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipCode: formData.get("location.zipCode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: sessionUser.userID,
      amenities,
      images: existingProperty.images,
    };

    console.log("propertyData to be updated to", propertyData);

    // update property in DB
    const updatedProperty = await Property.findOneAndReplace(
      { _id: propertyId },
      propertyData
    );

    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong adding property", {
      status: 500,
    });
  }
};

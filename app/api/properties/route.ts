import connectDb from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";
import { IProperty } from "@/types/property";

// GET /api/properties
export const GET = async (req: Request) => {
  try {
    await connectDb();
    const properties = await Property.find();
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong /properties", {
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    await connectDb();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userID) {
      return new Response("User ID is required", { status: 401 });
    }

    const formData = await req.formData();
    //  access all amenities and images
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image: any) => image["name"] !== "");
    // create property object to submit to DB
    // we need connector because form data is
    // { name: 'type', value: 'Apartment' }

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
      // handle images later
      // images,
    };

    // upload images to cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      // ts issue with image conversion to arrayBuffer
      if (image instanceof File) {
        const imageBuffer = await image.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);
        //  convert image data to base64
        const imageBase64 = imageData.toString("base64");
        // make req to upload to cloudinary
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${imageBase64}`,
          { folder: "propertyPulse", timeout: 60000 }
        );
        imageUploadPromises.push(result.secure_url);
        // wait for all images to be uploaded
        const uploadedImages = await Promise.all(imageUploadPromises);
        //  add uploaded images to propertyData
        propertyData.images = uploadedImages;
      }
    }
    const newProperty = new Property(propertyData);
    console.log("newProperty before adding", newProperty);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );

    // return new Response(JSON.stringify({ message: "success" }), {
    //   status: 200,
    // });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong adding property", {
      status: 500,
    });
  }
};

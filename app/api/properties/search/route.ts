import connectDb from "@/config/database";
import Property from "@/models/Property";
export const GET = async (req: Request) => {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword");
    const propertyType = searchParams.get("propertyType");

    const keywordPattern = keyword && new RegExp(keyword, "i");

    let query: any = {
      $or: [
        { name: keywordPattern },
        { description: keywordPattern },
        {
          "location.street": keywordPattern,
        },
        {
          "location.city": keywordPattern,
        },
        {
          "location.state": keywordPattern,
        },
        {
          "location.zipCode": keywordPattern,
        },
      ],
    };

    // only properties other than all

    if (propertyType && propertyType !== "All") {
      const propertyTypePattern = propertyType && new RegExp(propertyType, "i");

      query.type = propertyTypePattern;
    }
    console.log("query", query);
    const properties = await Property.find(query);

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

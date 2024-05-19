const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
  // handling case where api is not yet put into env

  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch /properties");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchProperty(id: String) {
  try {
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw Error("Failed to fetch /properties/id");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchProperties, fetchProperty };

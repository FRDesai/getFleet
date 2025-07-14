import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get("JSESSIONID");

  if (!cookie) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Fetch Devices
  const DeviceResponse = await fetch(
    "https://gps-staging.getfleet.ai/api/devices",
    {
      method: "GET",
      headers: {
        Cookie: `JSESSIONID=${cookie.value}`,
      },
    }
  );

  const devices = await DeviceResponse.json();
  console.log("Devices: ", devices)
  // Fetch Positions
  const positionsResponse = await fetch(
    "https://gps-staging.getfleet.ai/api/positions",
    {
      method: "GET",
      headers: {
        Cookie: `JSESSIONID=${cookie.value}`,
      },
    }
  );

  const positions = await positionsResponse.json();
  console.log("Positions: ",positions )
  // Enrich positions with simplified address
  const enrichedPositions = await Promise.all(
    positions.map(async (pos: any) => {
      if (pos.latitude && pos.longitude) {
        try {
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.latitude}&lon=${pos.longitude}&format=json`
          );
          const geoData = await geoRes.json();
          const addr = geoData.address;

          const place =
            addr.suburb || addr.neighbourhood || addr.hamlet || addr.village || "";
          const city = addr.city || addr.town || addr.village || addr.county || "";

          const shortAddress = [place, city].filter(Boolean).join(", ");

          return { ...pos, address: shortAddress || "Unknown" };
        } catch (err) {
          console.error("Geocoding failed:", err);
          return { ...pos, address: "Unknown" };
        }
      } else {
        return { ...pos, address: "Unknown" };
      }
    })
  );

  return new Response(
    JSON.stringify({
      devices,
      positions: enrichedPositions,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

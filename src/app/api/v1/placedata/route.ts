import { NextRequest, NextResponse } from "next/server";
import indianCities from "../../../../data/indianCities.json";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get("action");
    const stateParam = searchParams.get("state");
    const cityParam = searchParams.get("city");

    if (stateParam && cityParam) {
      const stateObj = indianCities.find(
        (s) => s.state.toLowerCase() === stateParam.toLowerCase()
      );
      if (!stateObj) {
        return NextResponse.json({ error: "State not found" }, { status: 404 });
      }

      const cityObj = stateObj.districts.find(
        (c) => c.name.toLowerCase() === cityParam.toLowerCase()
      );
      if (!cityObj) {
        return NextResponse.json({ error: "City not found" }, { status: 404 });
      }

      return NextResponse.json({
        latitude: cityObj.latitude,
        longitude: cityObj.longitude,
      });
    }

    if (stateParam) {
      const stateObj = indianCities.find(
        (s) => s.state.toLowerCase() === stateParam.toLowerCase()
      );
      if (!stateObj) {
        return NextResponse.json({ error: "State not found" }, { status: 404 });
      }

      // Return districts for the given state
      return NextResponse.json(stateObj.districts);
    }

    if (action === "states") {
      const states = indianCities.map((s) => s.state);
      return NextResponse.json(states);
    }

    // Default: return all data
    return NextResponse.json(indianCities);
  } catch (error: any) {
    console.error("Error fetching place data:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

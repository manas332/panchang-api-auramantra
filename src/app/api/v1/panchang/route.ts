import { NextRequest, NextResponse } from "next/server";
const { MhahPanchang } = require("mhah-panchang");

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get("date");
    const latParam = searchParams.get("lat");
    const lngParam = searchParams.get("lng");

    let date = new Date();
    if (dateParam) {
      const parsedDate = new Date(dateParam);
      if (!isNaN(parsedDate.getTime())) {
        date = parsedDate;
      } else {
        return NextResponse.json(
          { error: "Invalid date format. Please provide a valid ISO date string." },
          { status: 400 }
        );
      }
    }

    const panchang = new MhahPanchang();
    
    // Core calculation
    const calculateResult = panchang.calculate(date);
    let result: Record<string, any> = { ...calculateResult };

    // If latitude and longitude are provided, add calendar and sunTimer details
    if (latParam && lngParam) {
      const lat = parseFloat(latParam);
      const lng = parseFloat(lngParam);

      if (isNaN(lat) || isNaN(lng)) {
        return NextResponse.json(
          { error: "Invalid lat or lng. Please provide valid numbers." },
          { status: 400 }
        );
      }

      const calendarResult = panchang.calendar(date, lat, lng);
      const sunTimerResult = panchang.sunTimer(date, lat, lng);

      result = {
        ...result,
        calendar: calendarResult,
        sunTimings: sunTimerResult,
        location: {
          lat,
          lng,
        },
      };
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error generating panchang data:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

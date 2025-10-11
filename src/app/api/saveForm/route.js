export async function POST(request) {
  try {
    const sheetUrl =
      "https://script.google.com/macros/s/AKfycbz53FbvBbXTP2jlSgIAUje01NY0f4OQXxlcG1lFQXEYjX-z1nbeMtFE1V9iI2iZ-V3g/exec";

    // Read form body
    const body = await request.text();

    // Forward request to Google Apps Script
    const response = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Script Error:", errorText);
      return new Response(
        JSON.stringify({ error: "Failed to save data to Google Sheets" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

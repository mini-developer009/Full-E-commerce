// app/api/weather/route.ts
export async function GET() {
  try {
    const res = await fetch('https://wttr.in/Dhaka?format=j1');
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    return new Response('Failed to fetch weather', { status: 500 });
  }
}

export async function GET() {
  const res = await fetch('https://6628925e54afcabd07362c21.mockapi.io/learn')
  const data = await res.json()
 
  return Response.json({ data })
}
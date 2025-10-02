import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Mock API response - in production, send to CRM/email service
    console.log("[v0] Lead form submission:", data)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({ success: true, message: "Lead submitted successfully" })
  } catch (error) {
    console.error("[v0] Error submitting lead:", error)
    return NextResponse.json({ success: false, message: "Failed to submit lead" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"

export async function GET() {
  try {
    // Check if database is configured
    if (!process.env.DATABASE_URL) {
      console.log("[v0] DATABASE_URL not configured, returning null user")
      return NextResponse.json({ user: null })
    }

    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return NextResponse.json({ user: null })
    }

    // Try to get full user data from database
    try {
      const { getUserByEmail } = await import("@/lib/db")
      const user = await getUserByEmail(currentUser.email)

      if (!user) {
        return NextResponse.json({ user: null })
      }

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatar_url,
        },
      })
    } catch (dbError) {
      console.error("[v0] Database error:", dbError)
      // Return user from JWT if database fails
      return NextResponse.json({
        user: {
          id: currentUser.userId,
          email: currentUser.email,
          name: currentUser.name,
        },
      })
    }
  } catch (error) {
    console.error("[v0] Get current user error:", error)
    return NextResponse.json({ user: null })
  }
}

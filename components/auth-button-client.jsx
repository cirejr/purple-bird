"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function AuthButtonClient(session) {
	const supabase = createClientComponentClient()
	const router = useRouter();

	const handleSignIn = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: 'http://localhost:3000/auth/callback'
			}
		})
	}

	const handleSignOut = async () => {
		await supabase.auth.signOut()
		router.refresh();
	}

	return session.session ? <Button onClick={handleSignOut}>Logout</Button> : <Button onClick={handleSignIn}>Login</Button>

}
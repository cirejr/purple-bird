"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { Github } from "lucide-react"

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

	return (
		<Button variant="secondary" onClick={handleSignIn}>
			<Github className="mr-2 h-4 w-4" /> Login with Github
		</Button>
	)

}
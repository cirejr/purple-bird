import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonClient from "./auth-button-client";

export default async function AuthButtonServer() {
	const supabase = createServerComponentClient({ cookies })
	const { data: { session: session } } = await supabase.auth.getSession()
	console.log("session in btnSrv:", session)
	return (
		<AuthButtonClient session={session} />
	)
}
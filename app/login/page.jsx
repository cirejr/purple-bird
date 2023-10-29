import AuthButtonClient from "@/components/auth-button-client";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {

	const supabase = createServerComponentClient({ cookies })
	const { data: { session: session } } = await supabase.auth.getSession();

	if (session) {
		redirect('/')
	}

	console.log("session in lp :", session)

	return (
		<AuthButtonClient session={session} />
	);
}
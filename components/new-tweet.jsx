import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function NewTweet() {

	const addTweet = async (formData) => {
		'use server'
		const title = formData.get("title")
		const supabase = createServerActionClient({ cookies })
		const { data: { user } } = await supabase.auth.getUser()
		if (user) {
			await supabase.from('tweets').insert({ title, user_id: user.id })
		}
	}

	return (
		<form action={addTweet}>
			<input type="text" name="title" className="border rounded-md p-2" />
		</form>
	);
}
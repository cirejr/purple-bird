import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers' 
import AuthButtonServer from '@/components/auth-button-server'
import { redirect } from 'next/navigation'
import NewTweet from '@/components/new-tweet'

export default async function Home() {
	
	const supabase = createServerComponentClient({ cookies })
	const { data : { session : session } } = await supabase.auth.getSession()
	const { data: tweets } = await supabase.from('tweets').select("*, profiles(*)")

	if(!session){
		redirect('/login')
	}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-800 text-gray-400">
		<AuthButtonServer />
		<NewTweet />
		<pre>{JSON.stringify(tweets, null, 2)}</pre>
    </main>
  )
}

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers' 
import AuthButtonServer from '@/components/auth-button-server'
import { redirect } from 'next/navigation'

export default async function Home() {
	
	const supabase = createServerComponentClient({ cookies })
	const { data : { session : session } } = await supabase.auth.getSession()
	const { data: tweets } = await supabase.from('tweets').select()

	if(!session){
		redirect('/login')
	}

	console.log("session in Home:", session)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
		<AuthButtonServer />
		<pre>{JSON.stringify(tweets, null, 2)}</pre>
    </main>
  )
}

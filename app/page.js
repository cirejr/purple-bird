import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers' 
import AuthButtonServer from '@/components/auth-button-server'
import { redirect } from 'next/navigation'
import NewTweet from '@/components/new-tweet'
import Likes from '@/components/likes'
import Tweets from '@/components/tweets'

export default async function Home() {
	
	const supabase = createServerComponentClient({ cookies })
	const { data : { session : session } } = await supabase.auth.getSession()
	const { data } = await supabase.from('tweets').select("*, author: profiles(*), likes(user_id)")

	const tweets = data.map( tweet => ({
		...tweet,
		user_has_liked_tweet: tweet.likes.find( like => like.user_id === session.user.id ),
		likes: tweet.likes.length,
	})) ?? []

	if(!session){
		redirect('/login')
	}

  return (
    <main className="flex min-h-screen flex-col items-center gap-3 p-24 text-gray-400">
		<AuthButtonServer />
		<NewTweet />
		<Tweets tweets={tweets} />
    </main>
  )
}

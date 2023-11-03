'use client'
import { startTransition, useEffect, useOptimistic } from 'react'
import Likes from "./likes";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';


export default function Tweets({ tweets }) {
	const router = useRouter()

	const [optimisticTweets, addOptimisticTweet] = useOptimistic(
		tweets,
		(currentOptimisticTweets, newTweet) => {
			const newOptimisticTweets = [...currentOptimisticTweets]
			const index = newOptimisticTweets.findIndex(tweet => tweet.id === newTweet.id)
			newOptimisticTweets[index] = newTweet

			return newOptimisticTweets
		}
	)

	const supabase = createClientComponentClient();

	useEffect(() => {
		const channel = supabase.channel('realtime tweets').on('postgres_changes', {
			event: "*",
			schema: "public",
			table: "tweets",
		}, (payload) => {
			console.log(payload)
 
		}).subscribe()

		return () => {
			supabase.removeChannel(channel);
			router.refresh()
		}
	}, [router, supabase])

	return optimisticTweets.map(tweet => (
		<div key={tweet.id}>
			<p>{tweet.author.name} @{tweet.author.username}</p>
			<p>{tweet.title}</p>
			<Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
		</div>
	))
}
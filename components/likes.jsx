"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export default function Likes({ tweet, addOptimisticTweet }) {
	const router = useRouter()
	const handleLikes = async () => {
		const supabase = createClientComponentClient()
		const { data: { user } } = await supabase.auth.getUser()
		if (user) {
			if (tweet.user_has_liked_tweet) {
				/* 	addOptimisticTweet({
						...tweet,
						likes: tweet.likes - 1,
						user_has_liked_tweet: !tweet.user_has_liked_tweet
					});
					console.log(`likes removed is ${tweet} & user_has : ${tweet.user_has_liked_tweet}`) */
				await supabase
					.from('likes')
					.delete()
					.match({ user_id: user.id, tweet_id: tweet.id })
				router.refresh()
			} else {
				/* addOptimisticTweet({
					...tweet,
					likes: tweet.likes + 1,
					user_has_liked_tweet: !tweet.user_has_liked_tweet
				});
				console.log(`likes added is ${tweet.likes} & user_has : ${tweet.user_has_liked_tweet}`) */
				await supabase
					.from('likes')
					.insert({ user_id: user.id, tweet_id: tweet.id })
				router.refresh()
			}
			router.refresh();
		}
	}
	return <Button onClick={handleLikes}>{tweet.likes} Likes</Button>
}
"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
	email: z.string().min(1, 'email must be at least 1 character.').email('email is invalid'),
	password: z
		.string()
		.min(1, 'pasword must be at least 1 characters.',)
		.min(8, 'password must be at least 8 characters'),
})

export default function LoginForm() {

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: ""
		},
	})

	function onSubmit(values) {
		console.log(values)
	}

	return (
		<Form {...form} className="container">
			<form onSubmit={form.handleSubmit(onSubmit)} className="">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="mb-3">
							<FormLabel className="text-xs">Email</FormLabel>
							<FormControl>
								<Input placeholder="Enter email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-xs">Password</FormLabel>
							<FormControl>
								<Input type="password" placeholder="Enter password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="mt-6 w-full bg-indigo-500 hover:bg-indigo-400 text-white" type="submit">Sign In</Button>
			</form>
		</Form>
	)
}
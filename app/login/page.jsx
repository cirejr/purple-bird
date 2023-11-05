
import AuthButtonServer from "@/components/auth-button-server";
import LoginForm from "@/components/login-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import logo from '@/public/twitter.svg'
import Image from "next/image";
import { Divider } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator";

export default async function Page() {

	const supabase = createServerComponentClient({ cookies })
	const { data: { session: session } } = await supabase.auth.getSession();

	if (session) {
		redirect('/')
	}

	console.log("session in lp :", session)

	return (
		<main className="md:flex gap-3 md:p-0 items-center min-h-screen">
			<div className="w-full md:w-2/5 flex bg-slate-900 min-h-screen justify-center items-center border-r-2 ">
				<div className="w-[384px] md:w-[530px] md:px-16 flex flex-col gap-2">
					<div className="mb-5">
						<p className="text-4xl">Welcome back</p>
						<p className="text-xs font-light">Sign in to your account</p>
					</div>
					<AuthButtonServer />
					<div className="flex items-center justify-center overflow-hidden mt-4">
						<Separator />
						<span class="px-2 text-sm bg-scale-200 text-foreground">or</span>
						<Separator />
					</div>
					<LoginForm />
				</div>
			</div>
			<div className="hidden md:w-3/5 md:flex md:flex-col container items-center">
				<p className=" text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-10% via-blue-500 via-30% to-purple-900 to-70%">Purple Bird </p>
				<Image
					src={logo}
					alt="purple bird"
					width={400}
					height={400}
				/>
			</div>
		</main>
	);
}
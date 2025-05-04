import Layout from "../layout";
import { Text, Button, Link } from "@react-email/components";

export default function VerifyEmail({
	link,
	address,
}: { link: string; address?: string }) {
	return (
		<Layout
			title="Verify your email for Quackatime"
			heading="Verify your email"
			address={address}
		>
			<Text className="text-[16px] leading-[24px] text-black m-0 mb-[24px] font-['Inter',Helvetica,Arial,sans-serif]">
				Hey there,
			</Text>
			<br />

			<Text className="text-[16px] leading-[24px] text-black m-0 mb-[24px] font-['Inter',Helvetica,Arial,sans-serif]">
				Welcome to Quackatime! To finish setting up your account, please click
				the button below to verify your email address.
			</Text>
			<br />

			<Link href={link}>
				<Button
					href={link}
					className="text-white bg-blue-500 hover:bg-blue-600 font-semibold rounded-[8px] py-[16px] px-[24px] text-center mb-[20px]"
				>
					Verify your email
				</Button>
			</Link>

			<Text className="text-[14px] leading-[20px] text-gray-600 m-0 mb-[32px] font-['Inter',Helvetica,Arial,sans-serif]">
				This link will expire in one hour. If you didn't request this email, you
				can safely ignore it.
			</Text>
			<br />

			<Text className="text-[16px] leading-[24px] text-black m-0 mb-[32px] font-['Inter',Helvetica,Arial,sans-serif]">
				Welcome aboard!
				<br />
				The Quackatime Team
			</Text>
		</Layout>
	);
}

VerifyEmail.PreviewProps = {
	link: "https://quackatime.com",
};

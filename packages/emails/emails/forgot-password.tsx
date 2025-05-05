import Layout from "../layout";
import { Text, Button, Link } from "@react-email/components";

export default function ForgotPassword({
	link,
	address,
}: { link: string; address?: string }) {
	return (
		<Layout
			title="Reset your OtterTime password"
			heading="Forgot your password?"
			address={address}
		>
			<Text className="text-[16px] leading-[24px] text-black m-0 mb-[24px] font-['Inter',Helvetica,Arial,sans-serif]">
				Someone (probably you) requested a password reset for your OtterTime
				account.
			</Text>
			<br />

			<Text className="text-[16px] leading-[24px] text-black m-0 mb-[24px] font-['Inter',Helvetica,Arial,sans-serif]">
				To reset your password, please click the button below.
			</Text>
			<br />

			<Link href={link}>
				<Button
					href={link}
					className="text-white bg-blue-500 hover:bg-blue-600 font-semibold rounded-[8px] py-[16px] px-[24px] text-center mb-[20px]"
				>
					Reset password
				</Button>
			</Link>

			<Text className="text-[14px] leading-[20px] text-gray-600 m-0 mb-[32px] font-['Inter',Helvetica,Arial,sans-serif]">
				This link will expire in one hour. If you didn't request this email, you
				can safely ignore it.
			</Text>
			<br />

			<Text className="text-[16px] leading-[24px] text-black m-0 mb-[32px] font-['Inter',Helvetica,Arial,sans-serif]">
				All the best,
				<br />
				The OtterTime Team
			</Text>
		</Layout>
	);
}

ForgotPassword.PreviewProps = {
	link: "https://ottertime.com",
};

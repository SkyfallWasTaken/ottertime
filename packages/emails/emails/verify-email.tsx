import Layout from "../layout"
import {
    Section,
    Text,
} from '@react-email/components';


export default function VerifyEmail({ code }: { code: string }) {
    return (
        <Layout title="Verify your email for Quackatime" heading="Verify your email">
            <Text className="text-[16px] leading-[24px] text-black m-0 mb-[24px] font-['Inter',Helvetica,Arial,sans-serif]">
                Hey there,
            </Text>
            <br />

            <Text className="text-[16px] leading-[24px] text-black m-0 mb-[24px] font-['Inter',Helvetica,Arial,sans-serif]">
                Welcome to Quackatime! To finish setting up your account, please
                enter the verification code below:
            </Text>
            <br />

            <Section className="bg-[#f9f0f0] rounded-[8px] py-[16px] px-[24px] text-center mb-[32px]">
                <Text className="text-2xl font-bold text-black m-0 font-['Inter',Helvetica,Arial,sans-serif]">
                    {code}
                </Text>
            </Section>

            <Text className="text-[14px] leading-[20px] text-gray-600 m-0 mb-[32px] font-['Inter',Helvetica,Arial,sans-serif]">
                This code will expire in 10 minutes. If you didn't request this email, you can safely ignore it.
            </Text>
            <br />

            <Text className="text-[16px] leading-[24px] text-black m-0 mb-[32px] font-['Inter',Helvetica,Arial,sans-serif]">
                Welcome aboard!
                <br />
                The Quackatime Team
            </Text>
        </Layout>
    )
}

VerifyEmail.PreviewProps = {
    code: "000000",
};

import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Section,
	Text,
	Tailwind,
	Hr,
	Img,
	Font,
} from "@react-email/components";

const LOGO_URL = "https://skyfall.dev/_astro/logo.BZI6fuo4_1AndRm.webp";

const Layout = ({
	title,
	heading,
	children,
	address,
}: {
	title: string;
	heading: string | undefined;
	address: string | undefined;
	children: React.ReactNode;
}) => {
	return (
		<Html>
			<Tailwind>
				<Head>
					<title>{title}</title>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<Font
						fontFamily="Inter"
						fallbackFontFamily="Helvetica"
						webFont={{
							url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2",
							format: "woff2",
						}}
						fontWeight={400}
						fontStyle="normal"
					/>
					<Font
						fontFamily="Inter"
						fallbackFontFamily="Helvetica"
						webFont={{
							url: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2",
							format: "woff2",
						}}
						fontWeight={700}
						fontStyle="normal"
					/>
				</Head>
				<Body className="bg-[#f8f8f8] font-['Inter',Helvetica,Arial,sans-serif] py-[40px]">
					<Container className="bg-white rounded-[16px] border border-solid border-[#e5d5d5] shadow-sm mx-auto my-0 p-[32px] max-w-[600px]">
						<Section className="mb-[32px]">
							<Img
								src={LOGO_URL}
								alt="Quackatime logo"
								width="78"
								height="78"
								className="rounded-[12px] w-[78px] h-[78px] object-cover"
							/>
						</Section>

						{heading && (
							<Heading className="text-[24px] font-semibold text-black m-0 mb-[12px] font-['Inter',Helvetica,Arial,sans-serif]">
								{heading}
							</Heading>
						)}

						{children}

						<Hr className="border border-gray-200 my-[32px]" />

						<Text className="text-[12px] leading-[16px] text-gray-500 mx-0 mt-0 mb-[8px] font-['Inter',Helvetica,Arial,sans-serif]">
							If you have any questions, please contact us at{" "}
							<Link
								href="mailto:hi@skyfall.dev"
								className="text-purple-600 underline"
							>
								hi@skyfall.dev
							</Link>
						</Text>

						<Text className="text-[12px] leading-[16px] text-gray-500 m-0 font-['Inter',Helvetica,Arial,sans-serif]">
							© {new Date().getFullYear()} Quackatime. All rights reserved.
						</Text>

						{address && (
							<Text className="text-[12px] leading-[16px] text-gray-500 m-0 font-['Inter',Helvetica,Arial,sans-serif]">
								{address}
							</Text>
						)}
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default Layout;

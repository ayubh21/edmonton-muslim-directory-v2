import {
	Body,
	Button,
	Container,
	Head,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";

interface ListingRejectedProps {
	userFirstname: string | undefined;
	listingTitle: string;
	rejectionReason?: string;
	guidelinesUrl?: string;
	supportUrl?: string;
}

export const SendListingRejected = ({
	userFirstname,
	listingTitle,
	rejectionReason,
	guidelinesUrl,
	supportUrl
}: ListingRejectedProps) => {
	return (
		<Html>
			<Head />
			<Body style={main}>
				<Preview>Your listing needs attention - Yeg Muslim Connect</Preview>
				<Container style={container}>
					{/* Header with colored accent */}
					<Section style={header}>
						<Text style={headerText}>Listing Review Update</Text>
					</Section>

					<Section style={content}>
						<Text style={greeting}>Hi {userFirstname},</Text>

						<Text style={text}>
							Assalamu Alaykum! Thank you for submitting {listingTitle} to our Business Directory.
						</Text>

						{/* Notice box */}
						<Section style={noticeBox}>
							<Text style={noticeTitle}>Action Required</Text>
							<Text style={noticeText}>
								Unfortunately, {"we're"} unable to approve your listing at this time as it {"doesn't"} meet our current guidelines.
							</Text>
						</Section>

						{rejectionReason && (
							<>
								<Text style={sectionTitle}>What needs to be addressed:</Text>
								<Text style={reasonText}>{rejectionReason}</Text>
							</>
						)}

						<Text style={text}>
							{"Don't"} worry - this is common and easily {"fixable!"} We're here to help you get your business listed successfully.
						</Text>

						{/* Action buttons */}
						<Section style={buttonContainer}>
							{guidelinesUrl && (
								<Button style={primaryButton} href={guidelinesUrl}>
									View Guidelines
								</Button>
							)}
							{supportUrl && (
								<Button style={secondaryButton} href={supportUrl}>
									Get Help
								</Button>
							)}
						</Section>

						<Text style={text}>
							Once {"you've"} made the necessary updates, feel free to resubmit your {"listing."} {"We're"} excited to welcome your business to our growing community of local Muslim businesses in Edmonton.
						</Text>

						<Text style={text}>
							May Allah make this process easy for you, and bless your business endeavors.
						</Text>

						<Text style={signature}>
							Barakallahu feek,<br />
							The YEG Muslim Connect Team
						</Text>
					</Section>
					{/* Footer */}
					<Section style={footer}>
						<Text style={footerText}>
							Need immediate assistance? Reply to this email and we'll get back to you within 24 hours.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

export default SendListingRejected;

const main = {
	backgroundColor: "#f8fafc",
	padding: "20px 0",
	fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
};

const container = {
	backgroundColor: "#ffffff",
	border: "1px solid #e2e8f0",
	borderRadius: "12px",
	padding: "0",
	margin: "0 auto",
	maxWidth: "600px",
	boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
};

const header = {
	backgroundColor: "#f97316",
	background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
	padding: "24px 40px",
	borderRadius: "12px 12px 0 0",
};

const headerText = {
	fontSize: "20px",
	fontWeight: "600",
	color: "#ffffff",
	margin: "0",
	textAlign: "center" as const,
};

const content = {
	padding: "40px",
};

const greeting = {
	fontSize: "18px",
	fontWeight: "500",
	color: "#1f2937",
	margin: "0 0 20px 0",
	lineHeight: "28px",
};

const text = {
	fontSize: "16px",
	fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
	fontWeight: "400",
	color: "#4b5563",
	lineHeight: "26px",
	margin: "16px 0",
};

const noticeBox = {
	backgroundColor: "#fef3c7",
	border: "1px solid #fbbf24",
	borderRadius: "8px",
	padding: "20px",
	margin: "24px 0",
};

const noticeTitle = {
	fontSize: "16px",
	fontWeight: "600",
	color: "#92400e",
	margin: "0 0 8px 0",
};

const noticeText = {
	fontSize: "15px",
	color: "#b45309",
	margin: "0",
	lineHeight: "22px",
};

const sectionTitle = {
	fontSize: "16px",
	fontWeight: "600",
	color: "#1f2937",
	margin: "24px 0 12px 0",
};

const reasonText = {
	fontSize: "15px",
	color: "#dc2626",
	backgroundColor: "#fef2f2",
	border: "1px solid #fecaca",
	borderRadius: "6px",
	padding: "16px",
	margin: "8px 0 20px 0",
	lineHeight: "22px",
};

const buttonContainer = {
	textAlign: "center" as const,
	margin: "32px 0",
	display: "flex",
	gap: "12px",
	justifyContent: "center",
	flexWrap: "wrap" as const,
};

const primaryButton = {
	backgroundColor: "#3b82f6",
	borderRadius: "8px",
	color: "#ffffff",
	fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
	fontSize: "15px",
	fontWeight: "500",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "inline-block",
	padding: "14px 28px",
	border: "none",
	cursor: "pointer",
	transition: "background-color 0.2s",
};

const secondaryButton = {
	backgroundColor: "#ffffff",
	borderRadius: "8px",
	color: "#3b82f6",
	fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
	fontSize: "15px",
	fontWeight: "500",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "inline-block",
	padding: "14px 28px",
	border: "2px solid #3b82f6",
	cursor: "pointer",
	transition: "all 0.2s",
};

const signature = {
	fontSize: "16px",
	color: "#4b5563",
	margin: "32px 0 0 0",
	lineHeight: "26px",
};

const footer = {
	backgroundColor: "#f8fafc",
	padding: "24px 40px",
	borderRadius: "0 0 12px 12px",
	borderTop: "1px solid #e2e8f0",
};

const footerText = {
	fontSize: "14px",

}



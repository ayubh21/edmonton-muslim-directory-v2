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

interface ListingApprovedProps {
	userFirstname: string | undefined;
	listingTitle: string;
	listingUrl?: string;
}

export const SendListingApproved = ({ userFirstname, listingTitle, listingUrl }: ListingApprovedProps) => {

	return (
		<Html>
			<Head />
			<Body style={main}>
				<Preview>Your listing has been approved - Yeg Muslim Connect</Preview>
				<Container style={container}>
					<Section>
						<Text style={text}>Hi {userFirstname},</Text>
						<Text style={text}>
							Assalamu Alaykum! Great news - {listingTitle} has been approved and is now live on our Business Directory.
						</Text>
						<Text style={text}>
							Your business is now part of our growing community of local Muslim businesses in Edmonton, connecting you with customers who share your values. May Allah bless your business endeavors.
						</Text>
						{listingUrl && (
							<Section style={buttonContainer}>
								<Button style={button} href={listingUrl}>
									View Your Listing
								</Button>
							</Section>
						)}
						<Text style={text}>
							If you have any questions or need to make updates to your listing, please don't hesitate to reach out to us.
						</Text>
						<Text style={text}>
							Barakallahu feeki,<br />
							The Yeg Muslim Connect Team
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};


export default SendListingApproved;

const main = {
	backgroundColor: "#f6f9fc",
	padding: "10px 0",
};

const container = {
	backgroundColor: "#ffffff",
	border: "1px solid #f0f0f0",
	padding: "45px",
};

const text = {
	fontSize: "16px",
	fontFamily:
		"'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
	fontWeight: "300",
	color: "#404040",
	lineHeight: "26px",
};

const button = {
	backgroundColor: "#000000",
	borderRadius: "4px",
	color: "#fff",
	fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
	fontSize: "15px",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
	width: "210px",
	padding: "14px 7px",
};

const buttonContainer = {
	textAlign: "center" as const,
	margin: "32px 0",
};

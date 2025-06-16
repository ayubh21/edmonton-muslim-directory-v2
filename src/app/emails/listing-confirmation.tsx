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

interface ListingConfirmationProps {
	userFirstname: string;
}


export const SendListingConfirmation = ({ userFirstname }: ListingConfirmationProps) => {
	return (
		<Html>
			<Head />
			<Body style={main}>
				<Preview>YEG Muslim Connect</Preview>
				<Container style={container}>
					<Section>
						<Text style={text}>Hi ,</Text>
						<Text style={text}>
							Assalamu Alaykum, {userFirstname}, Thank for u submitting a listing on our very own Business Directory where by the will of Allah will be used
							to connect local muslim business in Edmonton. We will get back to you shortly once our admin team has reviewed it.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};


export default SendListingConfirmation;

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


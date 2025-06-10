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

interface BakeryContactProps {
	userFirstName: string;
	email: string;
	phone: string;
	subject?: string;
	message: string;
}

export const SendListingContactEmail = ({
	userFirstName,
	subject,
	email,
	phone,
	message
}: BakeryContactProps) => {
	return (
		<Html>
			<Head />
			<Body style={main}>
				<Preview>New contact form submission from {userFirstName}</Preview>
				<Container style={container}>
					<Section>
						<Text style={heading}>New Contact Form Submission</Text>

						<Text style={text}>
							You have received a new message through your bakery contact form.
						</Text>

						<Section style={infoSection}>
							<Text style={label}>Customer Name:</Text>
							<Text style={value}>{userFirstName}</Text>

							<Text style={label}>Email:</Text>
							<Text style={value}>{email}</Text>

							{phone && (
								<>
									<Text style={label}>Phone:</Text>
									<Text style={value}>{phone}</Text>
								</>
							)}

							{subject && (
								<>
									<Text style={label}>Subject:</Text>
									<Text style={value}>{subject}</Text>
								</>
							)}

							<Text style={label}>Message:</Text>
							<Text style={messageText}>{message}</Text>
						</Section>

						<Section style={buttonContainer}>
							<Button style={button} href={`mailto:${email}`}>
								Reply to Customer
							</Button>
						</Section>

						<Text style={footer}>
							This message was sent through your bakery contact form. Please respond promptly to maintain excellent customer service.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};


// Styles
const main = {
	backgroundColor: "#f6f9fc",
	padding: "10px 0",
};

const container = {
	backgroundColor: "#ffffff",
	border: "1px solid #f0f0f0",
	padding: "45px",
	maxWidth: "600px",
	margin: "0 auto",
};

const heading = {
	fontSize: "24px",
	fontFamily:
		"'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
	fontWeight: "600",
	color: "#2c5530", // Bakery green color
	lineHeight: "32px",
	marginBottom: "24px",
};

const text = {
	fontSize: "16px",
	fontFamily:
		"'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
	fontWeight: "300",
	color: "#404040",
	lineHeight: "26px",
};

const infoSection = {
	backgroundColor: "#f8f9fa",
	padding: "20px",
	borderRadius: "6px",
	margin: "24px 0",
};

const label = {
	fontSize: "14px",
	fontFamily:
		"'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
	fontWeight: "600",
	color: "#666666",
	marginBottom: "4px",
	marginTop: "16px",
};

const value = {
	fontSize: "16px",
	fontFamily:
		"'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
	fontWeight: "400",
	color: "#333333",
	marginTop: "0px",
	marginBottom: "8px",
};

const messageText = {
	fontSize: "16px",
	fontFamily:
		"'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
	fontWeight: "400",
	color: "#333333",
	lineHeight: "24px",
	backgroundColor: "#ffffff",
	padding: "12px",
	borderRadius: "4px",
	border: "1px solid #e0e0e0",
	marginTop: "8px",
	whiteSpace: "pre-wrap" as const,
};

const button = {
	backgroundColor: "#2c5530", // Matching the bakery green
	borderRadius: "6px",
	color: "#fff",
	fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
	fontSize: "15px",
	fontWeight: "600",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
	width: "200px",
	padding: "14px 7px",
};

const buttonContainer = {
	textAlign: "center" as const,
	margin: "32px 0",
};

const footer = {
	fontSize: "14px",
	fontFamily:
		"'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
	fontWeight: "300",
	color: "#666666",
	lineHeight: "22px",
	marginTop: "24px",
	fontStyle: "italic",
};

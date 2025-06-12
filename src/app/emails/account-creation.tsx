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

interface AccountCreationProps {
	userFirstname?: string;
	loginUrl?: string;
	companyName?: string;
}

export const SendAccountCreation = ({ 
	userFirstname, 
	loginUrl = "#", 
	companyName = "Yeg Muslim Connect"
}: AccountCreationProps) => {
	return (
		<Html>
			<Head />
			<Body style={main}>
				<Preview>Welcome! Your account has been successfully created</Preview>
				<Container style={container}>
					<Section style={logoSection}>
						<Text style={logo}>{companyName}</Text>
					</Section>
                    <hr className="mt-4"/>	
					<Section style={contentSection}>
						<Text style={greeting}>
							Dear {userFirstname || "Customer"},
						</Text>
						
						<Text style={text}>
							Welcome to {companyName}!
						</Text>
						
						<Text style={text}>
							Your account has been successfully created. You can now log in to access all our features and services.
						</Text>
						
						<Section style={buttonContainer}>
							<Button style={button} href={loginUrl}>
								Log In to Your Account
							</Button>
						</Section>
						
						
						<Text style={text}>
							Please do not reply to this email. 
						</Text>
						
						<Text style={signature}>
							Many thanks,<br />
							{companyName} Team
						</Text>
					</Section>
					
					<Section style={footerSection}>
						<Text style={footerText}>
							<Link href="https://yegmuslimconnect.ca" style={footerLink}>
								Visit Our Website
							</Link>
							{" • "}
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

export default SendAccountCreation;

const main = {
	backgroundColor: "#f6f9fc",
	fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
	backgroundColor: "#ffffff",
	border: "1px solid #eaeaea",
	borderRadius: "8px",
	margin: "40px auto",
	maxWidth: "600px",
	padding: "0",
};

const logoSection = {
	backgroundColor: "#ffffff",
	padding: "32px 40px 0",
	textAlign: "center" as const,
};

const logo = {
	fontSize: "24px",
	fontWeight: "semibold",
	color: "#333333",
	margin: "0 0 32px 0",
	textAlign: "center" as const,
};

const contentSection = {
	padding: "0 40px 40px",
};

const greeting = {
	fontSize: "16px",
	fontWeight: "400",
	color: "#333333",
	lineHeight: "24px",
	margin: "0 0 16px 0",
};

const text = {
	fontSize: "16px",
	fontWeight: "400",
	color: "#333333",
	lineHeight: "24px",
	margin: "0 0 16px 0",
};

const button = {
	backgroundColor: "#000000",
	borderRadius: "6px",
	color: "#ffffff",
	fontSize: "16px",
	fontWeight: "600",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
	padding: "12px 24px",
	minWidth: "200px",
};

const buttonContainer = {
	textAlign: "center" as const,
	margin: "32px 0",
};

const link = {
	color: "#007ee6",
	textDecoration: "underline",
};

const signature = {
	fontSize: "16px",
	fontWeight: "400",
	color: "#333333",
	lineHeight: "24px",
	margin: "32px 0 0 0",
};

const footerSection = {
	backgroundColor: "#f8f9fa",
	padding: "24px 40px",
	borderTop: "1px solid #eaeaea",
	borderBottomLeftRadius: "8px",
	borderBottomRightRadius: "8px",
};

const footerText = {
	fontSize: "14px",
	color: "#666666",
	textAlign: "center" as const,
	margin: "0",
};

const footerLink = {
	color: "#666666",
	textDecoration: "underline",
};
import { Box, BoxProps } from '@chakra-ui/react';
import UnderlinedText from './UnderlinedText';

interface PageTitleProps extends BoxProps {
	emoji: any;
	children: React.ReactNode;
};

const PageTitle = ({
	children,
	emoji,
	...props
}: PageTitleProps) => (
	<Box
		as="h1"
		mt={10}
		mb={6}
		fontSize="3xl"
		lineHeight="shorter"
		fontWeight="bold"
		{...props}
		textAlign="left"
	>
		{emoji ? ' ' + emoji : ''} &nbsp;
		<UnderlinedText>{children}</UnderlinedText>
	</Box>
);

export default PageTitle;

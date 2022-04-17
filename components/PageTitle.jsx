import { Box } from '@chakra-ui/react';
import UnderlinedText from './UnderlinedText';

const PageTitle = ({
	children,
	underlineColor,
	emoji,
	...props
}) => (
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
		<UnderlinedText color="#06b6d4">{children}</UnderlinedText>
	</Box>
);

export default PageTitle;

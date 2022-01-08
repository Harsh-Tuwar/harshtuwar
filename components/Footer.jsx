import React from 'react';
import {
	Stack,
	IconButton,
	Link,
	Box,
	Text,
	useColorModeValue,
	Flex
} from "@chakra-ui/react";
import { SiteConfig } from '../constant';

const iconProps = {
	variant: "ghost",
	size: "lg",
	isRound: true
};

const Footer = () => {
	const grayShade = useColorModeValue("gray.500", "gray.200");

	return (
		<Stack
			as="footer"
			isInline
			spacing={[1, 2]}
			p={4}
			justifyContent="space-between"
			alignItems="center"
			w={["100%", "90%", "90%"]}
			maxW="container.lg"
			mx="auto"
		>
			<Flex
				flexDirection={["column", "column", "row"]}
				flexFlow={["column-reverse", "column-reverse"]}
				justifyContent={["center", "space-between"]}
				alignItems="center"
				w="100%"
			>
				<Text
					textAlign="center"
					fontSize="sm"
					color={grayShade}
				>
					© {new Date().getFullYear()} Harsh Tuwar {" "}
				</Text>

				<Box textAlign="center">
					{SiteConfig.author.accounts.map((item, index) => (
						<IconButton
							key={index}
							as={Link}
							isExternal
							href={item.url}
							aria-label={item.label}
							size="lg"
							colorScheme={item.type}
							icon={item.icon}
							{...iconProps}
						/>
					))}
				</Box>
			</Flex>
		</Stack>
	);
}

export default Footer;


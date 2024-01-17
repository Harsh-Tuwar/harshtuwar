'use client';
import {
	Box,
	Flex,
	IconButton,
	Link,
	Stack,
	Text,
	useColorModeValue
} from '@chakra-ui/react';

import { SiGmail } from 'react-icons/si';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import { SiteConfig } from '@/constants';

const IconHashmap: {
	[key: string]: JSX.Element
} = {
	'github': <FaGithub />,
	'linkedin': <FaLinkedin />,
	'gmail': <SiGmail />
};

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
							aria-label={item.name}
							colorScheme={item.type}
							icon={IconHashmap[item.id]}
							{...iconProps}
						/>
					))}
				</Box>
			</Flex>
		</Stack>
	);
}

export default Footer;

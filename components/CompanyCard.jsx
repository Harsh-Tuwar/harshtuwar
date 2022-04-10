import React from 'react';
import {
	Flex,
	Image,
	Stack,
	Heading,
	Text,
	Tag,
	useColorModeValue,
	LinkBox,
	LinkOverlay
} from '@chakra-ui/react';

const CompanyCard = ({ title, role, skills, period, logo, alt, url, colorMode }) => {
	const whiteToGrayShade = useColorModeValue("white", "gray.800");
	const grayToDarkGrayShade = useColorModeValue("gray.100", "gray.700");

	return (
		<LinkBox
			px={4}
			py={5}
			borderWidth="1px"
			rounded="xl"
			bg={whiteToGrayShade}
			borderColor={grayToDarkGrayShade}
			_hover={{ borderColor: "green.500" }}
			position="relative"
		>
			<LinkOverlay href={url} rel="noopener" isExternal>
				<Flex justifyContent="space-between">
					<Flex>
						<Image rounded="full" w={16} h={16} objectFit="cover" src={logo} alt={alt} />

						<Stack spacing={2} pl={3} align="left">
							<Heading align="left" fontSize="xl" color={`mode.${colorMode}.careet.text`} >
								{title}
							</Heading>

							<Heading
								align="left"
								fontSize="sm"
								color={`mode.${colorMode}.career.subtext`}
							>
								{role}
							</Heading>
							<Stack
								spacing={1}
								mt={3}
								alignItems="center"
								isInline
								display={["none", "none", "flex", "flex"]}
							>
								{skills.map(skill => (
									<Tag size="sm" padding="0 5px" key={skill}>
										{skill}
									</Tag>
								))}
							</Stack>
						</Stack>
					</Flex>
					<Stack display={["none", "none", "flex", "flex"]}>
						<Text fontSize={14} color={`mode.${colorMode}.career.subtext`}>
							{period}
						</Text>
					</Stack>
				</Flex>
				<Stack
					spacing={1}
					mt={3}
					alignItems="center"
					display={["flex", "flex", "none", "none"]}
				>
					{skills.map(skill => (
						<Tag size="sm" padding="0 5px" key={skill}>
							{skill}
						</Tag>
					))}
				</Stack>
			</LinkOverlay>
		</LinkBox>
	);
}

export default CompanyCard;

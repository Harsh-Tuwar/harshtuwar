import React from 'react';
import {
	HStack,
	Flex,
	Image,
	Stack,
	Heading,
	Text,
	Tag,
	useColorModeValue,
	LinkBox,
	LinkOverlay,
	TagLabel,
	VStack,
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
					<HStack>
						<Image rounded="full" w={16} h={16} objectFit="scale-down" src={logo} alt={alt} />
						<VStack spacing={2} pl={3} align="left">
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
							<HStack
								flexWrap="wrap"
								display={["none", "none", "flex", "flex"]}
							>
								{skills.map(skill => {
									return <Tag size="md" key={skill} m={2} borderRadius='full' variant='solid' >
										<TagLabel>{skill}</TagLabel>
									</Tag>;
								})}
							</HStack>
							<Stack display={["flex", "flex", "none", "none"]}>
								<Text fontSize={14} color={`mode.${colorMode}.career.subtext`}>
									{period}
								</Text>
							</Stack>
						</VStack>
					</HStack>
					<Stack display={["none", "none", "flex", "flex"]} alignItems="flex-end" width="180px">
						<Text fontSize={14} color={`mode.${colorMode}.career.subtext`}>
							{period}
						</Text>
					</Stack>
				</Flex>
				<HStack
					flexWrap="wrap"
					display={["flex", "flex", "none", "none"]}
				>
					{skills.map(skill => {
						return <Tag size="md" key={skill} m={2} borderRadius='full' variant='solid' >
							<TagLabel>{skill}</TagLabel>
						</Tag>;
					})}
				</HStack>
			</LinkOverlay>
		</LinkBox>
	);
}

export default CompanyCard;

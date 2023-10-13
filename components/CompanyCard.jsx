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
				<Flex  display={["none", "none", "flex", "flex"]} >
					<HStack display={'flex'} flexGrow={1} className='main-parent__container-desktop' width={'100%'}>
						<Image rounded="full" w={16} h={16} objectFit="scale-down" src={logo} alt={alt} />
						<HStack className='main-container__desktop'  width={'inherit'}>
							<VStack spacing={2} pl={3} align="left" display={"flex"} flexGrow={1} className='sub-container__desktop'>
								<HStack display={'flex'} className='title-role-period__desktop'>
									<VStack flexGrow={1} alignItems={'flex-start'}>
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
									</VStack>
									<Stack display={["none", "flex", "flex", "flex"]} alignItems="flex-end" width="200px" height={'50px'}>
										<Text fontSize={14} color={`mode.${colorMode}.career.subtext`}>
											{period}
										</Text>
									</Stack>
								</HStack>
								<HStack
									flexWrap="wrap"
									className="skills__desktop"
									display={["none", "none", "flex", "flex"]}
								>
									{skills.map(skill => {
										return <Tag size="md" key={skill} m={2} borderRadius='full' variant='solid' >
											<TagLabel>{skill}</TagLabel>
										</Tag>;
									})}
								</HStack>
							</VStack>
						</HStack>
					</HStack>
				</Flex>
				<Flex justifyContent="space-between" display={["flex", "flex", "none", "none"]}>
					<HStack >
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

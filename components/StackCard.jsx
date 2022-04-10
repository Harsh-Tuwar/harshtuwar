import React from 'react';
import { LinkBox, IconButton, LinkOverlay, Text, useColorModeValue, Flex } from '@chakra-ui/react';
import { MotionBox } from '../utils/motion';

const StackCard = ({ stack }) => {
	const greyShade = useColorModeValue("gray.300", "gray.700");

	return (
		<MotionBox whileHover={{ y: -5 }}>
			<LinkBox
				as="article"
				w="100%"
				p={4}
				borderColor={greyShade}
				borderRadius={5}
				borderWidth="1px"
				transition=".5s"
				cursor="pointer"
				display="flex"
				role="group"
				_hover={{
					borderColor: "green.500"
				}}
			>
				<Flex alignItems="center" justifyContent="space-between">
					<IconButton as="a" aria-label={stack?.name} mr={3} _groupHover={{ color: "green.500" }} icon={stack?.icon} />
					<LinkOverlay href={stack?.url} rel="noopener" isExternal>
						<Flex>
							<Text size="sm" _hover={{ color: "green.500" }}>{stack?.name}</Text>
						</Flex>
					</LinkOverlay>
				</Flex>
			</LinkBox>
		</MotionBox>
	);
}

export default StackCard;

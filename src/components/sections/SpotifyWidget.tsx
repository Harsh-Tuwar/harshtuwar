'use client';
import { SiSpotify } from 'react-icons/si';
import {
	LinkBox,
	LinkOverlay,
	Flex,
	Image,
	Text,
	Heading,
	VStack,
	useColorModeValue,
	HStack
} from '@chakra-ui/react';

import Paragraph from '../Paragraph';
import { MotionBox } from '@/utils/motion';

interface SpotifySong {
	album: string;
	albumImageUrl: string;
	artist: string;
	isPlaying: true;
	songUrl: string;
	title: string;
};

interface SpotifyWidgetProps {
	song: SpotifySong;
}

const SpotifyWidget = ({ song }: SpotifyWidgetProps) => {
	const grayShade = useColorModeValue("gray.300", "gray.700");

	return (
		<MotionBox whileHover={{ y: -5 }} mt={5}>
			<LinkBox
				p={4}
				display={{ md: "flex" }}
				borderWidth={1}
				margin={2}
				rounded="10px"
				_hover={{
					borderColor: "green.500"
				}}
				borderColor={grayShade}
				// @ts-ignore
				href={song?.isPlaying ? song?.songUrl : null}
			>
				<LinkOverlay href={(song?.isPlaying && song?.songUrl) ? song?.songUrl : '#'} rel="noopener" isExternal>
					<VStack>
						<HStack alignSelf={{ base: "center", md: "flex-start" }} mb={5}>
							<SiSpotify size={20} color="#1ED760" className="rotating" />
							<Text>{song?.isPlaying ? "Currently Listening On" : "Spotify"}</Text>
						</HStack>
					</VStack>

					<Flex alignItems="center" justifyContent="space-around" direction={["column", "column", "row", "row"]}>
						{song?.isPlaying ?
							<Image
								margin="auto"
								src={song?.albumImageUrl}
								alt={song?.album}
								objectFit="cover"
								boxSize={["100px", "100px", "100px", "100px"]}
								fallback={<SiSpotify size={20} color="#1ED760" />}
							/>
							: <SiSpotify size={100} color="#1ED760" />
						}

						<Flex flexDirection="column" ml={[0, 0, 5, 5]} mt={[5, 5, 0, 0]}>
							<Heading as="h2" fontSize="lg" fontWeight="600" color="green.400" alignSelf={["center", "flex-start"]}>
								{song?.isPlaying ? song?.title : "Not Listening"}
							</Heading>

							<Paragraph mt="10px" alignSelf={["center", "center", "flex-start", "flex-start"]}>
								<span>{song?.isPlaying ? song?.artist : "Spotify"}</span>
							</Paragraph>
						</Flex>
					</Flex>
				</LinkOverlay>
			</LinkBox>
		</MotionBox>
	);
}

export default SpotifyWidget;

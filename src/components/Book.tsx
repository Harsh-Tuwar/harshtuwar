'use client';
import Image from "next/image";

import {
	HStack,
	Heading,
	Text,
	Box,
	VStack,
	LinkOverlay,
	LinkBox,
	useColorModeValue as mode
} from "@chakra-ui/react";

import BookTag from './BookTag';

interface BookProps {
	book: {
		cover: string;
		title: string;
		author: string;
		state: string;
		link?: string;
		id: string;
	}
};

const Book = ({ book: { cover, title, author, state, link } }: BookProps) => {
	return (
		<LinkBox as="article" maxWidth={'430px'}>
			<HStack
				p={4}
				bg={mode("gray.50", "gray.700")}
				_hover={{ transform: "scale(1.05, 1.05)" }}
				rounded="md"
				spacing={6}
				transitionDuration="slow"
				transitionProperty="transform"
				transitionTimingFunction="ease-out"
			>
				<Box position="relative" flexShrink={0}>
					<Image
						src={cover}
						alt={`${title} cover`}
						height={83}
						width={55}
						objectFit="cover"
					/>
					<BookTag
						state={state}
						// @ts-ignore
						top={-2.5}
						right={-2.5}
						position="absolute"
					/>
				</Box>
				<VStack
					alignItems="flex-start"
					justifyContent="center"
					h="full"
					spacing={2}
				>
					<LinkOverlay href={link} isExternal>
						<Heading size="xs">{title}</Heading>
					</LinkOverlay>
					<Text color={mode("gray.600", "gray.400")} fontSize="xs">
						By {author}
					</Text>
				</VStack>
			</HStack>
		</LinkBox>
	);
};

export default Book;


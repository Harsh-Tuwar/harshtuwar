'use client';
import {
	Avatar,
	Box,
	Flex,
	HStack,
	IconButton,
	Link as CharkaLink,
	Stack,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

import NavItems from './NavItems';
import ColorModeSwitcher from './ColorModeSwitcher';

const Navbar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const whiteToGrayShade = useColorModeValue('white', 'gray.700');
	let pathname = usePathname();

	return (
		<>
			<Box bg={whiteToGrayShade} px={4} boxShadow="lg" borderTop="2px" borderTopColor="green.500">
				<Flex
					h={16}
					alignItems="center"
					justifyContent="space-between"
					w={["95%", "95%", "95%"]}
					maxW="container.lg"
					mx="auto"
				>
					<IconButton
						size="md"
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label="Open Menu"
						display={["inherit", "inherit", "none"]}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems="center">
						<NextLink
							href="/"
							passHref
						>
							<Avatar
								as={CharkaLink}
								size="sm"
								src="/profile_picture.jpeg"
								_hover={{ borderColor: "green.500" }}
							/>
						</NextLink>
						<HStack as="nav" spacing="4" display={{ base: 'none', md: 'flex' }}>
							<NavItems isOpen={isOpen} onClose={onClose} onOpen={onOpen} pathname={pathname} />
						</HStack>
					</HStack>
					<Flex alignItems="center">
						<ColorModeSwitcher justifySelf="flex-end" />
					</Flex>
				</Flex>

				{isOpen && (
					<Box
						pb={4}
						w={["100%", "100%", "80%"]}
						maxW="container.lg"
						display={["inherit", "inherit", "none"]}
					>
						<Stack as="nav" spacing={4}>
							<NavItems isOpen={isOpen} onClose={onClose} onOpen={onOpen} pathname={pathname} />
						</Stack>
					</Box>
				)}
			</Box>
		</>
	);
}

export default Navbar;

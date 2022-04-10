import React from 'react';
import {
    Flex,
    IconButton,
    HStack,
    Box,
    Stack,
    Link as CharkaLink,
    useColorModeValue,
    Avatar
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { useDisclosure } from '@chakra-ui/hooks';
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavbarItems } from '../constant';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const whiteToGrayShade = useColorModeValue('white', 'gray.700');
    let { asPath } = useRouter();

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
                            <NavItems isOpen={isOpen} onClose={onClose} onOpen={onOpen} asPath={asPath} />
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
                            <NavItems isOpen={isOpen} onClose={onClose} onOpen={onOpen} asPath={asPath} />
                        </Stack>
                    </Box>
                )}
            </Box>
        </>
    );
}

const NavItems = ({ isOpen, onClose, onOpen, asPath }) => {
    const fontColorShades = useColorModeValue("black.900", "white.300");
    const linkBgShades = useColorModeValue("green.200", "green.500");

    return (
        <>
            {NavbarItems.map((link) => (
                <NextLink
                    href={link.route}
                    key={link.name}
                    passHref
                >
                    <CharkaLink
                        href={link.route}
                        px={2}
                        py={1}
                        rounded="md"
                        _hover={{
                            textDecoration: "none",
                            bg: linkBgShades
                        }}
                        bg={link.route === asPath && linkBgShades}
                        color={link.route === asPath && fontColorShades}
                        onClick={isOpen ? onClose : onOpen}
                    >
                        {link.name}
                    </CharkaLink>
                </NextLink>
            ))}
        </>
    );
}

export default NavBar;

import React from 'react';
import {
    Flex,
    IconButton,
    HStack,
    Text,
    Box,
    Stack,
    Link as CharkaLink,
    useColorModeValue,
    Menu,
    Icon,
    MenuButton,
    MenuList,
    Avatar
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { NavbarItems, DropDownLinks } from '../constant';
import { useDisclosure } from '@chakra-ui/hooks';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { BiChevronDown } from 'react-icons/bi';
import { MdTimeline } from "react-icons/md";
import { BsBook } from "react-icons/bs";

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
            <DropdownLinks onOpen={onOpen} asPath={asPath} />
        </>
    );
}

const DropdownLinks = ({ onOpen, asPath }) => {
    const iconColorShades = useColorModeValue("green", "white");
    const linkBgShades = useColorModeValue("green.200", "green.500");
    const fontColorShades = useColorModeValue("black.900", "white.300");
    const menuListBgShades = useColorModeValue('rgb(255, 255, 255)', 'rgb(26, 32, 44)');
    const menuListBoxShadowShades = useColorModeValue(
        '2px 4px 6px 2px rgba(160, 174, 192, 0.6)',
        '2px 4px 6px 2px rgba(9, 17, 28, 0.6)'
    );

    const dropdownIconsHashMap = {
        '/books': <Icon as={BsBook} size={20} color={iconColorShades} />,
        '/projects': <Icon as={MdTimeline} size={20} color={iconColorShades} />
    }

    return (
        <Menu autoSelect={false} isLazy>
            {({ isOpen, onClose }) => (
                <>
                    <MenuButton
                        variant="ghost"
                        size="md"
                        px={3}
                        py={1}
                        lineHeight="inherit"
                        fontSize={'1em'}
                        rounded={'md'}
                        height={'auto '}
                        bg={DropDownLinks.map((item) => item.route).includes(asPath) ? linkBgShades : ''}
                        _hover={{
                            textDecoration: "none",
                            bg: linkBgShades
                        }}
                    >
                        <HStack>
                            <Text>Links</Text>
                            <Icon
                                as={BiChevronDown}
                                h={5}
                                w={5}
                                ml={1}
                                transition={'all .25s ease-in-out'}
                                transform={isOpen ? 'rotate(180deg)' : ''}
                            />
                        </HStack>
                    </MenuButton>
                    <MenuList
                        zIndex={5}
                        bg={menuListBgShades}
                        border="none"
                        boxShadow={menuListBoxShadowShades}
                    >
                        {DropDownLinks.map((link) => (
                            <NextLink
                                href={link.route}
                                key={link.name}
                                passHref
                            >
                                <CharkaLink
                                    href={link.route}
                                    px={4}
                                    py={2}
                                    my={2}
                                    mx={1}
                                    as={"div"}
                                    fontSize={"1em"}
                                    rounded="md"
                                    _hover={{
                                        textDecoration: "none",
                                        bg: linkBgShades
                                    }}
                                    bg={link.route === asPath && linkBgShades}
                                    color={link.route === asPath && fontColorShades}
                                    onClick={isOpen ? onClose : onOpen}
                                >
                                    <HStack my={1}>
                                        {dropdownIconsHashMap[link.route]}
                                        <Text px={3}>{link.name}</Text>
                                    </HStack>
                                </CharkaLink>
                            </NextLink>
                        ))}
                    </MenuList>
                </>
            )}
        </Menu>
    );
}

export default NavBar;

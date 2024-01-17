import { useColorModeValue, Icon, Menu, MenuButton, HStack, MenuList, Text, Link as ChakraLink } from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import { BsBook } from 'react-icons/bs';
import { MdTimeline } from 'react-icons/md';

import NextLink from 'next/link';

import { DropdownLinks as LinksData } from '@/constants';

interface DropdownLinksProps {
	onOpen: () => void;
	pathname: string;
}

const DropdownLinks = ({
	onOpen,
	pathname
}: DropdownLinksProps) => {
	// TODO: Type these
	const iconColorShades = useColorModeValue("green", "white");
	const linkBgShades: any = useColorModeValue("green.200", "green.500");
	const fontColorShades: any = useColorModeValue("black.900", "white.300");
	const menuListBgShades = useColorModeValue('rgb(255, 255, 255)', 'rgb(26, 32, 44)');
	const menuListBoxShadowShades = useColorModeValue(
		'2px 4px 6px 2px rgba(160, 174, 192, 0.6)',
		'2px 4px 6px 2px rgba(9, 17, 28, 0.6)'
	);

	const dropdownIconsHashMap: { [key: string]: JSX.Element } = {
		'/books': <Icon as={BsBook} size={20} color={iconColorShades} />,
		'/projects': <Icon as={MdTimeline} size={20} color={iconColorShades} />
	}

	return (
		<Menu autoSelect={false} isLazy>
			{({ isOpen, onClose }) => (
				<>
					<MenuButton
						// @ts-ignore
						variant="ghost"
						size="md"
						px={3}
						py={1}
						lineHeight="inherit"
						fontSize={'1em'}
						rounded={'md'}
						height={'auto '}
						bg={LinksData.map((item) => item.route).includes(pathname) ? linkBgShades : ''}
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
						{LinksData.map((link) => (
							<NextLink
								href={link.route}
								key={link.name}
								passHref
							>
								<ChakraLink
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
									bg={link.route === pathname && linkBgShades}
									color={link.route === pathname && fontColorShades}
									onClick={isOpen ? onClose : onOpen}
								>
									<HStack my={1}>
										{dropdownIconsHashMap[link.route]}
										<Text px={3}>{link.name}</Text>
									</HStack>
								</ChakraLink>
							</NextLink>
						))}
					</MenuList>
				</>
			)}
		</Menu>
	);
}

export default DropdownLinks;

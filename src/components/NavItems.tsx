import NextLink from 'next/link';
import { useColorModeValue, Link as ChakraLink } from '@chakra-ui/react';

import { NavbarItems } from '@/constants';

import DropdownLinks from './DropdownLinks';

interface NavItemsProps {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
	pathname: string;
}

const NavItems = ({
	isOpen,
	onClose,
	onOpen,
	pathname
}: NavItemsProps) => {
	// TODO: Type these
	const fontColorShades: any = useColorModeValue("black.900", "white.300");
	const linkBgShades: any = useColorModeValue("green.200", "green.500");

	return (
		<>
			{NavbarItems.map((link) => (
				<ChakraLink
					key={link.name}
					as={NextLink}
					href={link.route}
					px={2}
					py={1}
					rounded="md"
					_hover={{
						textDecoration: "none",
						bg: linkBgShades
					}}
					bg={link.route === pathname && linkBgShades}
					color={link.route === pathname && fontColorShades}
					onClick={isOpen ? onClose : onOpen}
				>
					{link.name}
				</ChakraLink>
			))}
			<DropdownLinks onOpen={onOpen} pathname={pathname} />
		</>
	);
}

export default NavItems
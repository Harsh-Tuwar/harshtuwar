'use client';

import { FaMoon, FaSun } from 'react-icons/fa';

import {
	IconButton,
	Tooltip,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';

const ColorModeSwitcher = (props: any) => {
	const { toggleColorMode } = useColorMode();
	const text = useColorModeValue("dark", "light");
	const SwitchIcon = useColorModeValue(FaMoon, FaSun);
	const grayShade = useColorModeValue("gray.200", "gray.900");

	return (
		<Tooltip
			label={text === "dark" ? "Dark mode" : "Light mode"}
			aria-label="A tooltip"
		>
			<IconButton
				{...props}
				size="md"
				fontSize="md"
				variant="ghost"
				color="current"
				marginLeft="2"
				onClick={toggleColorMode}
				icon={<SwitchIcon />}
				aria-label={`Switch to ${text} mode`}
				_hover={{
					bg: grayShade
				}}
			/>
		</Tooltip>
	);
}

export default ColorModeSwitcher;

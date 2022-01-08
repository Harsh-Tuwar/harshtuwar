import * as React from "react";
import {
	useColorMode,
	useColorModeValue,
	IconButton,
	Tooltip
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export const ColorModeSwitcher = props => {
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
				{...props}
			/>
		</Tooltip>
	);
};

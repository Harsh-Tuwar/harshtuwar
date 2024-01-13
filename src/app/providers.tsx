'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const config = {
	useSystemColorMode: true,
};

const theme = extendTheme({
	...config,
	"colors": {
		"gray": {
			"50": "#F2F2F2",
			"100": "#DCDBDC",
			"200": "#C5C4C5",
			"300": "#AEADAE",
			"400": "#979697",
			"500": "#807F80",
			"600": "#676567",
			"700": "#4D4C4D",
			"800": "#333333",
			"900": "#1A191A"
		}
	}
});

export function Providers({ children }: { children: React.ReactNode }) {
	return <ChakraProvider theme={theme}>
		{children}
	</ChakraProvider>
}

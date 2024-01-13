import { Box } from '@chakra-ui/react';

const styles = {
	dottedRightTransform: {
	  transform: 'translateX(10%) translateY(-40%)',
	},
	
	dottedLeftTransform: {
	  transform: 'translateX(-20%) translateY(70%)',
	},
	
	dottedColor: {
	  color: 'rgba(55,65,81, 1)',
	},
};
  
const DottedSvgs = () => {
	return (
		<Box
			position="absolute"
			height="50rem"
			width="100%"
			overflow="hidden"
			display={['none', 'none', 'block']}
			zIndex={-1}
		>
			<Box position="relative" height="100%" mx="auto" maxW="940px">
				<Box position="absolute" left="100%">
					<svg
						style={{...styles.dottedRightTransform, ...styles.dottedColor}}
						color="rgba(55,65,81, 1)"
						width="404"
						height="784"
						fill="none"
						viewBox="0 0 404 784"
					>
						<defs>
							<pattern
								id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
								x="0"
								y="0"
								width="20"
								height="20"
								patternUnits="userSpaceOnUse"
							>
								<rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
							</pattern>
						</defs>
						<rect width="404" height="784" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"></rect>
					</svg>
				</Box>
				<Box position="absolute" right="100%">
					<svg
						style={styles.dottedLeftTransform}
						color="rgba(55,65,81, 1)"
						width="404"
						height="784"
						fill="none"
						viewBox="0 0 404 784"
					>
						<defs>
							<pattern
								id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
								x="0"
								y="0"
								width="20"
								height="20"
								patternUnits="userSpaceOnUse"
							>
								<rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
							</pattern>
						</defs>
						<rect width="404" height="784" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"></rect>
					</svg>
				</Box>
			</Box>
		</Box>
	)
}

export default DottedSvgs;

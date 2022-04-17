import { bookTags } from '../constant';
import { Flex, Icon } from '@chakra-ui/react';

const BookTag = ({ state, ...flexProps }) => {
	const currentTag = bookTags[state] ?? {};

	if (currentTag === {}) {
		return <></>;
	}

	return (
		<Flex
			align="center"
			justify="center"
			w={5}
			h={5}
			bg={currentTag.color}
			rounded="full"
			{...flexProps}
		>
			<Icon as={currentTag.icon} boxSize={3} color="white" />
		</Flex>
	);
}

export default BookTag;

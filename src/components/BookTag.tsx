import { Flex, FlexProps, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { BiGlasses } from 'react-icons/bi';
import { FiShoppingBag } from 'react-icons/fi';
import { HiCheck, HiOutlineHeart } from 'react-icons/hi';

const bookTags: { [key: string]: { color: string, icon: IconType }} = {
    'Favorites': { color: 'red.400', icon: HiOutlineHeart },
    'Reading': { color: 'purple.400', icon: BiGlasses },
    'Wishlist': { color: 'green.400', icon: FiShoppingBag },
    'Finished': { color: 'blue.400', icon: HiCheck }
};


interface BookTagProps {
	state: string;
	flexProps: FlexProps;
}

const BookTag = ({ state, ...flexProps }: BookTagProps) => {
	const currentTag = bookTags[state] ?? {};

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

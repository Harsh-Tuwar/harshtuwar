import { Stack, Text, Box, Link, useColorModeValue as mode} from "@chakra-ui/react";

const BookQuoteBox = () => {
	return (
		<>
		<BookCard
			quote={"A reader lives a thousand lives before he dies, said Jojen. The man who never reads lives only one."}
			author={" George R.R. Martin, A Dance with Dragons"}
			/>
		</>
	)
}

const BookCard = ({ quote, author }) => {
	return (
		<Box
			p={4}
			display={{ md: "flex" }}
			width={"100%"}
			margin={2}
			bg={mode("gray.50", "gray.700")}
			rounded="md"
		>
		<Stack
			align={{ base: "right", md: "stretch" }}
			textAlign={{ base: "right", md: "left" }}
			mt={{ base: 4, md: 0 }}
			ml={{ md: 6 }}
		>
			<Link
				my={1}
				display="block"
				fontSize="md"
				lineHeight="normal"
				fontWeight="semibold"
				href="#"
			>
				{quote}
			</Link>
			<Text my={2} color="gray.500" align={'end'}>
				- {author}
			</Text>
		</Stack>
	</Box>
	);
}

export default BookQuoteBox;

// export const newContent = [
// 	{
// 	  link: '/blog/started-2022-by-updating-portfolio-website-1jde-temp-slug-4553258',
// 	  text: 'Started 2022 by updating portfolio website',
// 	  showNewTag: true,
// 	},
// 	{
// 	  link: '/changelog',
// 	  text: 'Created changelog page to track meaningful changes',
// 	  showNewTag: true,
// 	},
// ]
  
// const BookQuoteBox = ({ linkColor }) => {
// 	return (
// 	  <Stack
// 		mb={5}
// 		mt={5}
// 		mx={[0, 0, 0]}
// 		padding={4}
// 		align="start"
// 		borderLeft="4px solid"
// 		borderColor={linkColor}
// 		color={'whatsapp'}
// 		_hover={{ shadow: 'lg' }}
// 		backgroundColor={useColorModeValue('green.100', '#1e2533')}
// 		rounded="sm"
// 		fontSize="md"
// 	  >
// 		{/* <Text
// 		  textAlign="center"
// 		  color={useColorModeValue('black', 'white')}
// 		  fontWeight="bold"
// 		  fontSize={['md', 'lg']}
// 		  variant="gradient"
// 		  fromcolor="black.900"
// 		  tocolor="white.500"
// 		>
// 		  New year, new content:
// 		</Text> */}
// 		<UnorderedList textAlign="left" paddingLeft={5} m={0}>
// 		  {newContent.map((content, index) => (
// 			<ListItem key={index}>
// 			  <NextLink href={content.link} passHref>
// 				<Link color={linkColor}>
// 				  {content.text}
// 				  {content.showNewTag && (
// 					<Badge ml="1" colorScheme="green">
// 					  New
// 					</Badge>
// 				  )}
// 				</Link>
// 			  </NextLink>
// 			</ListItem>
// 		  ))}
// 		</UnorderedList>
// 	  </Stack>
// 	)
// }

// const Quote = () => {
// 	<ListItem key={index}>
// 		<Link color={linkColor}>
// 			{content.text}
// 			{content.showNewTag && (
// 			<Badge ml="1" colorScheme="green">
// 				New
// 			</Badge>
// 			)}
// 		</Link>
// 	</ListItem>
// }
// export default BookQuoteBox;

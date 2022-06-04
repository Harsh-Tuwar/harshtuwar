import useSWR from 'swr';
import Book from '../components/Book';
import Header from '../components/PageTitle';
import styles from '../styles/Home.module.css';
import Paragraph from '../components/Paragraph';
import PageHeader from '../components/PageHeader';
import { PageSlideFade } from '../components/PageTransitions';
import { Container, Box, VStack, Heading, SimpleGrid, Skeleton } from "@chakra-ui/react";

const subtitle = "A collection of interesting books that I read or look forward to reading.";
const gapBtwnTwoBookCards = 4;

const Books = () => {
	const fetcher = (url) => fetch(url).then((data) => data.json()).catch((e) => console.log(e));
	const { data } = useSWR('/api/books', fetcher);

	const getBooksObject = (bookItem) => {
		const { properties } = bookItem;
		const id = bookItem["id"];
		const title = properties["Name"]["title"][0]["text"]["content"];
		const author = properties["Author"]["rich_text"][0]["text"]["content"];
		const cover = properties["Cover"]["files"][0]["external"]["url"];
		const state = properties["Status"]["select"]["name"];
		return {
			title,
			author,
			cover,
			state,
			id,
		};
	}

	return (
		<div className={styles.container}>
			<PageHeader />
			<main>
				<Container maxW="container.lg" mt={['5', '10']} mb={['5', '10']}>
					<PageSlideFade>
						<Box>
							<Header mt={0} mb={6} emoji="📚">
								Books
							</Header>
							<Paragraph fontSize="lg" lineHeight={1.6} my={5}>
								{subtitle}
							</Paragraph>

							<VStack alignItems="flex-start" spacing={4}>
								<Heading size="md" mt={6} >Currently reading 🤓 </Heading>
								<SimpleGrid as="section" gap={gapBtwnTwoBookCards} columns={{ base: 1, md: 2 }}>
									{data ? data.map((bookItem) => {
										const book = getBooksObject(bookItem);

										if (book.state === 'Reading') {
											return (<Book key={book.id} book={book} />)
										} else { return null; }
									}) : <Skeleton height='120px' rounded="md"/> }
								</SimpleGrid>
							</VStack>

							<VStack alignItems="flex-start" spacing={4}>
								<Heading size="md" mt={6} >Wishlist 💭</Heading>
								<SimpleGrid as="section" gap={gapBtwnTwoBookCards} columns={{ base: 1, md: 2 }}>
								{(data && data.length) ? data.map((bookItem) => {
										const book = getBooksObject(bookItem);

										if (book.state === 'Wishlist') {
											return (<Book key={book.id} book={book} />)
										} else { return null; }
									}) : <Skeleton height='120px' rounded="md"/> }
								</SimpleGrid>
							</VStack>

							<VStack alignItems="flex-start" spacing={4}>
								<Heading size="md" mt={6} >Favorites ❤️</Heading>
								<SimpleGrid as="section" gap={gapBtwnTwoBookCards} columns={{ base: 1, md: 2 }}>
								{(data && data.length) ? data.map((bookItem) => {
										const book = getBooksObject(bookItem);

										if (book.state === 'Favorites') {
											return (<Book key={book.id} book={book} />)
										} else { return null; }
									}) : <Skeleton height='120px' rounded="md"/> }
								</SimpleGrid>
							</VStack>

							<VStack alignItems="flex-start" spacing={4}>
								<Heading size="md" mt={6} >Done 😄 </Heading>
								<SimpleGrid as="section" gap={gapBtwnTwoBookCards} columns={{ base: 1, md: 2 }}>
								{(data && data.length) ? data.map((bookItem) => {
										const book = getBooksObject(bookItem);

										if (book.state === 'Finished') {
											return (<Book key={book.id} book={book} />)
										} else { return null; }
									}) : <Skeleton height='120px' rounded="md"/> }
								</SimpleGrid>
							</VStack>
						</Box>
					</PageSlideFade>
				</Container>
			</main>
		</div>
	)
}

export default Books;
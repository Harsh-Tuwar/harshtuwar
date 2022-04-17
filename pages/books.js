import Meta from '../components/Meta';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { Container, Box, VStack, Heading, SimpleGrid } from "@chakra-ui/react";
import Paragraph from '../components/Paragraph';
import { PageSlideFade } from '../components/PageTransitions';
import Header from '../components/PageTitle';
import { currentlyReading, doneReading, favReadings, wishlistReading } from '../constant';
import Book from '../components/Book';
import BookQuoteBox from '../components/BookQuoteBox';

const subtitle = "A collection of interesting books that I read or look forward to reading.";
const gapBtwnTwoBookCards = 6;

const Books = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Harsh Tuwar | Software Developer</title>
				<Meta />
				<link rel="icon" href="/favicon.ico" />
			</Head>

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
								<SimpleGrid as="section" gap={gapBtwnTwoBookCards} columns={{ base: 1, md: 3 }}>
									{[currentlyReading].map((book) => (
										<Book key={book.id} book={book} />
									))}
								</SimpleGrid>
							</VStack>

							<VStack alignItems="flex-start" spacing={4}>
								<Heading size="md" mt={6} >Favorites ❤️</Heading>
								<SimpleGrid as="section" gap={gapBtwnTwoBookCards} columns={{ base: 1, md: 3 }}>
									{favReadings.map((book) => (
										<Book key={book.id} book={book} />
									))}
								</SimpleGrid>
							</VStack>

							<VStack alignItems="flex-start" spacing={4}>
								<Heading size="md" mt={6} >Wishlist 💭</Heading>
								<SimpleGrid as="section" gap={gapBtwnTwoBookCards} columns={{ base: 1, md: 3 }}>
									{wishlistReading.map((book) => (
										<Book key={book.id} book={book} />
									))}
								</SimpleGrid>
							</VStack>

							<VStack alignItems="flex-start" spacing={4}>
								<Heading size="md" mt={6} >Done 😄 </Heading>
								<SimpleGrid as="section" gap={gapBtwnTwoBookCards} columns={{ base: 1, md: 3 }}>
									{doneReading.map((book) => (
										<Book key={book.id} book={book} />
									))}
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
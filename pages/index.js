import { Container, Divider, SlideFade, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import useSWR from 'swr';
import ProfileSection from '../sections/ProfileSection';
import TechStackSection from '../sections/TechStackSection.jsx';
import styles from '../styles/Home.module.css'

export default function Home() {
	const fetcher = (url) => fetch(url).then((r) => r.json()).catch((e) => console.log(e));
	const { data } = useSWR('/api/spotify', fetcher);

	return (
		<div className={styles.container}>
			<Head>
				<title>Harsh Tuwar | Software Developer</title>
				<meta property="og:title" content="Harsh Tuwar | Software Developer"></meta>
				<meta name="description" content="Harsh Tuwar | Software Developer" />
				<link rel="icon" href="/house.png" />
			</Head>

			<main>
				<Container maxW="container.lg" mt={['5', '10']} mb={['5', '10']}>
					<SlideFade in offsetX={80}>
						<Flex width="full" align="center" justifyContent="center" flexDirection="column">
							<ProfileSection song={data} />
							<Divider my={7} />
							<TechStackSection />
						</Flex>
					</SlideFade>
				</Container>
			</main>
		</div>
	)
}


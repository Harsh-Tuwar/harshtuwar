import useSWR from 'swr';
import styles from '../styles/Home.module.css'
import PageHeader from '../components/PageHeader';
import ProfileSection from '../sections/ProfileSection';
import TechStackSection from '../sections/TechStackSection.jsx';
import { Container, Divider, SlideFade, Flex } from '@chakra-ui/react';

export default function Home() {
	const fetcher = (url) => fetch(url).then((r) => r.json()).catch((e) => console.log(e));
	const { data } = useSWR('/api/spotify', fetcher);

	return (
		<div className={styles.container}>
			<PageHeader />
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


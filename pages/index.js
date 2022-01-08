import { Container, Divider } from '@chakra-ui/react';
import Head from 'next/head';
import ProfileSection from '../sections/ProfileSection';
import styles from '../styles/Home.module.css'

export default function Home() {
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
					{/* <ProfileSection song={data} /> */}
					<ProfileSection />
					{/* <Divider my={7} /> */}
					{/* <TechStackSection /> */}
					<Divider my={7} />
					{/* <LiveProjectSection /> */}
				</Container>

			</main>
		</div>
	)
}


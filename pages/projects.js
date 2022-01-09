import React from 'react';
import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import GithubSection from '../sections/GithubSection';

const Projects = ({ repos }) => {
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
					<GithubSection repos={repos} />
				</Container>
			</main>
		</div>
	);
}

export const getStaticProps = () => {
	// const repos = await getGithubRepos({ username: process.env.GITHUB_USERNAME });

    return {
        props: {
            repos: null,
        },
    };
}

export default Projects;

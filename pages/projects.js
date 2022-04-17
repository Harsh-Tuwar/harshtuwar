import {
	VStack,
	Container,
	Box,
} from "@chakra-ui/react";
import { projectsList } from '../constant';
import { PageSlideFade } from '../components/PageTransitions';
import { LeftProjectLayoutLarge, ProjectLayoutMed, RightProjectLayoutLarge } from "../components/ProjectLayout";
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import Paragraph from '../components/Paragraph';
import { Fragment } from 'react';
import Meta from '../components/Meta';
import Header from '../components/PageTitle';

const subtitle = "A selection of projects I've worked on, during my career as a software developer.";

const Projects = () => {
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
							<Header mt={0} mb={6} emoji="💻">
								Projects
							</Header>

							<Paragraph fontSize="lg" lineHeight={1.6} my={5}>
								{subtitle}
							</Paragraph>

							<VStack spacing={8} mt={["7", "0", "0"]}>
								{projectsList.map((project, index) => (
									<Fragment key= { index }>
										<ProjectLayoutMed project={project} />
										{index % 2 === 0 ? (
											<LeftProjectLayoutLarge project={project} />
										) : (
											<RightProjectLayoutLarge project={project} />
										)}
									</Fragment>
								))}
							</VStack>
						</Box>
					</PageSlideFade>
				</Container>
			</main>
		</div>
	);
};

export default Projects;

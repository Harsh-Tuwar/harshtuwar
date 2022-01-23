import {
	VStack,
	Heading,
	Flex,
	Stack,
	Container,
	Box,
} from "@chakra-ui/react";
import { projectsList } from '../constant';
import { PageSlideFade } from '../components/PageTransitions';
import { LeftProjectLayoutLarge, ProjectLayoutMed, RightProjectLayoutLarge } from "../components/ProjectLayout";
import { AiFillProject } from "react-icons/ai";
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import Paragraph from '../components/Paragraph';
import UnderlinedText from '../components/UnderlinedText';
import { Fragment } from 'react';
import Meta from '../components/Meta';

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
							<UnderlinedText>
								<Flex alignItems="center">
									<Stack pr={3}>
										<AiFillProject size="30px" />
									</Stack>
									<Heading>Projects</Heading>
								</Flex>
							</UnderlinedText>

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

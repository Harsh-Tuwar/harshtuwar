import React from 'react';
import {
	Container,
	SlideFade,
	Flex,
	Box,
	VStack,
	useColorMode
} from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { MotionBox } from '../utils/motion';
import { companies, educations, certifications } from '../constant';
import CompanyCard from '../components/CompanyCard';
import Paragraph from '../components/Paragraph';
import Meta from '../components/Meta';
import Header from '../components/PageTitle';

const About = () => {
	const { colorMode } = useColorMode();

	return (
		<div className={styles.container}>
			<Head>
				<title>Harsh Tuwar | Software Developer</title>
				<Meta />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Container maxW="container.lg" mt={['5', '10']} mb={['5', '10']}>
					<SlideFade in offsetX={80}>
						<Box>
							<Header mt={0} mb={6} emoji="🤩">
								About Me
							</Header>

							<Paragraph fontSize="lg" lineHeight={1.6} my={5}>
								I am a software developer with 3+ years 💪🏼 of working experience. My developer🧑🏼‍🏫 &nbsp; journey started with Javascript/HTML/CSS
								during my diploma. After graduation, this journey continued with JS/TS and Web Development overall when
								I joined Reach Boarding 👔
							</Paragraph>

							<Paragraph fontSize="lg" lineHeight={1.6} my={5}>
								As a full-time software engineer🧑🏼‍💻, I was lucky enough to work with bunch of web🕸 technologies including
								various cloud platforms☁️ and tools. In my free time I self taught myself about Hybrid mobile📱 app development
								using Flutter and React Native.
							</Paragraph>

							<Flex alignItems="center" my={10}>
								<Header mt={0} mb={0} emoji="💼">
									Career
								</Header>
							</Flex>

							<VStack spacing={4} marginBottom={6} align="left" mx={[0, 0, 6]} mt={5}>
								{companies.map((company, index) => (
									<MotionBox whileHover={{ y: -5 }} key={index}>
										<CompanyCard
											key={index}
											title={company.title}
											role={company.role}
											skills={company.skills}
											period={company.period}
											logo={company.logo}
											url={company.url}
											colorMode={colorMode}
										/>
									</MotionBox>
								))}
							</VStack>

							<Flex alignItems="center" my={10}>
								<Header mt={0} mb={0} emoji="🎓">
									Education
								</Header>
							</Flex>

							<VStack spacing={4} marginBottom={6} align="left" mx={[0, 0, 6]} mt={5}>
								{educations.map((education, index) => (
									<MotionBox whileHover={{ y: -5 }} key={index}>
										<CompanyCard
											key={index}
											title={education.title}
											role={education.role}
											skills={education.skills}
											period={education.period}
											logo={education.logo}
											url={education.url}
											colorMode={colorMode}
										/>
									</MotionBox>
								))}
							</VStack>

							<Flex alignItems="center" my={10}>
								<Header mt={0} mb={0} emoji="🧐">
									Certificates
								</Header>
							</Flex>

							<VStack spacing={4} marginBottom={6} align="left" mx={[0, 0, 6]} mt={5}>
								{certifications.map((education, index) => (
									<MotionBox whileHover={{ y: -5 }} key={index}>
										<CompanyCard
											key={index}
											title={education.title}
											role={education.role}
											skills={education.skills}
											period={education.period}
											logo={education.logo}
											url={education.url}
											colorMode={colorMode}
										/>
									</MotionBox>
								))}
							</VStack>
						</Box>
					</SlideFade>
				</Container>
			</main>
		</div>
	);
}

export default About;

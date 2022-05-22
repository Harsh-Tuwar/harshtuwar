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
								I am a full stack software engineer with 3+ years 💪🏼 of working experience based in Toronto, ON and specialized in Web and Hybrid mobile app development.
								I am passionate😍 about Blockchain, Machine Learning and IoT technologies and strongly believe that these technologies can solve many of the real life problems😄 we are facing currently as a society.
								In my spare time, I love listening to 🎧 AudioBooks, watching 🎥 Netflix/Anime, cooking😋 and hanging out with friends👥. I am in the software development field to make an “impact” and solve real life problems by using various technologies.
							</Paragraph>

							<Paragraph fontSize="lg" lineHeight={1.6} my={5}>
								As a full-time software engineer🧑🏼‍💻, I was lucky enough get a chance to work with bunch of web🕸 technologies including
								various cloud platforms☁️ and tools. After getting a good grip of web technologies, I self taught myself about Hybrid mobile📱 app development
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

import React from 'react';
import {
	Container,
	SlideFade,
	Heading,
	Flex,
	Stack,
	Box,
	VStack,
	useColorMode
} from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { FaCertificate, FaGraduationCap } from 'react-icons/fa';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { MotionBox } from '../utils/motion';
import { companies, educations, certifications } from '../constant';
import CompanyCard from '../components/CompanyCard';
import UnderlinedText from '../components/UnderlinedText';
import Paragraph from '../components/Paragraph';

const About = () => {
	const { colorMode } = useColorMode();

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
						<Box>
							<UnderlinedText>
								<Flex alignItems="center">
									<Stack pr={3}>
										<AiFillStar size="30px" />
									</Stack>
									<Heading>About Me</Heading>
								</Flex>
							</UnderlinedText>

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
								<UnderlinedText>
									<Flex alignItems="center">
										<Stack pr={3}>
											<BsFillBriefcaseFill size="30px" />
										</Stack>

										<Heading>Career</Heading>
									</Flex>
								</UnderlinedText>
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
								<UnderlinedText>
									<Flex alignItems="center">
										<Stack pr={3}>
											<FaGraduationCap size={'30px'} />
										</Stack>
										<Heading>Education</Heading>
									</Flex>
								</UnderlinedText>
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
								<UnderlinedText>
									<Flex alignItems="center">
										<Stack pr={3}>
											<FaCertificate size={'30px'} />
										</Stack>
										<Heading>Certificates</Heading>
									</Flex>
								</UnderlinedText>
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

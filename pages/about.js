import {
	Container,
	SlideFade,
	Flex,
	Box,
	VStack,
	useColorMode,
	Skeleton
} from '@chakra-ui/react';
import React from 'react';
import { MotionBox } from '../utils/motion';
import Header from '../components/PageTitle';
import styles from '../styles/Home.module.css';
import Paragraph from '../components/Paragraph';
import PageHeader from '../components/PageHeader';
import CompanyCard from '../components/CompanyCard';
import useSWR from 'swr';

const getFetcher = (url) => fetch(url).then(async (res) => {
	const aboutMeRes = await res.json();

	return {
		aboutMe: aboutMeRes.aboutMe,
		workExp: aboutMeRes.workExp,
		certs: aboutMeRes.certs,
		edu: aboutMeRes.eduData
	};
});

const About = () => {
	const { colorMode } = useColorMode();
	const { data: aboutMeContent, isLoading: fetchingAboutContent } = useSWR('/api/about', getFetcher, { revalidateOnFocus: false });

	return (
		<div className={styles.container}>
			<PageHeader />
			<main>
				<Container maxW="container.lg" mt={['5', '10']} mb={['5', '10']}>
					<SlideFade in offsetX={80}>
						<Box>
							<Header mt={0} mb={6} emoji="🤩">
								About Me
							</Header>

							{fetchingAboutContent ? <Skeleton height='300px' rounded="md" my={5} /> : aboutMeContent.aboutMe && aboutMeContent.aboutMe.map((para, index) => {
								return (
									<Paragraph fontSize="lg" lineHeight={1.6} my={5} key={index}>
										{para}
									</Paragraph>
								)
							})}

							<Flex alignItems="center" my={10}>
								<Header mt={0} mb={0} emoji="💼">
									Career
								</Header>
							</Flex>

							{fetchingAboutContent ? <Skeleton height='600px' rounded="md" my={5} /> : (
								<VStack spacing={4} marginBottom={6} align="left" mx={[0, 0, 6]} mt={5}>
									{aboutMeContent.workExp.sort((a, b) => ((a.ordinal < b.ordinal) ? -1 : ((a.ordinal > b.ordinal) ? 1 : 0))).map((expItem, index) => (
										<MotionBox whileHover={{ y: -5 }} key={index}>
											<CompanyCard
												key={index}
												title={expItem.companyName}
												role={expItem.position}
												skills={expItem.skills.map((s) => s.name)}
												period={expItem.tenure}
												logo={expItem.logo}
												url={expItem.url}
												colorMode={colorMode}
											/>
										</MotionBox>
									))}
								</VStack>
							)}

							<Flex alignItems="center" my={10}>
								<Header mt={0} mb={0} emoji="🎓">
									Education
								</Header>
							</Flex>

							
							{fetchingAboutContent ? <Skeleton height={'200px'} rounded={'md'} my={5} /> : (
								<VStack spacing={4} marginBottom={6} align="left" mx={[0, 0, 6]} mt={5}>
									{aboutMeContent.edu
										.sort((a, b) => ((a.ordinal < b.ordinal) ? -1 : ((a.ordinal > b.ordinal) ? 1 : 0)))
										.map((eduItem, index) => (
											<MotionBox whileHover={{ y: -5 }} key={index}>
												<CompanyCard
													key={index}
													title={eduItem.instName}
													role={eduItem.degree}
													skills={eduItem.skills.map((s) => s.name)}
													period={eduItem.period}
													logo={eduItem.logo}
													url={eduItem.url}
													colorMode={colorMode}
												/>
											</MotionBox>
										))
									}
								</VStack>
							)}

							<Flex alignItems="center" my={10}>
								<Header mt={0} mb={0} emoji="🧐">
									Certificates
								</Header>
							</Flex>

							{fetchingAboutContent ? <Skeleton height={'600px'} rounded={'md'} my={5} /> : (
								<VStack spacing={4} marginBottom={6} align="left" mx={[0, 0, 6]} mt={5}>
									{aboutMeContent.certs
										.sort((a, b) => ((a.ordinal < b.ordinal) ? -1 : ((a.ordinal > b.ordinal) ? 1 : 0)))
										.map((certItem, index) => (
											<MotionBox whileHover={{ y: -5 }} key={index}>
												<CompanyCard
													key={index}
													title={certItem.orgName}
													role={certItem.certName}
													skills={certItem.skills.map((s) => s.name)}
													period={certItem.period}
													logo={certItem.orgLogo}
													url={certItem.url}
													colorMode={colorMode}
												/>
											</MotionBox>
										))
									}
								</VStack>
							)}
						</Box>
					</SlideFade>
				</Container>
			</main>
		</div>
	);
}

export default About;

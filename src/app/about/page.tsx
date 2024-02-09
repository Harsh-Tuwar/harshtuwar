'use client';

const dynamic = 'force-dynamic';
const revalidate = 0

import useSWR from 'swr';
import PageTitle from '@/components/PageTitle';
import Paragraph from '@/components/Paragraph';
import PageHeader from '@/components/PageHeader';
import CompanyCard from '@/components/CompanyCard';

import { MotionBox } from '@/utils/motion';
import { aboutMeFetcher } from '@/utils/fetcher';

import { Box, Container, Flex, Skeleton, SlideFade, VStack, useColorMode } from '@chakra-ui/react';

interface IExpItem {
	ordinal: number;
	position: string;
	companyName: string;
	skills: { id: string, name: string}[];
	tenure: string;
	logo: string;
	url: string;
};

interface IEduItem {
	ordinal: number;
	degree: string;
	instName: string;
	skills: { id: string, name: string }[];
	period: string;
	logo: string;
	url: string;
}

interface ICertItem {
	ordinal: number;
	orgName: string;
	certName: string;
	skills: { id: string, name: string }[];
	period: string;
	orgLogo: string;
	url: string;
}

const About = () => {
	const { colorMode } = useColorMode();
	const { data: aboutMeContent, isLoading: fetchingAboutContent } = useSWR('/api/about', aboutMeFetcher );

	return (
		<div>
			<PageHeader />
			<main>
				<Container maxW="container.lg" mt={['5', '10']} mb={['5', '10']}>
					<SlideFade in offsetX={80}>
						<Box>
							<PageTitle mt={0} mb={6} emoji="🤩">
								About Me
							</PageTitle>

							{fetchingAboutContent || !aboutMeContent ? <Skeleton height='300px' rounded="md" my={5} /> : aboutMeContent.aboutMe && aboutMeContent.aboutMe.map((para: string, index: number) => {
								return (
									<Paragraph fontSize="lg" lineHeight={1.6} my={5} key={index}>
										{para}
									</Paragraph>
								)
							})}

							<Flex alignItems="center" my={10}>
								<PageTitle mt={0} mb={0} emoji="💼">
									Career
								</PageTitle>
							</Flex>

							{fetchingAboutContent || !aboutMeContent ? <Skeleton height='600px' rounded="md" my={5} /> : (
								<VStack spacing={4} marginBottom={6} align="left" mx={[0, 0, 6]} mt={5}>
									{aboutMeContent.workExp.sort((a: IExpItem, b: IExpItem) => a.ordinal - b.ordinal).map((expItem: IExpItem, index: number) => (
										<MotionBox whileHover={{ y: -5 }} key={index}>
											<CompanyCard
												key={index}
												alt={expItem.position}
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
								<PageTitle mt={0} mb={0} emoji="🎓">
									Education
								</PageTitle>
							</Flex>


							{fetchingAboutContent || !aboutMeContent ? <Skeleton height={'200px'} rounded={'md'} my={5} /> : (
								<VStack spacing={4} marginBottom={6} align="left" mx={[0, 0, 6]} mt={5}>
									{aboutMeContent.edu
										.sort((a: IEduItem, b: IEduItem) => ((a.ordinal < b.ordinal) ? -1 : ((a.ordinal > b.ordinal) ? 1 : 0)))
										.map((eduItem: IEduItem, index: number) => (
											<MotionBox whileHover={{ y: -5 }} key={index}>
												<CompanyCard
													alt={eduItem.degree}
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
								<PageTitle mt={0} mb={0} emoji="🧐">
									Certificates
								</PageTitle>
							</Flex>

							{fetchingAboutContent || !aboutMeContent ? <Skeleton height={'600px'} rounded={'md'} my={5} /> : (
								<VStack spacing={4} marginBottom={6} align="left" mx={[0, 0, 6]} mt={5}>
									{aboutMeContent.certs
										.sort((a: ICertItem, b: ICertItem) => ((a.ordinal < b.ordinal) ? -1 : ((a.ordinal > b.ordinal) ? 1 : 0)))
										.map((certItem: ICertItem, index: number) => (
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
													alt={certItem.certName}
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

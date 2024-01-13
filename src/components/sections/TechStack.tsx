'use client';
import {
	useColorModeValue,
	SlideFade,
	Heading,
	Grid,
	Text
} from '@chakra-ui/react';

import {
	FaJs,
	FaAws,
	FaGitAlt
} from 'react-icons/fa';

import {
	SiTypescript,
	SiPython,
	SiReact,
	SiRedux,
	SiTailwindcss,
	SiNodedotjs,
	SiGooglecloud,
	SiMicrosoftazure,
	SiMaterialdesign,
	SiMysql,
	SiPostgresql,
	SiMongodb,
	SiFirebase,
	SiApachekafka,
	SiApachepulsar,
	SiGraphql,
	SiFlutter,
	SiVisualstudiocode,
	SiDocker
} from 'react-icons/si';

import StackCard from '../StackCard';

const technologies = [
	{
		name: "Typescript",
		icon: <SiTypescript fontSize="20px" />
	},
	{
		name: "Javascript",
		icon: <FaJs fontSize="20px" />
	},
	{
		name: "Python",
		icon: <SiPython fontSize="20px" />
	},
	{
		name: "React & React Native",
		icon: <SiReact fontSize="20px" />
	},
	{
		name: "Redux",
		icon: <SiRedux fontSize="20px" />
	},
	{
		name: "Material UI",
		icon: <SiMaterialdesign fontSize="20px" />
	},
	{
		name: "Tailwind CSS",
		icon: <SiTailwindcss fontSize="20px" />
	},
	{
		name: "NodeJS",
		icon: <SiNodedotjs fontSize="20px" />
	},
	{
		name: "Google Cloud",
		icon: <SiGooglecloud fontSize="20px" />
	},
	{
		name: "Azure",
		icon: <SiMicrosoftazure fontSize="20px" />
	},
	{
		name: "Amazon Web Services",
		icon: <FaAws fontSize="20px" />
	},
	{
		name: "MySQL",
		icon: <SiMysql fontSize="20px" />
	},
	{
		name: 'PostgreSQL',
		icon: <SiPostgresql fontSize={'20px'} />
	},
	{
		name: "MongoDB",
		icon: <SiMongodb fontSize="20px" />,
	},
	{
		name: "Firebase",
		icon: <SiFirebase fontSize="20px" />,
	},
	{
		name: "Kafka",
		icon: <SiApachekafka fontSize="20px" />
	},
	{
		name: "Pulsar",
		icon: <SiApachepulsar fontSize='20px' />
	},
	{
		name: "GraphQL",
		icon: <SiGraphql fontSize="20px" />
	},
	{
		name: "Flutter",
		icon: <SiFlutter fontSize="20px" />
	},
	{
		name: "VSCode",
		icon: <SiVisualstudiocode fontSize="20px" />
	},
	{
		name: "Docker",
		icon: <SiDocker fontSize="20px" />,
	},
	{
		name: "Github & GitLab",
		icon: <FaGitAlt fontSize="20px" />,
	},
];

const TechStack = () => {
	const greyShade = useColorModeValue("gray.600", "gray.400");

	return (
		<SlideFade in offsetY={80} delay={0.2}>
			<Heading as="h1" fontSize={{ base: "24px", md: "30px", lg: "36px" }} mb={3}>
				Tech Stack
			</Heading>
			<Text textColor={greyShade} fontSize="lg">
				A list of my favorite tools and technologies that I like to use on a regular basis.
			</Text>
			<Grid
				mt={5}
				templateColumns={["1fr", "repeat(2,1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]}
				gap={[2, 5, 5, 5]}
			>
				{technologies.map((stack) => (
					<StackCard stack={stack} key={stack?.name} />
				))}
			</Grid>
		</SlideFade>
	);
}

export default TechStack
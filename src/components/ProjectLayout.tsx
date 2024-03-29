import { motion } from "framer-motion";
import { FaGithub } from 'react-icons/fa';
import { stagger, fadeInUp } from '@/components/FramerAnimation';
import { HiOutlineExternalLink } from "react-icons/hi";

import {
	useColorModeValue,
	IconButton,
	Flex,
	Image,
	Box,
	ListItem,
	Skeleton,
	AspectRatio
} from "@chakra-ui/react";

import { MotionBox, MotionFlex, MotionList, MotionText } from "../utils/motion";
import { IProject } from '@/app/projects/page';

interface ProjectLayoutMedProps {
	project: IProject;
}

interface LeftProjectLayoutLargeProps extends ProjectLayoutMedProps { }

interface RightProjectLayoutLargeProps extends ProjectLayoutMedProps { }


const skillsTextColor = 'black';

const ProjectLayoutMed = ({ project }: ProjectLayoutMedProps) => {
	const gray900_100 = useColorModeValue("gray.900", "gray.100");
	const gray100_900 = useColorModeValue("gray.100", "gray.900");
	const colormode_05_1 = useColorModeValue("0.5", "1");
	const gray600_700 = useColorModeValue("gray.600", "gray.700");
	const gray100_700 = useColorModeValue("gray.100", "gray.700");
	const skillsBgColor = useColorModeValue("green.200", "white");

	return (
		<Flex display={["flex", "flex", "none"]} rounded="xl"
			borderWidth="1px"
			borderColor={gray600_700}
			w="full"
			h="fit-content"
			textAlign="left"
			align="start"
			shadow="md"
			_hover={{ border: "md", shadow: "lg" }}
			overflow="hidden"
			position="relative">
			<a href={project.site} target="_blank" rel="noopener noreferrer">
				<AspectRatio ratio={1.85 / 1} w="100%" h="100%" rounded="xl">
					<Image
						src={project.image}
						fallback={<Skeleton />}
						width={'full'}
						height={'full'}
						position="absolute"
						alt=''
						rounded="xl" style={{ objectFit: 'cover' }} opacity={0.5} />
				</AspectRatio>
				<Box
					width={'full'}
					height={'full'}
					position="absolute"
					bg={gray100_900}
					opacity={colormode_05_1}
				></Box>
			</a>
			<MotionBox initial="initial" animate="animate" width={["full", "70%"]} rounded="lg" my="auto" px="6" py="3" position="relative" zIndex="10">
				<MotionBox variants={stagger}>
					<a href={project.site} target="_blank" rel="noopener noreferrer">
						<MotionText variants={fadeInUp} fontSize='2xl' fontWeight="bold" color={gray900_100}>
							{project.title}
						</MotionText>
						<Box width="full">
							<MotionText
								variants={fadeInUp}
								bg={gray100_700}
								rounded="lg"
								align="left"
								width={["full", "140%"]}
								p="4"
								fontSize="sm"
							>
								{project.description}
							</MotionText>
							{project.techStack && (
								<MotionList variants={fadeInUp} display="flex" flexWrap="wrap" width={["full", "140%"]} fontSize="xs" justifyContent="start" mt="3" color={skillsTextColor} fontWeight="bold">
									{project.techStack.map((s, index) => (
										<ListItem key={index} mr="2" backgroundColor={skillsBgColor} style={{ borderRadius: 16, padding: '5px 10px', margin: 5 }}>
											<i>{s}</i>
										</ListItem>
									))}
								</MotionList>
							)}
						</Box>
					</a>
					<MotionFlex variants={fadeInUp} pt={2} mt={1} justifyContent="start">
						<a href={project.github} target="_blank" rel="noopener noreferrer" style={{ marginRight: 10 }}>
							<IconButton
								colorScheme="gray"
								rounded="full"
								size="md"
								aria-label="medal"
								icon={<FaGithub />}
							/>
						</a>
						<a href={project.site} target="_blank" rel="noopener noreferrer">
							<IconButton
								colorScheme="gray"
								rounded="full"
								size="md"
								aria-label="medal"
								icon={<HiOutlineExternalLink />}
							/>
						</a>
					</MotionFlex>
				</MotionBox>
			</MotionBox>
		</Flex>
	);
};

const LeftProjectLayoutLarge = ({ project }: LeftProjectLayoutLargeProps) => {
	const gray600_700 = useColorModeValue("gray.600", "gray.700");
	const gray900_100 = useColorModeValue("gray.900", "gray.100");
	const gray100_700 = useColorModeValue("gray.100", "gray.700");
	const skillsBgColor = useColorModeValue("green.200", "white");
	
	return (
		<Flex width="full" display={["none", "none", "flex"]}>
			<MotionBox whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				initial={{ x: 500, opacity: 0 }}
				animate={{
					x: 0,
					opacity: 1,
					transition: {
						duration: 0.5,
						ease: "easeInOut"
					}
				}}
				rounded="xl"
				borderWidth="1px"
				borderColor={gray600_700}
				w="80%"
				h="24rem"
				textAlign="left"
				align="start"
				spacing={4}
				shadow="md"
				_hover={{ border: "md", shadow: "lg" }}
				overflow="hidden"
				position="relative"
			>
				<a href={project.site} target="_blank" rel="noopener noreferrer">
					<AspectRatio ratio={1.85 / 1} w="100%" h="100%" rounded="xl">
						<Image
							src={project.image}
							fallback={<Skeleton />}
							width={'full'}
							alt=''
							height={'full'}
							position="absolute"
							rounded="xl" style={{ objectFit: 'cover' }} opacity={0.5} _hover={{ opacity: 1 }}
						/>
					</AspectRatio>
				</a>
			</MotionBox>
			<MotionBox initial="initial"
				animate="animate" width="40%" rounded="lg" my="auto" zIndex="10" ml="-6rem" align="right">
				<motion.div variants={stagger}>
					<a
						href={project.site}
						target="_blank"
						rel="noopener noreferrer"
						className="text-right"
					>
						<MotionText variants={fadeInUp} fontSize='3xl' fontWeight="bold" color={gray900_100}>
							{project.title}
						</MotionText>
					</a>
					<Box width="full">
						<MotionText
							variants={fadeInUp}
							bg={gray100_700}
							rounded="lg"
							align="right"
							p="4"
							fontSize="md"
						>
							{project.description}
						</MotionText>
						{project.techStack && (
							<MotionList variants={fadeInUp} display="flex" fontSize="sm" justifyContent="end" mt="3" color={skillsTextColor} fontWeight="bold" style={{ flexWrap: 'wrap' }}>
								{project.techStack.map((s, index) => (
									<ListItem key={index} mr="3" backgroundColor={skillsBgColor} style={{ borderRadius: 16, padding: '5px 10px' }}>
										<i>{s}</i>
									</ListItem>
								))}
							</MotionList>
						)}
					</Box>

					<MotionFlex variants={fadeInUp} pt={2} mt={1} justifyContent="end">
						<a href={project.github} target="_blank" rel="noopener noreferrer" style={{ marginRight: 10 }}>
							<IconButton
								colorScheme="gray"
								rounded="full"
								size="md"
								aria-label="medal"
								icon={<FaGithub />}
							/>
						</a>
						<a href={project.site} target="_blank" rel="noopener noreferrer">
							<IconButton
								colorScheme="gray"
								rounded="full"
								size="md"
								aria-label="medal"
								icon={<HiOutlineExternalLink />}
							/>
						</a>
					</MotionFlex>
				</motion.div>
			</MotionBox>
		</Flex>
	);
};

const RightProjectLayoutLarge = ({ project }: RightProjectLayoutLargeProps) => {
	const gray100_700 = useColorModeValue("gray.100", "gray.700");
	const gray900_100 = useColorModeValue("gray.900", "gray.100");
	const gray600_700 = useColorModeValue("gray.600", "gray.700");
	const skillsBgColor = useColorModeValue("green.200", "white");

	return (
		<Flex width="full" display={["none", "none", "flex"]}>
			<MotionBox initial="initial"
				animate="animate" width="40%" rounded="lg" my="auto" zIndex="10" mr="-6rem" align="left">
				<motion.div variants={stagger}>
					<a
						href={project.site}
						target="_blank"
						rel="noopener noreferrer"
					>
						<MotionText variants={fadeInUp} fontSize='3xl' fontWeight="bold" color={gray900_100}>
							{project.title}
						</MotionText>
					</a>
					<Box width="full">
						<MotionText
							variants={fadeInUp}
							bg={gray100_700}
							rounded="lg"
							align="left"
							p="4"
							fontSize="md"
						>
							{project.description}
						</MotionText>
						{project.techStack && (
							<MotionList variants={fadeInUp} display="flex" fontSize="sm" justifyContent="start" mt="3" color={skillsTextColor} fontWeight="bold">
								{project.techStack.map((s, index) => (
									<ListItem key={index} mr="3" backgroundColor={skillsBgColor} style={{ borderRadius: 16, padding: '5px 10px' }} flexWrap="wrap">
										<i>{s}</i>
									</ListItem>
								))}
							</MotionList>
						)}
					</Box>

					<MotionFlex variants={fadeInUp} pt={2} mt={1} justifyContent="start">
						<a href={project.github} target="_blank" rel="noopener noreferrer" style={{ marginRight: 10 }}>
							<IconButton
								colorScheme="gray"
								rounded="full"
								size="md"
								aria-label="medal"
								icon={<FaGithub />}
							/>
						</a>
						<a href={project.site} target="_blank" rel="noopener noreferrer">
							<IconButton
								colorScheme="gray"
								rounded="full"
								size="md"
								aria-label="medal"
								icon={<HiOutlineExternalLink />}
							/>
						</a>
					</MotionFlex>
				</motion.div>
			</MotionBox>
			<MotionBox whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				initial={{ x: 500, opacity: 0 }}
				animate={{
					x: 0,
					opacity: 1,
					transition: {
						duration: 0.5,
						ease: "easeInOut"
					}
				}}
				rounded="xl"
				borderWidth="1px"
				borderColor={gray600_700}
				w="80%"
				h="24rem"
				textAlign="left"
				align="start"
				spacing={4}
				shadow="md"
				_hover={{ border: "md", shadow: "lg" }}
				overflow="hidden"
				position="relative"
			>
				<a href={project.site} target="_blank" rel="noopener noreferrer">
					<AspectRatio ratio={1.85 / 1} w="100%" h="100%" rounded="xl">
						<Image src={project.image}
							alt=""
							fallback={<Skeleton />}
							width={'full'}
							height={'full'}
							position="absolute"
							rounded="xl" style={{ objectFit: 'cover' }} opacity={0.5} _hover={{ opacity: 1 }} />
					</AspectRatio>
				</a>
			</MotionBox>
		</Flex>
	);
};

export { LeftProjectLayoutLarge, RightProjectLayoutLarge, ProjectLayoutMed };

import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import {
	SlideFade,
	Box,
	Heading,
	Avatar,
	Link,
	Flex,
	LightMode,
	ButtonGroup,
	Button,
    useColorModeValue,
    Divider
} from '@chakra-ui/react';

import { Resume } from '../constant';
import Paragraph from '../components/Paragraph';
import SocialButton from '../components/SocialButton';
import SpotifySection from './SpotifySection';

const ProfileSection = ({ song }) => {
    return (
        <SlideFade in offsetX={80}>
            <Box>
                <Flex alignItems="center" justifyContent="space-between">
                    <Heading
                        as="h1"
                        fontSize={{ base: '28px', md: '40px', lg: '48px' }}
                        mb={3}
                    >
                        Hey, I am Harsh Tuwar! <span className="waving-hand">👋</span>
                    </Heading>
                    <Flex alignItems={"flex-end"}>
                        <Avatar
                            name="Harsh Tuwar"
                            src="/profile_picture.png"
                            mb={5}
                            size='lg'
                        />
                    </Flex>
                </Flex>
                <Paragraph fontSize="2xl" lineHeight={1.6}>
                    Software Developer from Toronto, Canada 🇨🇦
                </Paragraph>
                <Paragraph fontSize="2xl" lineHeight={1.6}>
                    Focused on {" "}
                    <Link color={useColorModeValue("blue.500", "blue.400")} href="#" fontWeight="500">
                        Web
                    </Link>{" & "}
                    <Link color={useColorModeValue("blue.500", "blue.400")} href="#" fontWeight="500">
                        Hybrid Mobile App Development
                    </Link>.
                    {"\n"}Passionate about Blockchain & Machine Learning & IoT Technologies 🔥
                </Paragraph>

                <Box mt={5}>
                    <LightMode>
                        <ButtonGroup>
                            <SocialButton
                                social={Resume}
                            />
                            <Link href={'/contact'} style={{ textDecoration: 'none' }}>
                                <Button
                                    colorScheme="blue"
                                    size="sm"
                                    margin="5px"
                                    leftIcon={<BiPhoneCall color='white'/>}
                                >
                                    Contact Me
                                </Button>
                            </Link>
                        </ButtonGroup>
                    </LightMode>
                </Box>
                <Divider my={7} />
                <SpotifySection song={song}/>
            </Box>
        </SlideFade >
    )
}

export default ProfileSection;

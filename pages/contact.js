import React, { useState } from 'react';
import {
	Container,
	SlideFade,
	Box,
	FormControl,
	FormLabel,
	Flex,
	Button,
	Input,
	Heading,
	Textarea,
	Text,
	useColorModeValue,
	useToast
} from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import ErrorMessage from '../components/ErrorMessage';

const Contact = () => {
	const toast = useToast();
	const [formData, setFormData] = useState({ name: '', subject: '', email: '', msg: '' });
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const grayToDarkGrayShade = useColorModeValue('gray.100', 'gray.900');

	const clearInput = () => {
		setFormData({
			name: '', subject: '', email: '', msg: ''
		});

		setIsLoading(false);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		}

		const response = await fetch('https://api.harshtuwar.ml/send', requestOptions).catch((e) => {
			toast({
				title: "Hmm...",
				description: "Contact forms fields can not be empty!",
				status: 'error',
				duration: 9000,
				isClosable: true
			});

			return;
		});

		const { status } = await response.json();
		
		setIsLoading(false);

		if (status === 'success') {
			toast({
				title: 'Email sent.',
				description: 'You had successfully sent the email. I will reply your email ASAP. Thank you!',
				status: 'success',
				duration: 9000,
				isClosable: true
			});
		}

		clearInput();
	}

	const handleChange = (e) => {
		setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Harsh Tuwar | Software Developer</title>
				<meta property="og:title" content="Harsh Tuwar | Software Developer"></meta>
				<meta name="description" content="Harsh Tuwar | Software Developer" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Container maxW="container.lg" mt={['5', '10']} mb={['5', '10']}>
					<SlideFade in offsetX={80}>
						<Flex width="full" align="center" justifyContent="center">
							<Box p={8} maxWidth="container.lg" borderWidth={1} borderRadius={8} boxShadow="lg">
								<Heading size="lg">{"Let's get in touch. Leave me your message 💬"}</Heading>
								<Text fontSize="lg" my={2}>Do not hesitate to contact me!</Text>
								<Box my={4} textAlign="left">
								<form onSubmit={handleSubmit}>
                                        {error && <ErrorMessage message={error} />}
                                        <FormControl isRequired>
                                            <FormLabel key={'name'}>Name</FormLabel>
                                            <Input
                                                id='name'
												type='text'
												name='name'
                                                value={formData.name}
                                                placeholder="Your Name"
                                                size="lg"
                                                onChange={event => handleChange(event)}
                                                bg={grayToDarkGrayShade}
                                            />
                                        </FormControl>
                                        <FormControl isRequired mt={6}>
                                            <FormLabel key={'email'}>Subject</FormLabel>
                                            <Input
                                                id='subject'
                                                type='text'
                                                value={formData.subject}
												placeholder='Subject'
												name='subject'
                                                size="lg"
												onChange={event => handleChange(event)}
                                                bg={grayToDarkGrayShade}
                                            />
                                        </FormControl>
                                        <FormControl isRequired mt={6}>
                                            <FormLabel key={'email'}>Email</FormLabel>
                                            <Input
                                                id='email'
                                                type='email'
                                                value={formData.email}
												placeholder='Email'
												name='email'
                                                size="lg"
												onChange={event => handleChange(event)}
                                                bg={grayToDarkGrayShade}
                                            />
                                        </FormControl>
                                        <FormControl isRequired mt={6}>
                                            <FormLabel key='message'>Message</FormLabel>
                                            <Textarea
                                                id='message'
                                                type={'text'}
												value={formData.msg}
												name='msg'
                                                placeholder="Please type your message..."
                                                size="lg"
                                                onChange={event => handleChange(event)}
                                                bg={grayToDarkGrayShade}
                                            />
                                        </FormControl>
                                        <Button
                                            variant="solid"
                                            type="submit"
                                            width="full"
                                            mt={4}
                                            isLoading={isLoading}
                                            loadingText='Submitting'
                                            colorScheme={'blue'}
                                        >
                                            Send Message
                                        </Button>
                                    </form>
								</Box>
							</Box>
						</Flex>
					</SlideFade>
				</Container>
			</main>
		</div>
	)
}

export default Contact;

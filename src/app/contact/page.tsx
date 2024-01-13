'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

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

import ErrorMessage from '@/components/ErrorMessage';

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

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(formData)
		}

		const response = await fetch('https://harshtuwar-api.vercel.app/send', requestOptions).catch((e) => {
			toast({
				title: "Hmm...",
				description: "Contact forms fields can not be empty!",
				status: 'error',
				duration: 9000,
				isClosable: true
			});

			return;
		});

		const { status } = await response?.json();

		setIsLoading(false);

		if (status === 'success') {
			toast({
				title: 'Email sent.',
				description: 'Your email has been sent! I will get back to you ASAP. Thanks for contacting!',
				status: 'success',
				duration: 9000,
				isClosable: true
			});
		}

		clearInput();
	}

	const handleChange = (e: ChangeEvent) => {
		setFormData((prevState) => ({ ...prevState, [(e.target as any).name]: (e.target as any).value }));
	}

	return (
		<div>
			{/* <PageHeader /> */}
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
											colorScheme={'green'}
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

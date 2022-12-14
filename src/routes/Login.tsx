import ArmadaLogoURL from '../assets/Logo files/PNGs - SVGs/2x/Asset 2@2x-8.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Image,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const executeSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await auth.signIn(username, password);

    if (result.success) {
      if (result.adminStatus) {
        //check if username is admin, if yes go to admin path
        navigate('/');
      } else {
        navigate(`/studentPortal/${username}`);
      }

      // else go to student path
      // navigate({ pathname: `/studentPortal"/${studentUserName}`});
    } else {
      alert(result.message);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      justify={'center'}
      bg={useColorModeValue('black', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Image
            marginTop={'100px'}
            boxSize={'250px'}
            src={ArmadaLogoURL}
            alt="Armada's Logo -- A Pirate Ship!"
          />
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={executeSignIn}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  size="lg"
                  type="text"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  size="lg"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                ></Stack>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

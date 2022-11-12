import ArmadaLogoURL from '../assets/Logo files/PNGs - SVGs/2x/Asset 2@2x-8.png';

import { Link, useNavigate } from 'react-router-dom';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiUsers,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';

import { GiBookshelf } from 'react-icons/gi';
import { AiOutlineDesktop } from 'react-icons/ai';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { IconType } from 'react-icons';
import { ReactNode, ReactText } from 'react';
import { useAuth } from '../hooks/useAuth';

interface LinkItemProps {
  name: string;
  icon: IconType;
  destination: string;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  destination: string;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, destination: '/' },
  { name: 'Students', icon: FiUsers, destination: '/students' },
  { name: 'Cohorts', icon: HiOutlineUserGroup, destination: '/cohorts' },
  { name: 'Courses', icon: GiBookshelf, destination: '/courses' },
  { name: 'Workspaces', icon: AiOutlineDesktop, destination: '/workspaces' },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { isAdmin } = useAuth();

  const menuItems = () => {
    return (
      <>
        {LinkItems.map(link => (
          <NavItem
            key={link.name}
            icon={link.icon}
            destination={link.destination}
          >
            {link.name}
          </NavItem>
        ))}
      </>
    );
  };

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('black', 'gray.900')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          marginTop={'100px'}
          boxSize={'150px'}
          src={ArmadaLogoURL}
          alt="Armada's Logo -- A Pirate Ship!"
        />
      </Flex>
      <Flex
        mt="110px"
        h="20"
        flexDirection="column"
        alignItems="left"
        justifyContent="space-between"
      >
        {isAdmin ? menuItems() : null}
      </Flex>
    </Box>
  );
};

const NavItem = ({ icon, children, destination, ...rest }: NavItemProps) => {
  return (
    <Link to={destination} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        color="white"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { firstName, lastName, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  name={`${firstName} ${lastName}`}
                  color="white"
                  size={'sm'}
                  bgColor="#6aa9fd"
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm" color="black" fontWeight="bold">
                    {`${firstName} ${lastName}`}
                  </Text>
                  <Text fontSize="xs" color="black">
                    {isAdmin ? 'Admin' : 'Student'}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'white')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem onClick={() => handleSignOut()}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

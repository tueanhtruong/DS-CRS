import { Flex } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { NavRightContent } from './NavRightContent';

export const Navbar: React.FC = () => {
  return (
    <Flex className="h-16 fixed top-0 left-0 right-0 bg-primary-200 shadow-md z-20 pr-[12px]">
      <Flex
        align={'center'}
        justify={'space-between'}
        className="mx-auto container"
      >
        <Link href="/">
          <Image
            src={
              'https://storage.googleapis.com/static-files-demo-app/logo.png'
            }
            alt="logo"
            width={400}
            height={200}
            className="h-16 w-fit object-contain"
          />
        </Link>
        <NavRightContent />
      </Flex>
    </Flex>
  );
};

import { Flex } from '@mantine/core';
import classnames from 'classnames';
import React from 'react';
import { OverridableComponentProps } from 'src/hooks';

export type PanelProps = OverridableComponentProps<
  'div',
  { stickyHeight?: boolean }
>;

export const Panel: React.FC<PanelProps> = ({
  stickyHeight,
  children,
  className,
  style = {},
  ...rest
}) => {
  return (
    <Flex
      direction={'column'}
      gap={'md'}
      className={classnames('rounded-lg w-full bg-white p-4', className)}
      style={stickyHeight ? { ...style, height: 'calc(100vh - 6rem)' } : style}
      {...rest}
    >
      {children}
    </Flex>
  );
};

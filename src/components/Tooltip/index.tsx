import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Popover, { PopoverProps } from '../Popover';

const TooltipContainer = styled.div`
  width: 320px;
  padding: 6px 10px;
  line-height: 120%;
  font-weight: 400;
  font-size: 14px;
  backdrop-filter: blur(10px);
  border-radius: 9px;
`;

interface TooltipProps extends Omit<PopoverProps, 'content'> {
  text: string;
}

export default function Tooltip({ text, ...rest }: TooltipProps) {
  return <Popover content={<TooltipContainer>{text}</TooltipContainer>} {...rest} />;
}

export function MouseoverTooltip({ children, ...rest }: Omit<TooltipProps, 'show'>) {
  const [show, setShow] = useState(false);
  const open = useCallback(() => setShow(true), [setShow]);
  const close = useCallback(() => setShow(false), [setShow]);
  return (
    <Tooltip {...rest} show={show}>
      <div onMouseEnter={open} onMouseLeave={close}>
        {children}
      </div>
    </Tooltip>
  );
}

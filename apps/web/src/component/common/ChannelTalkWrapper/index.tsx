import React, { useRef, useState } from "react";
import ChannelService from "@/lib/channel-talk/service";
import useClickOutside from "@/hooks/useClickOutside";

interface channelTalkWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function ChannelTalkWrapper({ children, ...props }: channelTalkWrapperProps) {
  const [isOpenChannelTalk, setIsOpenChannelTalk] = useState(false);
  const elementRef = useRef(null);

  useClickOutside(elementRef, () => hide());

  const show = () => {
    ChannelService.showMessenger();
    setIsOpenChannelTalk(true);
  };

  const hide = () => {
    ChannelService.hideMessenger();
    setIsOpenChannelTalk(false);
  };

  const handleClick = () => {
    if (isOpenChannelTalk) {
      hide();
    } else {
      show();
    }
  };

  return (
    <div onClick={handleClick} ref={elementRef} {...props}>
      {children}
    </div>
  );
}

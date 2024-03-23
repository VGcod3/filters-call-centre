import {
  GripIcon,
  MicOffIcon,
  PauseIcon,
  PhoneIcon,
  Volume2Icon,
} from "lucide-react";
import { PhoneActionButton } from "./PhoneActionButton";
import { usePhone } from "~/contexts/phone";

export function TalkingPad() {
  const { toggleDialerOpen } = usePhone();
  return (
    <div className="grid grid-cols-3 gap-4 justify-items-center">
      <div className="text-center">
        <PhoneActionButton variant="ghost">
          <MicOffIcon />
        </PhoneActionButton>
        <p>Mute</p>
      </div>
      <div className="text-center">
        <PhoneActionButton variant="ghost" onClick={toggleDialerOpen}>
          <GripIcon />
        </PhoneActionButton>
        <p>Keypad</p>
      </div>
      <div className="text-center">
        <PhoneActionButton variant="ghost">
          <Volume2Icon />
        </PhoneActionButton>
        <p>Speaker</p>
      </div>
      <div className="text-center">
        <PhoneActionButton variant="ghost">
          <PauseIcon />
        </PhoneActionButton>
        <p>Hold</p>
      </div>
      <div className="text-center">
        <PhoneActionButton variant="ghost">
          <PhoneIcon />
        </PhoneActionButton>
        <p>Add call</p>
      </div>
    </div>
  );
}

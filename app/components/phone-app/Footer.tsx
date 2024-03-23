import { cn } from "~/lib/utils";
import { PhoneState, usePhone } from "~/contexts/phone";
import { DialButton } from "./DialButton";
import { DeclineButton } from "./DeclineButton";
import { DialPadToggleButton } from "./DialpadToggleButton";

export function Footer() {
  const { phoneState, switchPhoneState, toggleDialerOpen, dialerOpen } =
    usePhone();
  return (
    <div>
      {phoneState === PhoneState.Ringing ? (
        <div className="flex justify-between p-4">
          <DialButton onClick={() => switchPhoneState(PhoneState.Talking)} />
          <DeclineButton onClick={() => switchPhoneState(PhoneState.Idle)} />
        </div>
      ) : (
        <div
          className={cn(
            "flex justify-center items-center",
            phoneState !== PhoneState.Idle && "pb-4"
          )}
        >
          {phoneState === PhoneState.Idle && !dialerOpen && (
            <DialPadToggleButton onClick={toggleDialerOpen} />
          )}
          {phoneState === PhoneState.Dialing && <DeclineButton />}
          {phoneState === PhoneState.Talking && !dialerOpen && (
            <DeclineButton />
          )}
        </div>
      )}
    </div>
  );
}

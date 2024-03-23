import { HeaderContact } from "~/components/phone-app/HeaderContact";
import { HistoryPerson } from "~/components/phone-app/HistoryPerson";
import { Footer } from "./Footer";
import { Dialpad } from "./Dialpad";
import { TalkingPad } from "./TalkingPad";
import { PhoneState, usePhone } from "~/contexts/phone";

export function PhoneScreen() {
  const { phoneState, dialerOpen } = usePhone();
  return (
    <div>
      <div className="bg-white flex flex-col justify-between h-[550px] w-[300px]">
        {phoneState === PhoneState.Idle && (
          <div className="overflow-auto scrollbar-thin">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <HistoryPerson key={i} historyStatus="missed" />
              ))}
          </div>
        )}
        {(phoneState === PhoneState.Ringing ||
          phoneState === PhoneState.Dialing ||
          phoneState === PhoneState.Talking) && <HeaderContact />}
        {((phoneState === PhoneState.Idle && dialerOpen) ||
          (phoneState === PhoneState.Talking && dialerOpen)) && <Dialpad />}
        {phoneState === PhoneState.Talking && !dialerOpen && <TalkingPad />}
        {(phoneState === PhoneState.Idle ||
          phoneState === PhoneState.Ringing ||
          phoneState === PhoneState.Dialing ||
          phoneState === PhoneState.Talking) && <Footer />}
      </div>
    </div>
  );
}

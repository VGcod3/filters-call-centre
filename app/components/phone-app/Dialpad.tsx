import { DialerNumberInput } from "./DialerNumberInput";
import { DialerKeypad } from "./DialerKeypad";
import { PhoneState, usePhone } from "~/contexts/phone";
import type { RTCSessionEventMap } from "jssip/lib/RTCSession";
import type { CallOptions } from "jssip/lib/UA";
import { DialButton } from "./DialButton";

export function Dialpad() {
  const {
    switchPhoneState,
    dialerInput,
    userAgent,
    addCall,
    removeCall,
    audioRef,
  } = usePhone();

  const eventHandlers: Partial<RTCSessionEventMap> = {
    connecting: () => {
      console.log("call is connecting...");
    },

    progress: () => {
      console.log("call is in progress");
      switchPhoneState(PhoneState.Dialing);
    },
    failed: (e) => {
      console.log("call failed with cause: " + e.cause);
      removeCall();
      switchPhoneState(PhoneState.Idle);
    },
    ended: (e) => {
      console.log("call ended with cause: " + e.cause);
      removeCall();
      switchPhoneState(PhoneState.Idle);
    },
    confirmed: () => {
      console.log("call confirmed");
    },
    accepted: () => {
      console.log("Call is talking");
      switchPhoneState(PhoneState.Talking);
    },
    peerconnection: (event) => {
      const peerConnection = event.peerconnection;
      console.log("peerconnection", peerConnection);
      peerConnection.ontrack = (e) => {
        if (audioRef.current) {
          audioRef.current.srcObject = e.streams[0];
        }
      };
    },
  };

  const options: CallOptions = {
    eventHandlers,
    mediaConstraints: { audio: true, video: false },
  };

  return (
    <div>
      <DialerNumberInput />
      <div className="p-4">
        <DialerKeypad />
        <div className="flex justify-center pt-4">
          <DialButton
            onClick={() => {
              // dialerInput.length && switchPhoneState(PhoneState.Dialing)
              if (dialerInput.length) {
                const call = userAgent.call(dialerInput, options);
                addCall(call);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

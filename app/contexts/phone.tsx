import { type ReactNode, useEffect, useRef } from "react";
import { createContext, useState, useContext } from "react";
import JsSIP from "jssip";
import type { UAConfiguration, UnRegisteredEvent } from "jssip/lib/UA";
import type { RTCSession } from "jssip/lib/RTCSession";

const WEBRTC_SERVER_URL = "wss://sip2.mvoice.co.il";
const SIP_URI = "sip:6099611641@sip2.mvoice.co.il";
const SIP_PASSWORD = "d8k03L2R1K45ZNJ9";

interface TalkingState {
  type: "outgoing" | "incoming";
  callerId: string;
  name: string;
  startTime: Date;
}

export enum PhoneState {
  Idle = "idle",
  Dialing = "dialing",
  Ringing = "ringing",
  Talking = "talking",
}

interface PhoneContextType {
  phoneState: PhoneState;
  userAgent: JsSIP.UA;
  currentCall: RTCSession | null;
  addCall: (call: RTCSession) => void;
  removeCall: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  floatingPhone: boolean;
  toggleFloatingPhone: () => void;
  switchPhoneState: (state: PhoneState) => void;
  talkingState: TalkingState | null;
  setTalkingState: (state: TalkingState | null) => void;
  dialerOpen: boolean;
  toggleDialerOpen: () => void;
  dialerInput: string;
  setDialerInput: (value: string) => void;
}

export const PhoneContext = createContext<PhoneContextType>(null as never);

interface PhoneProviderProps {
  children: ReactNode;
}

export function PhoneProvider({ children }: PhoneProviderProps) {
  // 1. Remote state
  const [socket] = useState(new JsSIP.WebSocketInterface(WEBRTC_SERVER_URL));

  const configuration: UAConfiguration = {
    sockets: [socket],
    uri: SIP_URI,
    password: SIP_PASSWORD,
  };

  const [userAgent] = useState(new JsSIP.UA(configuration));

  const [currentCall, setCurrentCall] = useState<RTCSession | null>(null);

  useEffect(() => {
    // 1. Attach event listeners to userAgent

    userAgent.on("connecting", () => {
      console.log("userAgent connecting...");
    });

    userAgent.on("connected", () => {
      console.log("userAgent connected!!");
    });

    userAgent.on("disconnected", (e) => {
      console.log("userAgent disconnected :-(. Code: " + e.code);
    });

    userAgent.on("registered", () => {
      console.log("userAgent registered");
    });

    userAgent.on("unregistered", (e) => {
      console.log("userAgent unregistered", e.cause);
    });

    userAgent.on("registrationFailed", (e: UnRegisteredEvent) => {
      console.log("userAgent registration failed...", e.cause);
    });

    // 2. Start userAgent
    userAgent.start();
    return () => {
      userAgent.stop();
      userAgent.removeAllListeners();
    };
  }, [userAgent]);

  // 2. Local state
  const [floatingPhone, setFloatingPhone] = useState(false);
  const [phoneState, setPhoneState] = useState<PhoneState>(PhoneState.Idle);
  const [talkingState, setTalkingState] = useState<TalkingState | null>(null);
  const [dialerOpen, setDialerOpen] = useState(false);
  const [dialerInput, setDialerInput] = useState("");

  const switchPhoneState = (state: PhoneState) => {
    setPhoneState(state);
    if (state === PhoneState.Dialing) {
      setDialerOpen(false);
      setDialerInput("");
    }
  };

  const toggleDialerOpen = () => setDialerOpen((prevState) => !prevState);

  const toggleFloatingPhone = () => setFloatingPhone((prevState) => !prevState);

  const setDialerInputValue = (value: string) => setDialerInput(value);

  // const toggleCurrentCall = (session: RTCSession) => {
  //   setCurrentCall(prev => prev === null ? session : null)
  // }

  const addCall = (call: RTCSession) => setCurrentCall(call);
  const removeCall = () => setCurrentCall(null);

  // 3. Refs
  const audioRef = useRef<HTMLAudioElement>(null);

  const value: PhoneContextType = {
    phoneState,
    userAgent,
    currentCall,
    addCall,
    removeCall,
    audioRef,
    floatingPhone,
    toggleFloatingPhone,
    switchPhoneState,
    talkingState,
    setTalkingState,
    dialerOpen,
    toggleDialerOpen,
    dialerInput,
    setDialerInput: setDialerInputValue,
  };

  return (
    <PhoneContext.Provider value={value}>{children}</PhoneContext.Provider>
  );
}

export const usePhone = () => useContext(PhoneContext);

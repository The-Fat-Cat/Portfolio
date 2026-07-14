import { useRef } from "react";
import { CustomCursor } from "./components/CustomCursor/CustomCursor";
import { Navbar } from "./components/Navbar/Navbar";
import { ScrollContainer } from "./components/ScrollContainer/ScrollContainer";
import { useScrollTimeline } from "./hooks/useScrollTimeline";

export default function App() {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const { navigateTo } = useScrollTimeline({
    pinContainerRef,
    videoRef,
    sectionRefs,
  });

  return (
    <>
      <CustomCursor />
      <Navbar onNavigate={navigateTo} />
      <ScrollContainer ref={pinContainerRef} />
    </>
  );
}

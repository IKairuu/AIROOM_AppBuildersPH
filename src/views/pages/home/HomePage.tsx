import { LAUNCH_CHECKS_ENABLED } from "@/lib/constants/features";
import Benefits from "@/views/views/landing/Benefits";
import Faq from "@/views/views/landing/Faq";
import Features from "@/views/views/landing/Features";
import FinalCta from "@/views/views/landing/FinalCta";
import Hero from "@/views/views/landing/Hero";
import HowItWorks from "@/views/views/landing/HowItWorks";
import Impact from "@/views/views/landing/Impact";
import NavBar from "@/views/views/landing/NavBar";
import LaunchDialog from "@/views/views/launch/LaunchDialog";

export default function HomePage() {
  return (
    <div className="landing flex flex-1 flex-col">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Impact />
        <Benefits />
        <Faq />
        <FinalCta />
      </main>
      {LAUNCH_CHECKS_ENABLED && <LaunchDialog />}
    </div>
  );
}

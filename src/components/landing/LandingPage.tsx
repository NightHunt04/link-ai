import Header from "./header/Header";
import LandingContent from "./landingContent/LandingContent";

export default function LandingPage() {
  return (
    <div className="w-full flex items-center justify-center flex-col md:gap-7 select-none">
        <Header />
        <LandingContent />
    </div>
  )
}

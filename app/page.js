import VideoPortfolio from "../components/VideoPortfolio";
import dynamic from "next/dynamic";

const CinematicNavBar = dynamic(() => import("../components/CinematicNavBar"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <CinematicNavBar />
      <VideoPortfolio />
    </main>
  );
}

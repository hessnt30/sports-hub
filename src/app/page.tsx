import NextGameInfo from "@/components/NextGameInfo";
import Videos from "@/components/Videos";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row">
      <Videos />
      <NextGameInfo />
    </div>
  );
}

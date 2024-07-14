import Header from "@/components/Header";
import ImagesView from "@/components/imagesView/ImagesView";
import Welcome from "@/components/Welcome";
import { useSettings } from "@/store/settings";

export default function App() {
  const { imagesInfo } = useSettings();

  if (imagesInfo.length === 0) {
    return <Welcome />;
  }
  return (
    <>
      <Header />
      <ImagesView />
    </>
  );
}

import { useContext } from "react";

import { AppSettingsContext } from "@/components/AppSettingsProvider";
import Header from "@/components/Header";
import ImagesView from "@/components/ImagesView";
import Welcome from "@/components/Welcome";

export default function App() {
  const { imagesInfo } = useContext(AppSettingsContext);

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

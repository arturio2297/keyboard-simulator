import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import ContentSection from "./content/ContentSection";

function MainPage(): JSX.Element {

  return (
    <main className={styles['main-page']}>
      <Header/>
      <ContentSection/>
      <Footer/>
    </main>
  );
}

export default observer(MainPage);
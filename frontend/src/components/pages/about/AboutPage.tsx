import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";

function AboutPage(): JSX.Element {

  return (
    <main className={styles['about-page']}>
      <Header classname="fixed-header"/>
        <section className={styles['section']}>
          <p>
            The application is designed as a keyboard typing simulator.
          </p>
          <hr/>
          <p>
            As a text resource, an open api
            <a
              className={styles['link']}
              href="https://baconipsum.com/"
              target="_blank"
              rel="noreferrer"
            >
              baconipsum
            </a>
            is used to generate text.
          </p>
          <hr/>
          <p>
            All statistics on the results of working sessions is stored in the device's memory and, if desired,
            can be reset in the corresponding section
          </p>
        </section>
      <Footer classname="fixed-footer" hideAboutPageLink/>
    </main>
  );
}

export default observer(AboutPage);
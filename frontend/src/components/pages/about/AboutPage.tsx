import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import {cs, csc} from "../../../utils/styles.utils";
import useClose from "../../../hooks/useClose";
import Button from "../../../ui/button/Button";
import {useNavigate} from "react-router-dom";

function AboutPage(): JSX.Element {

  const [closed, close] = useClose();
  const navigate = useNavigate();

  const onBackClick = () => {
    close(() => {
      navigate('/');
    });
  }

  return (
    <main className={styles['about-page']}>
      <div className={cs(styles['inner'], 'section-appearance', csc({
        'section-disappearance': closed
      }))}>
        <div className={styles['header']}>
          <Button onClick={onBackClick}>
            Back
          </Button>
        </div>
        <div className={styles['segment']}>
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
        </div>
      </div>
    </main>
  );
}

export default observer(AboutPage);
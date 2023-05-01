import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import {cs, csc} from "../../../utils/styles.utils";
import Card from "../../../ui/card/Card";
import InfoSection from "./info/InfoSection";
import StatisticSection from "./statistic/StatisticSection";
import {ArrowLeft} from "react-feather";
import useClose from "../../../hooks/useClose";
import {useNavigate} from "react-router-dom";
import urls from "../../../urls";
import Button from "../../../ui/button/Button";

function ProfilePage(): JSX.Element {

  const [closed, close] = useClose();
  const navigate = useNavigate();

  const onMainPageClick = () => {
    close(() => navigate(urls.main));
  }

  return (
    <main className={styles['profile-page']}>
      <section className={styles['section']}>
        <Card classname={cs(styles['inner'], 'section-appearance', csc({
          'section-disappearance': closed
        }))}>
          <div className={styles['header']}>
            <Button onClick={onMainPageClick}>
              <ArrowLeft/>
              Back
            </Button>
          </div>
          <hr/>
          <div className={styles['content']}>
            <InfoSection/>
            <StatisticSection/>
          </div>
        </Card>
      </section>
    </main>
  );
}

export default observer(ProfilePage);
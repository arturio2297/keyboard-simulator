import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import useStores from "../../../../hooks/useStores";
import {SessionStats} from "../../../../contracts/simulation.contracts";
import {includesIgnoreCase} from "../../../../utils/string.utils";

const getTitle = (field: keyof SessionStats): string => {
  const titles: Record<keyof SessionStats, string> = {
    avgAccuracy: 'Avg accuracy',
    avgSpeed: 'Avg speed',
    totalTime: 'Total time',
    totalLetters: 'Total letters',
    totalParagraphs: 'Total paragraphs',
    totalWords: 'Total words'
  };
  return titles[field];
}

function TotalSection(): JSX.Element {

  const {simulationStore} = useStores();
  const {sessionsStats} = simulationStore;

  return (
    <section className={styles['total-section']}>
      <h3 className={styles['title']}>
        Total statistic
      </h3>
      <div className={styles['inner']}>
        {Object.entries(sessionsStats).map(([fieldKey, fieldValue]) => {

          const title = getTitle(fieldKey as keyof SessionStats);
          const isPercent = includesIgnoreCase(fieldKey, 'accuracy');
          const value = isPercent ? (fieldValue + '%') : fieldValue;

          return (
            <div
              key={fieldKey}
              className={styles['segment']}
            >
              <div className={styles['title']}>
                {title}
              </div>
              <div className={styles['value']}>
                {value}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default observer(TotalSection);
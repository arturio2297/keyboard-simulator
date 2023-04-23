import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import useStores from "../../../../hooks/useStores";
import {SessionResult} from "../../../../contracts/simulation.contracts";
import {formatTime} from "../../../../utils/date.utils";

const getTitle = (field: keyof SessionResult): string => {
  const titles: Record<keyof SessionResult, string> = {
    accuracy: 'Accuracy',
    speed: 'Speed',
    time: 'Time',
    totalParagraphs: 'Paragraphs',
    totalWords: 'Words',
    totalLetters: 'Letters',
    date: 'Date'
  };
  return titles[field];
}

const getValue = (value: string | number, field: keyof SessionResult): string | number => {
  switch (field) {
    case 'accuracy':
      return value + '%';
    case 'time':
      return formatTime(value as number);
    case 'date':
      return new Date(value).toLocaleDateString();
    default:
      return value;
  }
}

function ListSection(): JSX.Element {

  const {simulationStore} = useStores();
  const {sessionsResults} = simulationStore;

  if (!sessionsResults.length) return <></>;

  return (
    <section className={styles['list-section']}>
      {sessionsResults.map((result, resultI) =>
        <div
          key={resultI}
          className={styles['result-item']}
        >
          {Object.entries(result).map(([fieldKey, fieldValue]) => {

            const title = getTitle(fieldKey as keyof SessionResult);
            const value = getValue(fieldValue, fieldKey as keyof SessionResult);

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
        </div>)}
    </section>
  );
}

export default observer(ListSection);
import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import useStores from "../../../../hooks/useStores";
import {cs, csc} from "../../../../utils/styles.utils";
import {SimulationProgressField} from "../../../../contracts/simulation.contracts";
import {formatNumber} from "../../../../utils/number.utils";
import {includesIgnoreCase} from "../../../../utils/string.utils";

const getTitle = (field: SimulationProgressField): string => {
  const titles: Record<SimulationProgressField, string> = {
    accuracy: 'Accuracy',
    leftLetters: 'Letters left',
    leftWords: 'Words left',
    leftParagraphs: 'Paragraphs left',
    speed: 'Speed',
    time: 'Time',
    completePercent: ''
  };
  return titles[field];
}

interface Props {
  showFields?: SimulationProgressField[];
  showAllFields?: boolean;
  showCompleteIndication?: boolean;
  showDiffs?: boolean;
}

function Progress(props: Props): JSX.Element {

  const {simulationStore} = useStores();
  const {progress, sessionsStats} = simulationStore;

  const isShow = (field: SimulationProgressField): boolean => {
    const fields = props.showFields || [];
    const hideFields: SimulationProgressField[] =
      [
        'completePercent'
      ];
    return (!!props.showAllFields || fields.includes(field)) && !hideFields.includes(field);
  }

  const getFieldValueDiff = (field: SimulationProgressField): number => {
    switch (field) {
      case 'speed':
        return formatNumber(progress.speed - sessionsStats.avgSpeed);
      case 'accuracy':
        return formatNumber(progress.accuracy - sessionsStats.avgAccuracy);
      default:
        return 0;
    }
  }

  return (
    <section className={styles['progress']}>
      {props.showCompleteIndication &&
      <div className={styles['complete']}>
          <div
              className={styles['indicator']}
              style={{width: progress.completePercent + '%'}}
          />
      </div>}
      <div className={styles['inner']}>
        {Object.entries(progress)
          .filter(([fieldKey]) => isShow(fieldKey as SimulationProgressField))
          .map(([filedKey, fieldValue]) => {

            const title = getTitle(filedKey as SimulationProgressField);
            const isPercent = includesIgnoreCase(filedKey, 'accuracy');
            const value = isPercent ? fieldValue + '%' : fieldValue;
            const diff = getFieldValueDiff(filedKey as SimulationProgressField);

            return (
              <div
                key={filedKey}
                className={cs(styles['segment'], csc({
                  [styles['accuracy']]: filedKey === 'accuracy',
                }))}
              >
                <div className={styles['title']}>
                  {title}
                </div>
                <div className={styles['value']}>
                  {value}
                  {(diff !== 0) && props.showDiffs &&
                  <div className={cs(styles['diff'], csc({
                    [styles['plus']]: diff > 0,
                    [styles['minus']]: diff < 0
                  }))}>
                    {diff > 0 && '+'}
                    {isPercent ? (diff + '%') : diff}
                  </div>}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default observer(Progress);
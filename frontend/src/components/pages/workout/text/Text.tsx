import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import useStores from "../../../../hooks/useStores";
import {cs, csc} from "../../../../utils/styles.utils";
import {useEffect} from "react";
import {formatLetter, isCorrect, isCurrent, isIncorrect, isNewLine, isSpace} from "../../../../utils/letter.utils";

interface Props {
  showCurrentIndication?: boolean;
}

function Text(props: Props): JSX.Element {

  const {workoutStore} = useStores();
  const {paragraphs, letter, paragraph, result} = workoutStore;

  useEffect(() => {
    if (!paragraph) return;

    const paragraphEl = document.querySelector(`[data-paragraph-key="${paragraph.key}"]`) as HTMLElement;

    paragraphEl.scrollIntoView({ behavior: 'smooth' });

  }, [paragraph]);

  return (
    <section
      id="text"
      className={styles['text']}
    >
      {paragraphs.map(paragraph =>
        <div
          className={styles['paragraph']}
          key={paragraph.key}
          data-paragraph-key={paragraph.key}
        >
          {paragraph.words.map((word, wordI) =>
            <div
              className={cs(styles['word'], csc({
                [styles['first']]: wordI === 0
              }))}
              key={word.key}
              data-word-key={word.key}
            >
              {word.letters.map(x =>
                <div
                  className={cs(styles['letter'], csc({
                    [styles['space']]: isSpace(x),
                    [styles['new-line']]: isNewLine(x),
                    [styles['current']]: isCurrent(x, letter) && !!props.showCurrentIndication,
                    [styles['correct']]: isCorrect(result[x.key]),
                    [styles['incorrect']]: isIncorrect(result[x.key])
                  }))}
                  key={x.key}
                  data-letter-key={x.key}
                >
                  {formatLetter(x)}
                </div>)}
            </div>)}
        </div>)}
    </section>
  );
}

export default observer(Text);
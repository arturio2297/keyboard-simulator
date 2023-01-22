import {observer} from "mobx-react-lite";
import styles from "./styles.module.css";
import {cs, csc} from "../../../../../utils/styles.utils";
import useStores from "../../../../../hooks/useStores";
import {KeyUp, keyUps} from "../../../../../contracts/keyboard.contracts";

type KeyUpsLine = KeyUp[];

const getLine = (line: number): KeyUpsLine => {
  return keyUps.filter(keyUp => keyUp.line === line);
}

const keyboardLines: KeyUpsLine[] =
  [
    getLine(1),
    getLine(2),
    getLine(3),
    getLine(4),
    getLine(5),
    getLine(6)
  ];

function Keyboard(): JSX.Element {

  const {simulationStore} = useStores();
  const {pressedCode, keyUpCodes} = simulationStore;

  return (
    <section className={styles['keyboard']}>
      {keyboardLines.map((line, lineI) =>
        <div
          key={lineI}
          className={styles['line']}
        >
          {line.map((keyup, keyupI) =>
            <div
              key={keyupI}
              onClick={() => keyup.code === 'Escape' && simulationStore.pause()}
              className={cs(styles['keyup'], styles[keyup.type], csc({
                [styles['active']]: keyup.code === pressedCode,
                [styles['hint']]: keyUpCodes.includes(keyup.code)
              }))}
              title={keyup.symbol}
              data-code={keyup.code.toLowerCase()}
              data-alias={(keyup.alias || '').toLowerCase()}
            >
              <span className={styles['symbol']}>
                {keyup.symbol}
              </span>
              {keyup.additionalSymbol &&
              <span className={styles['additional-symbol']}>
                {keyup.additionalSymbol}
              </span>}
              {keyup.alias &&
              <span className={styles['alias']}>
                {keyup.alias}
              </span>}
            </div>)}
        </div>)}
    </section>
  );
}

export default observer(Keyboard);
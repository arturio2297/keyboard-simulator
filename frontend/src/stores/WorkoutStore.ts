import {makeAutoObservable, runInAction} from "mobx";
import {
  Letter,
  Paragraph,
  PressResult,
  SessionResult,
  SessionStats,
  SimulationProgress,
  SimulationStatus,
  Word
} from "../contracts/simulation.contracts";
import {letterKeyUps} from "../contracts/keyboard.contracts";
import {calcPercent, formatNumber} from "../utils/number.utils";
import {equalsIgnoreCase, isCaseSensitive, isUppercase} from "../utils/string.utils";
import {formatTime, TimeFormat} from "../utils/date.utils";
import {getTotal} from "../utils/statistic.utils";
import api from "../api";
import {LoadingState} from "../contracts/common.contracts";
import {RootStore} from "./RootStore";
import {noOp} from "../utils/object.utils";

type LoadingKeys = 'fetchText' | 'addSessionResult';

export class WorkoutStore {
  private _loading: LoadingState<LoadingKeys> = {};
  private _status = SimulationStatus.NONE;
  private _pressedCode = '';
  private _pressTimerId: NodeJS.Timeout | undefined;
  private _text = [] as string[];
  private _letterKey = '';
  private _result: Record<string, PressResult> = {};
  private _pressCount = 0;
  private _timerId?: NodeJS.Timeout;
  private _time = 0;
  private _showHints = true;
  private _sessionResults: SessionResult[] = [];

  constructor(private _rootStore: RootStore) {
    makeAutoObservable(this);
  }

  public ready(paragraphs = 5, showHints = true, test = false) {
    this.reset();
    this._showHints = showHints;

    if (test) {
      this._text = [
        'test1 ;test, ..',
        'test2 test. test',
        'test3 test./ ??'
      ];
      this._letterKey = this.letters[0].key;
      this._status = SimulationStatus.READY;
      return;
    }

    this._loading.fetchText = true;
    api.text.get(paragraphs)
      .then(response => {
        runInAction(() => {
          const doubleSpace = '  ';
          const space = ' ';
          this._text = response.data.content.map(paragraph => paragraph.replaceAll(doubleSpace, space));
          this._letterKey = this.letters[0].key;
          this._status = SimulationStatus.READY;
        });
      })
      .finally(() => {
        runInAction(() => this._loading.fetchText = false);
      });
  }

  public start() {
    if (this.isStatus(SimulationStatus.READY)) {
      this._startTimer();
      this._status = SimulationStatus.START;
    }
  }

  private _startTimer() {
    this._timerId = setInterval(() => {
      runInAction(() => this._time++);
    }, 1000);
  }

  public reset() {
    this._text = [];
    this._letterKey = '';
    this._result = {};
    this._pressCount = 0;
    this._pressedCode = '';
    clearTimeout(this._timerId);
    this._time = 0;
    this._showHints = true;
    this._status = SimulationStatus.NONE;
  }

  public press(key: string, code: string) {
    this._simulatePress(code);
    switch (this._status) {
      case SimulationStatus.READY:
        this.start();
        break;
      case SimulationStatus.START:
        this._processPress(key, code);
        break;
      case SimulationStatus.PAUSE:
        this.continue();
    }
  }

  public pause() {
    if (this.isStatus(SimulationStatus.START)) {
      clearTimeout(this._timerId);
      this._status = SimulationStatus.PAUSE;
    }
  }

  public continue() {
    if (this.isStatus(SimulationStatus.PAUSE)) {
      this._startTimer();
      this._status = SimulationStatus.START;
    }
  }

  private _processPress(key: string, code: string) {
    if (letterKeyUps[code] || (code === 'Space' || code === 'Enter')) {
      this._pressCount++;
      const letter = this.letters.find(letter => letter.key === this._letterKey) as Letter;
      this._result[letter.key] = {
        correct: letter.content,
        current: key
      };
      const letterIndex = this.letters.findIndex(x => x === letter);
      const nextLetter = this.letters[letterIndex + 1];
      if (nextLetter) {
        this._letterKey = nextLetter.key;
      } else {
        this._end();
      }
    } else if (code === 'Escape') {
      this.pause();
    }
  }

  private _end() {
    this._status = SimulationStatus.END;
    clearTimeout(this._timerId);
    setTimeout(() => {
      runInAction(() => this._status = SimulationStatus.RESULT);
    }, 750);
    if (this._rootStore.isLoggedIn) {
      this._loading.addSessionResult = true;
      api.workout.add({
        speed: this.progress.speed,
        time: this._time,
        accuracy: this.progress.accuracy,
        letters: this.letters.length,
        words: this.words.length,
        paragraphs: this.paragraphs.length
      })
        .then(noOp)
        .finally(() => {
          runInAction(() => this._loading.addSessionResult = false);
        });
    }
  }

  private _simulatePress(code: string) {
    clearTimeout(this._pressTimerId);
    this._pressedCode = code;
    this._pressTimerId = setTimeout(() => {
      runInAction(() => this._pressedCode = '');
    }, 100);
  }

  public isStatus(...statuses: SimulationStatus[]) {
    return statuses.includes(this._status);
  }

  public get status() {
    return this._status;
  }

  public get paragraphs(): Paragraph[] {
    return this._text.map((line, paragraphI, paragraphsArr) => {

      const paragraphKey = paragraphI + '';
      const isLastLine = (paragraphsArr.length - 1) === paragraphI;

      const words: Word[] = line.split(' ').map((word, wordI, wordsArr) => {

        const wordKey = paragraphKey + '_' + wordI;
        const isLastWord = (wordsArr.length - 1) === wordI;

        const letters: Letter[] = word.split('').map((letter, letterI) => {

          const letterKey = wordKey + '_' + letterI;

          return {
            content: letter,
            key: letterKey,
            wordKey
          }
        });

        if (!isLastWord) {
          // space
          letters.push({
            content: ' ',
            key: wordKey + '_' + letters.length,
            wordKey
          });
        }

        if (isLastWord && !isLastLine) {
          // new line
          letters.push({
            content: 'nl',
            key: wordKey + '_' + (letters.length + 1),
            wordKey
          })
        }

        return {
          key: wordKey,
          letters,
          paragraphKey
        }
      });

      return {
        key: paragraphKey,
        words
      }
    });
  }

  public get words(): Word[] {
    return this.paragraphs.reduce((words, line) => {
      return [...words, ...line.words];
    }, [] as Word[]);
  }

  public get letters(): Letter[] {
    return this.words.reduce((letters, word) => {
      return [...letters, ...word.letters];
    }, [] as Letter[]);
  }

  public get pressedCode() {
    return this._pressedCode;
  }

  public get letter() {
    return this.letters.find(letter => letter.key === this._letterKey);
  }

  public get word() {
    return this.words.find(word => word.key === (this.letter && this.letter.wordKey));
  }

  public get paragraph() {
    return this.paragraphs.find(paragraph => paragraph.key === (this.word && this.word.paragraphKey));
  }

  public get result() {
    return this._result;
  }

  public get keyUpCodes(): string[] {
    if (!this._showHints) return [];

    const letter = this.letter;
    if (!letter) return [];

    const letterSymbol = letter.content;
    const keyUps = Object.values(letterKeyUps);
    for (let i = 0; i < keyUps.length; i++) {
      const {code, symbol, additionalSymbol} = keyUps[i];
      if (isCaseSensitive(letterSymbol)
        && isUppercase(letterSymbol)
        && equalsIgnoreCase(letterSymbol, symbol)) {
        return ['ShiftLeft', code];
      } else if (equalsIgnoreCase(letterSymbol, symbol)) {
        return [code];
      } else if (letterSymbol === additionalSymbol) {
        return ['ShiftLeft', code];
      } else if (letterSymbol === ' ') {
        return ['Space'];
      } else if (letterSymbol === 'nl') {
        return ['Enter'];
      }
    }
    return [];
  }

  public get sessionsResults() {
    return this._sessionResults;
  }

  public get sessionsStats(): SessionStats {
    const results = this._sessionResults;
    let avgAccuracy = 0;
    let avgSpeed = 0;
    results.forEach((result, resultI) => {
      avgAccuracy += result.accuracy;
      avgSpeed += result.speed;
      if (resultI === (results.length - 1)) {
        avgAccuracy /= results.length;
        avgSpeed /= results.length;
      }
    });
    return {
      avgAccuracy: formatNumber(avgAccuracy),
      avgSpeed: formatNumber(avgSpeed),
      totalTime: formatTime(getTotal(results, 'time'), TimeFormat.HH_MM_SS),
      totalLetters: getTotal(results, 'totalLetters'),
      totalWords: getTotal(results, 'totalWords'),
      totalParagraphs: getTotal(results, 'totalParagraphs')
    };
  }

  public get progress(): SimulationProgress {
    const total = Object.values(this._result);
    const correct = total.filter(x => x.correct === x.current);
    const getLeftWords = (): number => {
      if (!this.word) return this.words.length;
      const wordIndex = this.words.findIndex(word => word === this.word);
      return this.words.length - wordIndex;
    }
    const getLeftParagraphs = (): number => {
      if (!this.paragraph) return this.paragraphs.length;
      const paragraphIndex = this.paragraphs.findIndex(paragraph => paragraph === this.paragraph);
      return this.paragraphs.length - paragraphIndex;
    }
    const getKps = (): number => {
      if (!this._time) return 0;
      return formatNumber(this._pressCount / this._time);
    }
    return {
      completePercent: calcPercent(total, this.letters),
      accuracy: calcPercent(correct, total),
      leftLetters: this.letters.length - total.length,
      leftWords: getLeftWords(),
      leftParagraphs: getLeftParagraphs(),
      speed: getKps(),
      time: formatTime(this._time)
    }
  }

  public get loading() {
    return this._loading;
  }

}
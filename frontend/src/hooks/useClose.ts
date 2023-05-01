import {useState} from "react";

type Close = (afterClose?: Close) => void;

const useClose = (timeout = 500): [boolean, Close] => {

  const [closed, setClosed] = useState(false);

  return [
    closed,
    (afterClose) => {
      if (closed) return;

      setClosed(true);
      setTimeout(() => {
        afterClose && afterClose();
      }, timeout);
    }
  ];
}

export default useClose;
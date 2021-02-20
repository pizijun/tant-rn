import React, { FC, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  TextStyle,
} from 'react-native';
import { parseFormat, parseTimeData, isSameSecond } from '../../utils';

interface CountDownProps {
  time?: number | string;
  format?: string;
  textStyle?: StyleProp<TextStyle>;
  onFinish?: () => void;
};

const CountDown: FC<CountDownProps> = (props) => {
  const {
    time = 0,
    format = 'HH:mm:ss',
    textStyle,
    onFinish,
  } = props;

  const [remain, setRemain] = useState(0);
  const remainRef = useRef(0);
  const [endTime, setEndTime] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  const getRemain = () => {
    return Math.max(endTime - Date.now(), 0);
  };

  useEffect(() => {
    const intTime = +time;
    remainRef.current = intTime;
    setRemain(intTime);
    setEndTime(Date.now() + intTime);
    setIsCounting(true);
  }, [time]);

  useEffect(() => {
    if (isCounting) {
      let timerId: number;
  
      const f = () => {
        const curRemain = getRemain();
        if (!isSameSecond(curRemain, remainRef.current) || curRemain === 0) {
          if (curRemain === 0) {
            onFinish && onFinish();
          }
          remainRef.current = curRemain;
          setRemain(curRemain);
        }

        if (remainRef.current > 0) {
          timerId = requestAnimationFrame(f);
        }
      };
  
      timerId = requestAnimationFrame(f);
  
      return () => {
        setIsCounting(false);
        cancelAnimationFrame(timerId);
      };
    }
  }, [isCounting]);

  return (
    <View>
      <Text style={StyleSheet.flatten([styles.textTime, textStyle])}>{parseFormat(format, parseTimeData(remain))}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textTime: {
    color: '#63687B',
    fontSize: 14,
  },
});

export default CountDown;
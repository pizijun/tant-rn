import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import flexbem from '../Style/flexbem';

interface CountDownProps {
  time?: number | string;
  format?: string;
  millisecond?: boolean;
};

const CountDown: FC<CountDownProps> = (props) => {
  const {
    time = 0,
    format = 'HH:mm:ss',
    millisecond = false,
  } = props;

  const [remain, setRemain] = useState(+time);

  return (
    <View>
      <Text style={[styles.textTime]}>13:00:11</Text>
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
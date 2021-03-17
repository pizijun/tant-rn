import React, { FC, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableWithoutFeedback, NativeSyntheticEvent, TextInputFocusEventData, ColorValue } from "react-native";
import flexbem from '../Style/flexbem';

interface StepperProps {
  value?: string | number;
  min?: string | number;
  max?: string | number;
  disabled?: boolean;
  disableInput?: boolean;
  inputWidth?: number;
  disablePlus?: boolean;
  disableMinus?: boolean;
  onChange?: (value: number) => void;
};

const Stepper: FC<StepperProps> = (props) => {
  const {
    min = 0,
    max = 99,
    disabled = false,
    disablePlus = false,
    disableMinus = false,
    disableInput = false,
    inputWidth = 30,
    onChange,
  } = props;
  
  let value: string;
  if ('value' in props) {
    value = `${props.value}` || '0';
  } else {
    value = '0';
  }

  const [inputText, setInputText] = useState(value);
  const inputEl = useRef(null);

  useEffect(() => {
    setInputText(value);
  }, [value]);
  
  // text change
  const onChangeText = (text: string) => {
    setInputText(text);
    onChange && onChange(+text);
  };

  const handlePressMinus = () => {
    if (+inputText === 0) return;
    const nextVal = (+inputText) - 1;
    setInputText(`${nextVal}`);
    onChange && onChange(nextVal);
  };

  const handlePressPlus = () => {
    let nextVal = (+inputText) + 1;
    nextVal = isNaN(nextVal) ? 0 : nextVal;
    if (nextVal > max) return;

    setInputText(`${nextVal}`);
    onChange && onChange(nextVal);
  };

  return (
    <View style={[flexbem.flexRow]}>
      <TouchableWithoutFeedback onPress={handlePressMinus}>
        <View style={[styles.stepperMinus, styles.stepperButton, flexbem.flexCenter]}>
          <Image
            source={{uri: (+inputText) > min ? 'https://pizijun.github.io/images/icon-minus-active.png' : 'https://pizijun.github.io/images/icon-minus.png'}}
            style={{width: 9, height: 9}}
          />
        </View>
      </TouchableWithoutFeedback>
      <TextInput
        maxLength={3}
        keyboardType="number-pad"
        editable={!disableInput}
        style={[styles.stepperInput, {width: inputWidth}]}
        ref={inputEl}
        onChangeText={onChangeText}
        defaultValue={inputText}
      />
      <TouchableWithoutFeedback onPress={handlePressPlus}>
        <View style={[styles.stepperPlus, styles.stepperButton, flexbem.flexCenter]}>
          <Image
            source={{uri: (+inputText) >= max ? 'https://pizijun.github.io/images/icon-plus.png' : 'https://pizijun.github.io/images/icon-plus-active.png'}}
            style={{width: 9, height: 9}}
          />
        </View>
      </TouchableWithoutFeedback>

    </View>
  );
};

const styles = StyleSheet.create({
  stepper: {

  },
  stepperMinus: {
    borderRightWidth: 0,
  },
  stepperPlus: {
    borderLeftWidth: 0,
  },
  stepperButton: {
    width: 20,
    height: 20,
    backgroundColor: '#F3F3F5',
    borderWidth: 1,
    borderColor: '#D3D7E5',
  },
  stepperInput: {
    height: 20,
    padding: 0,
    textAlign: 'center',
    fontSize: 14,
    color: '#63687B',
    borderWidth: 1,
    borderColor: '#D3D7E5',
  },
});

export default Stepper;
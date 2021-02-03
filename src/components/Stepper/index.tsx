import React, { FC, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableWithoutFeedback, NativeSyntheticEvent, TextInputFocusEventData, ColorValue } from "react-native";
import flexbem from '../Style/flexbem';

interface StepperProps {
  value?: string;
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
    min = 1,
    max = 10,
    disabled = false,
    disablePlus = false,
    disableMinus = false,
    disableInput = false,
    inputWidth = 30,
    onChange,
  } = props;
  
  let value;
  if ('value' in props) {
    value = props.value || '0';
  } else {
    value = '0';
  }

  const [inputText, setInputText] = useState(value);
  const inputEl = useRef(null);


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
    const nextVal = (+inputText) + 1;
    setInputText(`${nextVal}`);
    onChange && onChange(nextVal);
  };

  return (
    <View style={[flexbem.flexRow]}>
      <TouchableWithoutFeedback onPress={handlePressMinus}>
        <View style={[styles.stepperMinus, styles.stepperButton, flexbem.flexCenter]}>
          <Image source={{uri: 'https://pizijun.github.io/images/icon-minus-active.png'}} style={{width: 9, height: 9}} />
          {/* disable <Image source={{uri: 'https://pizijun.github.io/images/icon-minus.png'}} style={{width: 15, height: 15}} /> */}
        </View>
      </TouchableWithoutFeedback>
      <TextInput
        maxLength={3}
        keyboardType="phone-pad"
        style={[styles.stepperInput, {width: inputWidth}]}
        ref={inputEl}
        onChangeText={onChangeText}
        value={inputText}
      />
      <TouchableWithoutFeedback onPress={handlePressPlus}>
        <View style={[styles.stepperPlus, styles.stepperButton, flexbem.flexCenter]}>
          <Image source={{uri: 'https://pizijun.github.io/images/icon-plus-active.png'}} style={{width: 9, height: 9}} />
          {/* <Image source={{uri: 'https://pizijun.github.io/images/icon-plus.png'}} style={{width: 9, height: 9}} /> */}
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
    textAlign: 'center',
    fontSize: 14,
    color: '#63687B',
    borderWidth: 1,
    borderColor: '#D3D7E5',
  },
});

export default Stepper;
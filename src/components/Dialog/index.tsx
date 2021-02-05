import React, { FC, isValidElement, ReactNode, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  TouchableHighlight,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Overlay, { OverlayProps } from '../Overlay';
import flexbem from '../Style/flexbem';


interface DialogProps extends OverlayProps {
  title?: string;
  message?: string | ReactNode;
  messageAlign?: 'left' | 'center' | 'right';
  confirmButtonText?: string;
  cancelButtonText?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  type?: 'alert' | 'prompt';
  placeholder?: string;
  inputValue?: string;
  onCancel?: (text?: string) => void;
  onConfirm?: (text?: string) => void;
};

const Dialog: FC<DialogProps> = (props) => {
  const {
    visible = false,
    title = '',
    message = '',
    messageAlign = 'left',
    confirmButtonText = '确认',
    cancelButtonText = '取消',
    showConfirmButton = true,
    showCancelButton = true,
    type = 'alert',
    placeholder = '',
    onCancel,
    onConfirm,
  } = props;

  let value;
  if ('inputValue' in props) {
    value = props.inputValue || '';
  } else {
    value = '';
  }

  const [inputText, setInputText] = useState(value);
  const inputEl = useRef(null);

  useEffect(() => {
    setInputText(value);
  }, [value])

  // input text change
  const onChangeText = (text: string) => {
    setInputText(text);
  };

  // 取消 action
  const handleOnCancel = () => {
    if (type === 'prompt') {
      onCancel && onCancel(inputText);
    } else {
      onCancel && onCancel();
    }
  };

  // 确认 action
  const handleOnConfirm = () => {
    if (type === 'prompt') {
      onConfirm && onConfirm(inputText);
    } else {
      onConfirm && onConfirm();
    }
  };

  return (
    <Overlay visible={visible} lock>
      <View style={[styles.dialog]}>
        <View style={[styles.dialogHead]}><Text style={[styles.textDialogHead]}>{title}</Text></View>
        <View style={[styles.dialogContent, {paddingTop: message ? (title ? 10 : 15) : 0}]}>
          {isValidElement(message) ? message : (
            <Text style={{textAlign: messageAlign, fontSize: title ? 14 : 16, color: title ? '#6E6A74' : '#2B282F'}}>{message}</Text>
          )}
          {type === 'prompt' ? (
            <View style={[{marginTop: 10}]}>
              <TextInput
                style={[styles.promptInput]}
                placeholderTextColor="#BFBAC7"
                placeholder={placeholder}
                onChangeText={onChangeText}
                clearButtonMode={'while-editing' }
                ref={inputEl}
                value={inputText}
              />
            </View>
          ) : null}
        </View>
        {showCancelButton || showConfirmButton ? (
          <View style={[styles.dialogFooter, flexbem.flexRow]}>
            {showCancelButton ? (
              <TouchableHighlight activeOpacity={0.5} underlayColor="#DEDEDE" style={[styles.btnDefault, flexbem.flexItem, flexbem.flexCenter]} onPress={handleOnCancel}>
                <View>
                  <Text style={[styles.textCancel]}>{cancelButtonText}</Text>
                </View>
              </TouchableHighlight>
            ) : null}
            {showConfirmButton ? (
              <TouchableHighlight activeOpacity={0.5} underlayColor="#DEDEDE" style={[styles.btnDefault, flexbem.flexItem, flexbem.flexCenter, {borderLeftWidth: showConfirmButton ? 1 : 0, borderLeftColor: '#E8E8E8'}]} onPress={handleOnConfirm}>
                <View>
                  <Text style={[styles.textConfirm]}>{confirmButtonText}</Text>
                </View>
              </TouchableHighlight>
            ) : null}
          </View>
        ) : null}
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: '#fff',
    borderRadius: 4,
    width: 270,
  },
  dialogHead: {
    paddingTop: 14,
  },
  textDialogHead: {
    fontSize: 16,
    color: '#2B282F',
    textAlign: 'center',
  },
  dialogContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  textMessage: {
    fontSize: 16,
    color: '#2B282F',
  },
  // button
  dialogFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  btnDefault: {
    height: 42,
  },
  textCancel: {
    fontSize: 14,
    color: '#AFACB2',
  },
  textConfirm: {
    fontSize: 14,
    color: '#5977FF',
  },
  // input
  promptInput: {
    fontSize: 14,
    paddingHorizontal: 6,
    height: 28,
    color: '#6E6A74',
    backgroundColor: '#FAFAFD'
  },
  borderRed: {
    borderWidth: 1,
    borderColor: 'red'
  },
  borderBlue: {
    borderWidth: 1,
    borderColor: 'blue'
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Dialog;
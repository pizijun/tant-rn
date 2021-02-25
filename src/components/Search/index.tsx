import React, { FC, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableWithoutFeedback, NativeSyntheticEvent, TextInputFocusEventData, ColorValue, TextInputComponent } from "react-native";
import flexbem from '../Style/flexbem';

interface RightIcon {
  uri: string;
  width: string | number;
  height: string | number;
};

interface SearchProps {
  value?: string;
  maxlength?: string | number;
  placeholder?: string;
  clearable?: boolean;
  disable?: boolean;
  rightIcon?: RightIcon;
  showAction?: boolean;
  cancelText?: string;
  center?: boolean;
  backgroundColor?: ColorValue;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onClear?: (value: string) => void;
  onCancel?: (value: string) => void;
  onPressRight?: (value: string) => void;
  onPressInput?: (value: string) => void;
};

const Search: FC<SearchProps> = (props) => {
  const {
    maxlength = -1,
    placeholder = '',
    clearable = true,
    disable = false,
    rightIcon,
    showAction = false,
    cancelText = '取消',
    center = false,
    backgroundColor = '#FAFAFC',
    onSearch,
    onChange,
    onFocus,
    onBlur,
    onClear,
    onCancel,
    onPressRight,
    onPressInput,
  } = props;
  
  let value: string;
  if ('value' in props) {
    value = props.value || '';
  } else {
    value = '';
  }

  const [inputText, setInputText] = useState(value);
  const inputEl = useRef<TextInput>(null!);

  useEffect(() => {
    setInputText(value);
  }, [value]);

  // 清空搜索
  const clearInputText = () => {
    setInputText('');
    inputEl.current.focus();
    onClear && onClear(inputText);
  };

  // blue 搜索框
  const onBlurInput = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur && onBlur(e);
  };

  // focus 搜索框
  const onFocusInput = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onFocus && onFocus(e);
  };

  // 点击 right icon
  const handlePressRightIcon = () => {
    onPressRight && onPressRight(inputText);
  };

  // 搜索
  const handleOnSubmit = () => {
    onSearch && onSearch(inputText);
  };

  // text change
  const onChangeText = (text: string) => {
    setInputText(text);
    onChange && onChange(text);
  };

  // 点击输入框
  const handlePressInput = () => {
    onPressInput && onPressInput(inputText);
  };

  return (
    <View style={[flexbem.flexRow, flexbem.flexYCenter]}>
      <View style={flexbem.flexItem}>
        <View style={[styles.nvSearchField, flexbem.flexRow, flexbem.flexYCenter, { backgroundColor: backgroundColor }, center && flexbem.flexCenter]}>
          <View style={[styles.nvSearchFieldLeftIcon]}>
            <Image source={{uri: 'https://pizijun.github.io/images/icon-search.png'}} style={{width: 15, height: 15}} />
          </View>
          <View style={[!center && flexbem.flexItem, !center && flexbem.flexRow, flexbem.flexYCenter, {minHeight: 25}]}>
            {disable ? (
              <TouchableWithoutFeedback onPress={handlePressInput}>
                <View style={[styles.nvSearchInput, flexbem.flexItem, flexbem.flexXCenter]}>
                  <Text style={[styles.textInputPlaceholder, {color: value ? '#333' : '#BFBAC7'}]}>{value || placeholder}</Text>
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <TextInput
                style={[styles.nvSearchInput, flexbem.flexItem, {textAlign: center ? 'center' : 'left'}]}
                ref={inputEl}
                placeholder={placeholder}
                placeholderTextColor="#BFBAC7"
                onChangeText={onChangeText}
                onBlur={onBlurInput}
                onFocus={onFocusInput}
                onSubmitEditing={handleOnSubmit}
                returnKeyType="search"
                value={inputText}
              />
            )}
            {clearable && inputText.length ? (
              <TouchableWithoutFeedback onPress={clearInputText}>
                <View style={styles.nvSearchClearIcon}>
                  <Image source={{uri: 'https://pizijun.github.io/images/icon-clear.png'}} style={{width: 15, height: 15}} />
                </View>
              </TouchableWithoutFeedback>
            ) : null}
            {rightIcon ? (
              <TouchableWithoutFeedback onPress={handlePressRightIcon}>
                <View style={[styles.nvSearchFieldRightIcon]}>
                  <Image source={{uri: rightIcon.uri}} style={{width: rightIcon.width, height: rightIcon.height}} />
                </View>
              </TouchableWithoutFeedback>
            ) : null}
          </View>
        </View>
      </View>
      {showAction ? (
        <View style={[styles.nvSearchAction]}>
          <Text style={styles.textAction}>{cancelText}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  nvSearchField: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    // backgroundColor: '#FAFAFC',
    borderRadius: 5,
  },
  nvSearchFieldLeftIcon: {
    marginRight: 5,
  },
  nvSearchInput: {
    fontSize: 13,
    padding: 0,
    height: 25,
    color: '#333',
  },
  nvSearchClearIcon: {
    paddingHorizontal: 5,
    paddingVertical: 6,
    marginVertical: -6,
  },
  nvSearchFieldRightIcon: {
    marginLeft: 8,
    paddingHorizontal: 5,
    marginRight: -5,
    paddingVertical: 6,
    marginVertical: -6,
  },
  nvSearchAction: {
    paddingHorizontal: 10,
  },
  textAction: {
    color: '#6E6A74',
    fontSize: 14,
  },
  textInputPlaceholder: {
    fontSize: 13,
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

export default Search;
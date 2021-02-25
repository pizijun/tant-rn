import React, { FC, useContext, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import flexbem from '../Style/flexbem';

interface RightIcon {
  uri: string;
  width: string | number;
  height: string | number;
};

interface NavBarProps {
  title?: string;
  border?: boolean;
  rightText?: string;
  rightIcon?: RightIcon;
  onPressRight?: () => void;
  onPressBack?: () => void;
};

const NavBar: FC<NavBarProps> = (props) => {
  const {
    title = '',
    rightText = '',
    border = false,
    rightIcon,
    onPressRight,
    onPressBack,
  } = props;

  const handlePressLeft = () => {
    if (onPressBack && typeof onPressBack === 'function') {
      onPressBack();
    }
  };

  const handlePressRight = () => {
    onPressRight && onPressRight();
  };

  return (
    <View style={[styles.navBar, flexbem.flexRow, flexbem.flexCenter, border && {borderBottomColor: '#E8E8E8', borderBottomWidth: StyleSheet.hairlineWidth}]}>
      <TouchableWithoutFeedback onPress={handlePressLeft}>
        <View style={[styles.navBarLeft, flexbem.flexCenter]}>
          <View>
            <Image source={{uri: 'https://pizijun.github.io/images/icon-back.png'}} style={{width: 18, height: 18}} />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={[styles.navBarTitle]}>
        <Text style={[styles.textTitle]} ellipsizeMode="tail" numberOfLines={1}>{title}</Text>
      </View>

      {rightText ? (
        <TouchableWithoutFeedback onPress={handlePressRight}>
          <View style={[styles.navBarRight, flexbem.flexCenter]}>
            <Text style={[styles.textRight]}>{rightText}</Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        rightIcon ? (
          <TouchableWithoutFeedback onPress={handlePressRight}>
            <View style={[styles.navBarRight, flexbem.flexCenter]}>
              <View>
                <Image source={{uri: rightIcon.uri}} style={{width: rightIcon.width, height: rightIcon.height }} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        ) : null
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#fff',
    height: 44,
    position: 'relative',
  },
  navBarLeft: {
    paddingLeft: 15,
    paddingRight: 12,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  navBarTitle: {
    maxWidth: '60%',
    width: '60%',
  },
  textTitle: {
    fontSize: 18,
    color: '#2B282F',
    textAlign: 'center',
  },
  navBarRight: {
    paddingLeft: 12,
    paddingRight: 15,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
  textRight: {
    fontSize: 15,
    color: '#5977FF',
  },
});

export default NavBar;
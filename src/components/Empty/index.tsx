import React, { Children, FC, ReactNode } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface emptyImage {
  uri: string;
  width?: string | number;
  height?: string | number;
};

interface EmptyProps {
  mainDescription?: string;
  subDescription?: string | ReactNode;
  icon?: emptyImage;
};

const Empty: FC<EmptyProps> = (props) => {
  const {
    mainDescription = '暂无数据',
    subDescription = '',
    icon = {
      uri: 'https://pizijun.github.io/images/empty-image.png',
      width: 208,
      height: 170,
    },
    children,
  } = props;

  return (
    <View style={[styles.empty]}>
      <View>
        <Image source={{uri: icon.uri}} style={{width: icon.width, height: icon.height}} />
      </View>
      <View style={styles.emptyDescWrap}>
        <Text style={styles.textMainDesc}>{mainDescription}</Text>
        <Text style={styles.textSubDesc}>{subDescription}</Text>
      </View>
      <View style={styles.emptyBottom}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyDescWrap: {
    marginTop: 10,
  },
  emptyBottom: {
    marginTop: 30,
  },
  textMainDesc: {
    fontSize: 16,
    color: '#605C67',
    textAlign: 'center',
  },
  textSubDesc: {
    fontSize: 13,
    color: '#8F8C96',
    textAlign: 'center',
    marginTop: 7,
  },
});

export default Empty;
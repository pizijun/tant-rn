import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface LoadingProps {
  text?: string;
};

const InfiniteLoading: FC<LoadingProps> = (props) => {
  const {
    text = ''
  } = props;

  return (
    <View style={styles.infiniteLoading}>
      <Text style={styles.textInfinite}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infiniteLoading: {
    padding: 12,
    textAlign: 'center',
  },
  textInfinite: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default InfiniteLoading;
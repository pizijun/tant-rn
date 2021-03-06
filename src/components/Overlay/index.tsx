import React, { FC } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Platform,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface OverlayProps {
  visible: boolean;
  lock?: boolean;
  backdropStyle?: StyleProp<ViewStyle>,
  onBackdropPress?: () => void;
};

const Overlay: FC<OverlayProps> = (props) => {
  const {
    visible = false,
    lock = false,
    children,
    backdropStyle,
    onBackdropPress,
  } = props;

  const handleTouchModal = () => {
    onBackdropPress && onBackdropPress();
  };

  const handleTouchOverlay = () => {
    if (!lock) {
      onBackdropPress && onBackdropPress();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleTouchModal}
    >
      <TouchableWithoutFeedback
        onPress={handleTouchOverlay}
        testID="RNE__Overlay__backdrop"
      >
        <View
          testID="backdrop"
          style={StyleSheet.flatten([styles.backdrop, backdropStyle])}
        />
      </TouchableWithoutFeedback>
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...Platform.select({
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: 'rgba(0, 0, 0, .3)',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
      },
    }),
  },
});

export default Overlay;
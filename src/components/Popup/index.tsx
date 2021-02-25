import React, { FC } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
} from 'react-native';
import Overlay, { OverlayProps } from '../Overlay';

type PopupPosition = 'center' | 'bottom' | 'top';

interface PopupProps extends OverlayProps {
  visible: boolean;
  position?: PopupPosition;
  customStyle?: StyleProp<ViewStyle>,
  onClose?: () => void;
};

const Popup: FC<PopupProps> = (props) => {
  const {
    visible = false,
    position = 'center',
    customStyle,
    onClose,
    children,
  } = props;

  const handlePressOverlay = () => {
    onClose?.();
  };

  return (
    <>
      <Overlay
        visible={visible}
        onBackdropPress={handlePressOverlay}
      >
        <View style={styles.container} pointerEvents="box-none">
          <KeyboardAvoidingView style={[styles.container, {width: '100%'}]} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View
              style={[
                styles.overlay,
                customStyle,
                position === 'top' && styles.positionTop,
                position === 'bottom' && styles.positionBottom,
              ]}
            >
              {children}
            </View>
          </KeyboardAvoidingView>
        </View>
      </Overlay>
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: '#fff',
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
  positionTop: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
  },
  positionBottom: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
  },
});

export default Popup;
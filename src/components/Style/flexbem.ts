import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  flexBetween: {
    justifyContent: 'space-between',
  },
  flexYCenter: {
    alignItems: 'center',
  },
  flexXCenter: {
    justifyContent: 'center',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexStretch: {
    alignSelf: 'stretch',
  },
  flexItem: {
    flex: 1,
  },
  flexXEnd: {
    justifyContent: 'flex-end',
  },
});

import React, { FC, useCallback, useRef, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions, StyleProp, TextStyle, ViewStyle, Animated, TouchableOpacity } from "react-native";
import flexbem from "../Style/flexbem";

const width = Dimensions.get('window').width;

interface TabData {
  key?: string;
  title: React.ReactNode;
  [key: string]: any;
};

interface TabsProps {
  tabs: TabData[];
  tabBarTextStyle?: StyleProp<TextStyle>;
  tabBarActiveTextColor?: string;
  tabBarInactiveTextColor?: string;
  tabBarBackgroundColor?: string;
  tabBarUnderlineStyle?: StyleProp<ViewStyle>;
  page?: number | string;
  onChange?: (tab: TabData, index: number) => void;
  onTabClick?: (tab: TabData, index: number) => void;
};

export const Tabs: FC<TabsProps> = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollTabBarEl = useRef(null);
  const scrollTabView = useRef(null);
  const swipeThreshold = 5;

  const {
    tabs,
    tabBarActiveTextColor = '#5977FF',
    tabBarInactiveTextColor = '#333',
    onChange = () => {},
    onTabClick,
    page = 0,
    children
  } = props;

  const canScroll = tabs.length > swipeThreshold;

  const handleOnPress = (index: number) => {
    onTabClick && onTabClick(tabs[index], index);
    goToTab(index);
  };

  const goToTab = (index: number) => {
    if (index === currentIndex) return;

    setCurrentIndex(index);
    requestAnimationFrame(() => {
      scrollTabView.current.scrollTo({
        x: index * width,
        y: 0,
        animated: true,
      });
    });
  };
  
  return (
    <View style={[flexbem.flexItem]}>
      <View>
        <ScrollView
          ref={scrollTabBarEl}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled
          bounces={false}
          scrollsToTop={false}
          scrollEnabled={canScroll}
          // keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          renderToHardwareTextureAndroid
          contentContainerStyle={[!canScroll && {flex: 1}]}
        >
          <View style={[!canScroll && {width: '100%'}]}>
            <View style={[flexbem.flexRow]}>
              {tabs.map((item, i) => (
                <TouchableOpacity key={i} style={[flexbem.flexItem, styles.tabItem, flexbem.flexXCenter, { paddingHorizontal: canScroll ? 12: 2}, currentIndex === i && {borderBottomWidth: 2, borderBottomColor: '#5977FF'}]} onPress={() => handleOnPress(i)}>
                  <View>
                    <Text style={[{color: currentIndex === i ? tabBarActiveTextColor : tabBarInactiveTextColor }, styles.textTab]}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            {/* <Animated.View style={styles.underline} /> */}
          </View>
        </ScrollView>
      </View>
      <View style={[{ flex: 1 }]}>
        <ScrollView
          ref={scrollTabView}
          onScrollEndDrag={() => {
          }}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            if (index !== currentIndex) {
              onChange(tabs[currentIndex], currentIndex);
            }
          }}
          onScroll={(data) => {
            let index = Math.round(data.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
          horizontal={true} pagingEnabled={true} contentContainerStyle={{ flexDirection: 'row' }} showsHorizontalScrollIndicator={false}>
          {(children || []).map((child, childIndex) => (
            <View key={childIndex} style={{ width: width }}>
              {child}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    height: 40,
  },
  textTab: {
    fontSize: 15,
    textAlign: 'center',
  },
  underline: {
    height: 2,
    backgroundColor: '#5977FF',
    width: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  borderRed: {
    borderWidth: 1,
    borderColor: 'red'
  },
  borderBlue: {
    borderWidth: 1,
    borderColor: 'blue'
  },
  selectedLine: {
    marginTop: 8,
    backgroundColor: '#5977FF',
    height: 2,
    width: '60%',
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexBetween: {
    justifyContent: 'space-between',
  },
  flexAround: {
    justifyContent: 'space-around',
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
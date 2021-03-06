import React, { FC, useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions, StyleProp, TextStyle, ViewStyle, Animated, TouchableOpacity, LayoutChangeEvent, TouchableWithoutFeedback, } from "react-native";
import { getRect } from "../../utils";
import flexbem from "../Style/flexbem";

const winWidth = Dimensions.get('window').width;

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
  const [containerWidth, setContainerWidth] = useState(winWidth);
  const scrollTabBarEl = useRef(null);
  const scrollTabView = useRef(null);
  const scrollbarWrapEl = useRef(null);

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

  // tab click
  const handleOnPress = (index: number) => {
    onTabClick && onTabClick(tabs[index], index);
    goToTab(index);
  };

  const goToTab = (index: number) => {
    if (index === currentIndex) return;

    requestAnimationFrame(() => {
      scrollTabView.current.scrollTo({
        x: index * containerWidth,
        y: 0,
        animated: true,
      });
    });
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    if (Math.round(width) !== Math.round(containerWidth)) {
      setContainerWidth(width);
    }

    requestAnimationFrame(() => {
      scrollTabView.current.scrollTo({
        x: currentIndex * width,
        y: 0,
        animated: false,
      });
    });
  };

  const getAllRect = (nodes: any[]) => {
    return Promise.all(nodes.map(node => getRect(node)));
  };

  // scroll tab bar into view
  const scrollIntoView = (currentIndex: number) => {
    Promise.all([getAllRect(scrollbarWrapEl.current._children), getRect(scrollTabBarEl.current)]).then(([tabbarItemRects, scrollbarRect]) => {
      const tabRect = tabbarItemRects[currentIndex];
      const offsetLeft = tabbarItemRects.slice(0, currentIndex).reduce((prev, cur) => prev + cur.width, 0);
      requestAnimationFrame(() => {
        scrollTabBarEl.current.scrollTo({
          x: offsetLeft - (scrollbarRect.width - tabRect.width) / 2,
          y: 0,
          animated: true,
        });
      });
    });
  };

  useEffect(() => {
    setCurrentIndex(+page);
    requestAnimationFrame(() => {
      scrollIntoView(+page);
    });
  }, [page]);

  return (
    <View style={[flexbem.flexItem]} onLayout={handleLayout}>
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
            <View style={[flexbem.flexRow]} ref={scrollbarWrapEl}>
              {tabs.map((item, i) => (
                <TouchableOpacity key={i} activeOpacity={1} style={[flexbem.flexItem, styles.tabItem, flexbem.flexXCenter, { paddingHorizontal: canScroll ? 12: 2}, currentIndex === i && {borderBottomWidth: 2, borderBottomColor: '#5977FF'}, canScroll && {minWidth: 50, maxWidth: 140}]} onPress={() => handleOnPress(i)}>
                  <View>
                    <Text style={[{color: currentIndex === i ? tabBarActiveTextColor : tabBarInactiveTextColor }, styles.textTab]} ellipsizeMode="tail" numberOfLines={1}>{item.title}</Text>
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
          onScroll={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / containerWidth);
            if (index !== currentIndex) {
              onChange(tabs[currentIndex], currentIndex);
            }
            setCurrentIndex(index);
            scrollIntoView(index);
          }}
          horizontal={true} pagingEnabled={true} contentContainerStyle={{ flexDirection: 'row' }} showsHorizontalScrollIndicator={false}>
          {(children || []).map((child, childIndex) => (
            <View key={childIndex} style={{ width: containerWidth }}>
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
});

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import NewsItem from '../components/NewsItem';
import { useAppSelector } from '../redux/hooks';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Bookmarks = () => {
  const bookmarks = useAppSelector((state) => state.bookmarks.bookmarks);

  const renderItem = ({ item }: any) => (
    <NewsItem
      article={item}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundColor,
  },
});

export default Bookmarks;
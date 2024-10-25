import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import NewsItem from '../components/NewsItem';
import { useAppSelector } from '../redux/hooks';
import Colors from '../style/colours';
import { fontScale, hp } from '../style/styles';

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
        ListEmptyComponent={<Text style={styles.empatyText}>
          No BookMark Found!
        </Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundColor,
  },
  empatyText:{
    fontSize:fontScale(20),
    fontWeight:'bold',
    color:Colors.LightGray,
    textAlign:'center',
    marginTop:hp(5)
  }
});

export default Bookmarks;

import React  from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useAppDispatch,useAppSelector } from '../redux/hooks';
import { toggleBookmark } from '../store/bookmarkSlice';
import { fontScale, hp, wp } from '../style/styles';
import Colors from '../style/colours';

interface NewsItemProps {
  article: {
    source: { id: string | null; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
  };
}

const NewsItem: React.FC<NewsItemProps> = ({ article }) => {
  const dispatch = useAppDispatch();

  const isBookmarked = useAppSelector(state =>
    state.bookmarks.bookmarks.some(item => item.url === article.url)
  );

  const handleBookmarkToggle = () => {
    dispatch(toggleBookmark(article));
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBookmarkToggle} style={styles.bookmarkButton}>
        <Icon name={isBookmarked ? 'bookmark' : 'bookmark-o'} size={20} color="#e91e63" /> 
      </TouchableOpacity>
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      )}
      <Text style={styles.name}>{article.source?.name}</Text>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.description}>{article.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(1.5),
    marginHorizontal: hp(1),
    padding: hp(1),
    backgroundColor: Colors.White,
    borderRadius: wp(1.4),
    shadowColor: Colors.Black, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    shadowOffset: { width: 0, height: 2 }, 
    elevation: 4, 
  },
  image: {
    width: '100%',
    height: hp(22),
    borderRadius: wp(1.3),
  },
  name: {
    fontSize: fontScale(20),
    fontWeight: 'bold',
    marginTop: hp(1),
    color:Colors.Black
  },
  title: {
    fontSize: fontScale(16),
    fontWeight: 'bold',
  },
  description: {
    fontSize: fontScale(14),
    color: Colors.DarkGray,
    marginTop: 5,
  },
  bookmarkButton: {
    position: 'absolute',
    backgroundColor:'black',
    borderRadius:hp(2),
    height:hp(4),
    width:hp(4),
    alignItems:'center',
    justifyContent:'center',
    top: wp(2),
    right: wp(2),
    zIndex:10,
    margin:wp(1)
  },
});

export default NewsItem;

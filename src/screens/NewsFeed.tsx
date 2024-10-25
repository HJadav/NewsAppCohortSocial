import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, Text, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, incrementPage, resetNews } from '../store/newsSlice';
import { RootState } from '../store';
import NewsItem from '../components/NewsItem';
import Loader from '../components/Loader';
import Colors from '../style/colours';
import { fontScale, hp, wp } from '../style/styles';

const INITIAL_PAGE = 1;
const ON_END_REACHED_THRESHOLD = 0.5;

const NewsFeed: React.FC = () => {
  const dispatch = useDispatch();
  const { articles, loading, page, error } = useSelector((state: RootState) => state.news);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');



  useEffect(() => {
    dispatch(resetNews());
    dispatch(fetchNews({ category: 'general', page: INITIAL_PAGE }) as any);
  }, [dispatch]);

  const loadMore = useCallback(async () => {
    if (!loading && !loadingMore && hasMore) {
      setLoadingMore(true);
      dispatch(incrementPage());
      const response = await dispatch(fetchNews({ category: 'general', page: page + 1 }) as any);

      if (response.payload && response.payload.length === 0) {
        setHasMore(false);
      }
      setLoadingMore(false);
    }
  }, [dispatch, loading, loadingMore, page, hasMore]);

  const onRefresh = useCallback(() => {
    dispatch(resetNews());
    dispatch(fetchNews({ category: 'general', page: INITIAL_PAGE }) as any);
    setHasMore(true);
  }, [dispatch]);

  const articlesData = articles?.filter(item => 
    item.source?.id && item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];
  

  const renderItem = ({ item }: { item: any }) => <NewsItem article={item} />;

  return (
    <View style={styles.container}>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      {loading && page === INITIAL_PAGE ? (
        <Loader />
      ) : (
        <>
          <TextInput
            style={styles.searchInput}
            placeholder="Search articles..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <FlatList
            data={articlesData}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item) => item.url}
            onEndReached={loadMore}
            onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
            refreshControl={
              <RefreshControl refreshing={loading && page === INITIAL_PAGE} onRefresh={onRefresh} />
            }
            ListFooterComponent={loadingMore ? <Loader /> : null}
          />
        </>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundColor,
    marginBottom: hp(7),
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: wp(2),
    fontSize: fontScale(16),
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: wp(2),
    paddingHorizontal: wp(2),
  },
});

export default NewsFeed;

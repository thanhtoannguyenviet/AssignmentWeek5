import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import FeedItem from './components/FeedItem'
const Url_API = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=b37b172467b24c5abc3f71b401c31513&page='
export default class App extends Component {
  state = {
    isLoading: false,
    listArticle: [],
    totalArticle: 0,
    lastPageReached: false,
    page: 1
  }
  componentDidMount = async () => {
    this.setState({ isLoading: true })
    this.callApi()
  }
  callApi = async () => {
    const { page, listArticle } = this.state;
    const response = await fetch(Url_API + page);
    console.log(Url_API + page)
    const jsonResponse = await response.json();
    const hasMoreArticles = jsonResponse.articles.length > 0;
    if (hasMoreArticles) {
      this.setState({
        isLoading: false,
        listArticle: listArticle.concat(jsonResponse.articles),
        totalArticle: jsonResponse.totalResults,
        page
      })
    }
    else this.setState({ lastPageReached: true });
  }
  LoadOldNews = async () => {
    const { page } = this.state;
    this.setState({ page: page + 1 }, () => {
      this.callApi()
    })
  }
  renderItem = ({ item }) => {
    return <FeedItem item={item} />
  }
  refeshNews = async () => {
    await this.setState({ listArticle: [], page: 1 })
    this.callApi();
  }
  renderFooter = () => {
    const { lastPageReached, isLoading } = this.state;
    if (lastPageReached) return (<Text>No more articles</Text>) 
    else
      return (<ActivityIndicator
        size="large"
        amimating={isLoading}
      />)

  }
  render() {
    const { isLoading, listArticle, totalArticle } = this.state

    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="red" animating={isLoading} />
        </View>)
    }
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Articles Count:</Text>
          <Text style={styles.info}>{totalArticle}</Text>
        </View>
        <View>
          <FlatList data={listArticle}
            renderItem={this.renderItem}
            keyExtractor={item => item.title}
            onEndReached={this.LoadOldNews}
            onEndReachedThreshold={0.01}
            onRefresh={this.refeshNews}
            refreshing={false}
            ListFooterComponent={this.renderFooter} />
        </View>
        <View style={styles.footer}></View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  flatlist: {
    justifyContent: 'center',
    paddingBottom: 40
  },
  row: {
    flexDirection: 'row',
    height: 130,
    paddingTop: 100,
  }, label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    color: 'grey'
  },
  footer: {
    flex:0.2
  }
});


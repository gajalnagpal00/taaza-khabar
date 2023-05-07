import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  // static PropTypes = {
  //   country: PropTypes.string,
  //   pageSize: PropTypes.number
  // }

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizefn = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    // this.setState({
    //   // page: this.state.page-1,
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   // loading: false
    // });
    window.scrollTo(0,0);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizefn(props.category)} - Taaza Khabar`
    fetchNews();
    //eslint-disable-next-line
  }, [])

  // async componentDidMount(){
  //   // let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7e4594151caf450ebb3a931eaf02ac9e&pageSize=${props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
  //   this.fetchNews();
  // }

  // handlePrevClick = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7e4594151caf450ebb3a931eaf02ac9e&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   await this.setState({
  //     page: this.state.page-1,
  //     // articles: parsedData.articles
  //   });
  //   this.fetchNews();
  // }

  // handleNextClick = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7e4594151caf450ebb3a931eaf02ac9e&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   await this.setState({
  //     page: this.state.page+1,
  //     // articles: parsedData.articles
  //   });
  //   this.fetchNews();
  // }

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    // this.setState({page: this.state.page+1});
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    // await this.setState({
    //   articles: this.state.articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    // });
  };

    return (
      <>
        <h2 className = "text-center" style={{marginTop: '70px'}}>Latest {capitalizefn(props.category)} News</h2>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                        <NewsItem
                          newsurl={element.url}
                          title={element.title?element.title.slice(0, 60)+' ...':""}
                          desc={element.description?element.description.slice(0, 90)+' ...' : ""}
                          url={element.urlToImage?element.urlToImage: "https://www.macmillandictionary.com/external/slideshow/thumb/Grey_thumb.png"}
                          author={element.author}
                          date={new Date(element.publishedAt).toGMTString()}
                          source={element.source.name}
                        />
                      </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="contain d-flex justify-content-between">
          <button type="button" className="btn btn-dark" onClick = {this.handlePrevClick} disabled = {this.state.page <= 1}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" onClick = {this.handleNextClick} disabled = {this.state.page * props.pageSize >= this.state.totalResults}>Next &rarr;</button>
        </div> */}
      </>
    );
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

News.defaultProps = {
  country: "in",
  pageSize: 12,
  category: "general"
}


export default News;

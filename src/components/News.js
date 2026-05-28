import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export default class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:5,
    category:'general'
  }

  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  constructor(){
      super();
      this.state={
        articles:[],
        loading:false,
        page:1
      }
  }
  parsedArticles=0;

  async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&business&apiKey=f76ed319480447a6b279d83dc95f64f8&pageSize=${this.props.pageSize}`;
    let data= await fetch(url);
    let parsedData=await data.json();
    console.log("first time total result ", parsedData.totalResults," total article: ",parsedData.articles.length)
    this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults})
    // console.log(this.state.articles.length);
    // console.log(parsedData)
  }

  handlePreviousClick = async()=>{
    let nextPage = this.state.page - 1;
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&business&apiKey=f76ed319480447a6b279d83dc95f64f8&page=${nextPage}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData=await data.json();
    console.log("Previous click time total result ", parsedData.totalResults," total article: ",parsedData.articles.length)
    this.setState({
      page:nextPage,
      articles:parsedData.articles,
      loading:false
    })
  }

  handleNextClick = async()=>{
    console.log(this.state.page + 1," comparision ",Math.ceil(this.state.totalResults/20))
    
    if(!(this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize))){
          let nextPage = this.state.page + 1;
          let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&business&apiKey=f76ed319480447a6b279d83dc95f64f8&page=${nextPage}&pageSize=${this.props.pageSize}`;
          this.setState({loading:true})
          let data= await fetch(url);
          let parsedData=await data.json();
          console.log("next click time total result ", parsedData.totalResults," total article: ",parsedData.articles.length)
          this.setState({
            page:nextPage,
            articles:parsedData.articles,
            loading:false
          })
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  }

  render() {
    return (
      <div className='container my-3'>
        <h2>News Chunk -Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row ">
          {!this.state.loading && this.state.articles.map((element)=>
            <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage?element.urlToImage:"/../OIP.jpg"} newsUrl={element.url} authorr={element.author} dateeco={element.publishedAt}  />
            </div>  
            )
          }
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark " onClick={this.handlePreviousClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark " onClick={this.handleNextClick}> Next &rarr;</button>   
        </div>
      </div>
    )
  }
}


// disabled={this.state.page >=4}

import React from 'react'

const NewsItem = (props) => {
  const {title, desc, url, newsurl, author, date, source} = props;
  return (
      <div className="card my-2" >
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
        }}>
          <span className="badge round-pill bg-danger">{source}</span>
        </div>
        <img style={{height: '160px'}} src={url} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{desc}</p>
          <p className="card-text"><small className="text-muted">By {author} on {date}</small></p>
          <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
        </div>
      </div>
  )
}

export default NewsItem

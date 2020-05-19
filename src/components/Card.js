import React from 'react'
import { Link } from 'react-router-dom'
import places from '../data/places.json'
import { getWordByLocale } from '../locale'


export const Card = props => {

  const bookCover = props.book.isNew ? props.image : require('../assets/images/' + props.image)

  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{props.book.name[props.currentLocale]}</h5>
            <p className="card-text">{props.book.author[props.currentLocale]}</p>
            <p className="card-text"><small className="text-muted">
              { getWordByLocale('yearBookPublic', props.currentLocale) }
              {props.book.year}</small></p>
            <p className="card-text">
              { getWordByLocale('bookPlace', props.currentLocale) }
              {places[props.book.place].name[props.currentLocale]}</p>
            <Link to={"/books/" + props.book.id} >
              { getWordByLocale('more', props.currentLocale) }
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <img src={bookCover} className="card-img" alt="Book" />
        </div>
      </div>
    </div>
  )
}

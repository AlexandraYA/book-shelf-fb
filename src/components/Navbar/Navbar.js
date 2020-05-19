import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IconSignOut, IconSignIn } from '../UI/icons'
import { getWordByLocale } from '../../locale'
import classes from './Navbar.module.css'


export const Navbar = props => {

  const [openNav, setOpenNav] = useState(false)
  const cls = ["position-fixed", "navbar-dark", "bg-dark", classes.Navbar]
  const clsOF = [classes.overflow]

  const toggleNav = () => {
    setOpenNav(!openNav)
  }

  const mediaQueryLists = {}
  let closeNavbar = false
  const queries = {
    md: '(max-width: 768px)'
  }

  if (window && window.matchMedia) {
    mediaQueryLists.md = window.matchMedia(queries.md)
    closeNavbar = mediaQueryLists.md.matches
  }

  if (closeNavbar) {

    if (openNav) {
      cls.push(classes.open)
      clsOF.push(classes.show)
    }

    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <div className="navbar-brand">
            { getWordByLocale('siteName', props.currentLocale) }
          </div>

          <button
            className="navbar-toggler ml-md-auto"
            type="button"
            onClick={toggleNav}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
        <div className={cls.join(' ')}>
          <div className="navbar-brand p-4">
            { getWordByLocale('siteName', props.currentLocale) }
          </div>
          <ul className="navbar-nav pb-4">
            <li className="nav-item">
              <NavLink to="/" exact className="nav-link pl-4">
                { getWordByLocale('menuAllBooks', props.currentLocale) }
              </NavLink>
            </li>
            { props.isAuth
              ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/create" className="nav-link pl-4">
                      { getWordByLocale('menuAddBook', props.currentLocale) }
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/books" className="nav-link pl-4">
                      { getWordByLocale('menuManagement', props.currentLocale) }
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/places" className="nav-link pl-4">
                      { getWordByLocale('menuFields', props.currentLocale) }
                    </NavLink>
                  </li>
                </>
              )
              : null
            }
            <li>
              <button
                type="button"
                className="btn btn btn-outline-warning rounded-circle ml-4"
                onClick={props.changeLocaleHandle}
              >
                { getWordByLocale('locale', props.currentLocale) }
              </button>
            </li>
            <li className="nav-item">
              { props.isAuth
                ? <span onClick={props.logoutHandler} className="nav-link pl-4">
                  { getWordByLocale('menuExit', props.currentLocale) }
                </span>
                : <NavLink to={'/auth'} className="nav-link pl-4">
                  { getWordByLocale('loginButton', props.currentLocale) }
                </NavLink>
              }
            </li>
          </ul>
        </div>
        <div
          className={clsOF.join(' ')}
          onClick={toggleNav}
        ></div>
      </div>
    )
  } else {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="navbar-brand">
          { getWordByLocale('siteName', props.currentLocale) }
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/" exact className="nav-link">
              { getWordByLocale('menuAllBooks', props.currentLocale) }
            </NavLink>
          </li>
          { props.isAuth
            ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/create" className="nav-link">
                      { getWordByLocale('menuAddBook', props.currentLocale) }
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/books" className="nav-link">
                      { getWordByLocale('menuManagement', props.currentLocale) }
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/places" className="nav-link">
                      { getWordByLocale('menuFields', props.currentLocale) }
                    </NavLink>
                  </li>
                </>
            )
            : null
          }
        </ul>
        <ul className="navbar-nav ml-md-auto">
          <li>
            <button
              type="button"
              className="btn btn btn-outline-warning rounded-circle mr-4"
              onClick={props.changeLocaleHandle}
            >
              { getWordByLocale('locale', props.currentLocale) }
            </button>
          </li>
          <li>
            { props.isAuth
              ? <span onClick={props.logoutHandler} className="nav-link cursor-pointer">
                <IconSignOut />
              </span>
              : <NavLink to={'/auth'} className="nav-link pl-4">
                <IconSignIn />
              </NavLink>
            }
          </li>
        </ul>
      </nav>
    )
  }
}
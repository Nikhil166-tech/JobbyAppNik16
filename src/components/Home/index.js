import {Component} from 'react'
import Header from '../Header'
import {Link} from 'react-router-dom'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="home">
          <div>
            <h1 className="heading">Find The Job That Fits Your Life</h1>
            <p className="description">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <Link to="/jobs">
              <button type="button" className="button2">
                Find Jobs
              </button>
            </Link>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/home-lg-bg.png"
            className="home-img"
          />
        </div>
      </div>
    )
  }
}

export default Home

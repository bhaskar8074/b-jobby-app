import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="paragraph">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button">Find Jobs</button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home

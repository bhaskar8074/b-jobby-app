import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData

  return (
    <li className="job-item-container">
      <Link to={`/jobs/${id}`} style={{textDecoration: 'none'}}>
        <div className="job-first-container">
          <div className="img-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="title-heading">{title}</h1>
              <div className="star-rating-container">
                <AiFillStar className="star-icon" />
                <div>
                  <p className="rating-text">{rating}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="l-j-p-container">
            <div className="l-j-container">
              <div className="location-icon-location-container">
                <MdLocationOn className="location-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="employment-type-icon-employment-type-container">
                <BsFillBriefcaseFill color="white" size="30px" />
                <p className="job-type">{employmentType}</p>
              </div>
            </div>

            <p className="package">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="item-hr-line" />
        <div className="second-part-container">
          <h1 className="description-heading">Description</h1>
          <p className="description-para">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    similarJobDetails: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobDetailsResponse = await fetch(jobDetailsUrl, options)
    if (jobDetailsResponse.ok) {
      const jobDetailsData = await jobDetailsResponse.json()
      const jobDetails = jobDetailsData.job_details
      const similarJobs = jobDetailsData.similar_jobs
      console.log(similarJobs)
      const updateSimilarJobs = similarJobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: jobDetails.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(updateSimilarJobs)
      console.log(jobDetails)
      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        location: jobDetails.location,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
        skills: jobDetails.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
      }

      console.log(updatedJobDetails)
      this.setState({
        jobDetails: updatedJobDetails,
        similarJobDetails: updateSimilarJobs,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  renderJobDetailsSuccessView = () => {
    const {jobDetails, similarJobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails
    return (
      <>
        <div className="job-details-container">
          <div className="first-part-container">
            <div className="img-title-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div>
                <h1 className="title">{title}</h1>
                <div className="ratingContainer">
                  <AiFillStar color="gold" size="30px" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-internship-lpa-container">
              <div className="location-jobtype-container">
                <div className="location-container">
                  <MdLocationOn color="white" size="30px" />
                  <p className="location">{location}</p>
                </div>
                <div className="location-container">
                  <BsFillBriefcaseFill color="white" size="30px" />
                  <p className="employment">{employmentType}</p>
                </div>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div className="second-part-container">
            <div className="description-container">
              <h1 className="description-heading">Description</h1>
              <div>
                <a href={companyWebsiteUrl} className="visit">
                  Visit
                </a>
                <BsBoxArrowUpRight className="arrow" />
              </div>
            </div>
            <p className="description">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1 className="skill-heading">Skills</h1>
            <ul className="skills-ul-container">
              {skills.map(eachItem => (
                <li className="list-item" key={eachItem.name}>
                  <div className="list-container">
                    <img
                      src={eachItem.imageUrl}
                      alt={eachItem.name}
                      className="skill-img"
                    />
                    <p className="skill">{eachItem.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <h1 className="life-at-company-heading">Life at company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
        <h1 className="heading">Similar jobs</h1>
        <div>
          <ul className="similar-ul-list">
            {similarJobDetails.map(eachItem => (
              <li className="similar-job-list" key={eachItem.id}>
                <SimilarJobItem key={eachItem.id} jobItemDetails={eachItem} />
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="job-details-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRetryJobDetailsAgain = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="job-details-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for.</p>
      <div className="btn-container-failure">
        <button
          className="failure-jod-details-btn"
          type="button"
          onClick={this.onRetryJobDetailsAgain}
        >
          retry
        </button>
      </div>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-view-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobDetails

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiJobsStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const failureImg = 'https://assets.ccbp.in/frontend/react-js/failure-img.png'
class Job extends Component {
  state = {
    profileInformation: [],
    jobsInformation: [],
    checkBoxInputs: [],
    radioInput: '',
    searchInput: '',
    apiStatus: apiJobsStatusConstants.initial,
    apiJobsStatus: apiJobsStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiJobsStatus: apiJobsStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, radioInput, checkBoxInputs} = this.state
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxInputs}&minimum_package=${radioInput}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobsResponse = await fetch(jobsApiUrl, options)
    if (jobsResponse.ok) {
      const fetchedJobsData = await jobsResponse.json()
      console.log(fetchedJobsData)
      const updatedDataJobs = fetchedJobsData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(updatedDataJobs)
      this.setState({
        jobsInformation: updatedDataJobs,
        apiJobsStatus: apiJobsStatusConstants.success,
      })
    } else {
      this.setState({
        apiJobsStatus: apiJobsStatusConstants.failure,
      })
    }
  }

  getProfileData = async () => {
    this.setState({
      apiStatus: apiJobsStatusConstants.inProgress,
    })
    this.setState({apiStatus: apiJobsStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const ProfileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const profileResponse = await fetch(ProfileApiUrl, options)
    console.log(profileResponse)
    if (profileResponse.ok) {
      const fetchProfileData = await profileResponse.json()
      console.log(fetchProfileData)
      const updatedProfileData = {
        name: fetchProfileData.profile_details.name,
        profileImageUrl: fetchProfileData.profile_details.profile_image_url,
        shortBio: fetchProfileData.profile_details.short_bio,
      }
      this.setState({
        profileInformation: updatedProfileData,
        apiStatus: apiJobsStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiJobsStatusConstants.failure,
      })
    }
  }

  getProfileView = () => {
    const {profileInformation, apiStatus} = this.state
    if (apiStatus === apiJobsStatusConstants.success) {
      const {name, profileImageUrl, shortBio} = profileInformation
      console.log(profileImageUrl)
      return (
        <div className="profile-container">
          <img src={profileImageUrl} className="profile-icon" alt="profile" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-description">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  renderProfileFailureView = () => (
    <div className="profile-failure-btn-container">
      <button type="button" onClick={this.getProfileData}>
        Retry
      </button>
    </div>
  )

  renderProfileLoader = () => (
    <div className="profile-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getJobsView = () => {
    const {jobsInformation} = this.state
    const noJobs = jobsInformation.length === 0
    return noJobs ? (
      <div className="no-jobs-found-container">
        <img
          className="no-jobs-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters
        </p>
        <button type="button" onClick={this.getJobsData}>
          Retry
        </button>
      </div>
    ) : (
      <ul className="ul-job-items-container">
        {jobsInformation.map(eachItem => (
          <JobItem key={eachItem.id} jobData={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoaderView = () => (
    <div className="jobs-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onRetryJobs = () => {
    this.getJobsData()
  }

  renderFailureView = () => (
    <div className="jobs-failure-container">
      <img className="failure-img" src={failureImg} alt="failure view" />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph">
        we cannot seem to find the page you are looking for
      </p>
      <div className="jobs-failure-button-container">
        <button
          className="failure-button"
          type="button"
          onClick={this.onRetryJobs}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderJobsContainer = () => {
    const {apiJobsStatus} = this.state

    switch (apiJobsStatus) {
      case apiJobsStatusConstants.success:
        return this.getJobsView()
      case apiJobsStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiJobsStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderProfileStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiJobsStatusConstants.success:
        return this.getProfileView()
      case apiJobsStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiJobsStatusConstants.inProgress:
        return this.renderProfileLoader()
      default:
        return null
    }
  }

  onGetInputOption = event => {
    const {checkBoxInputs} = this.state
    const isClickedTwiceCount = checkBoxInputs.filter(
      eachItem => eachItem === event.target.id,
    )
    if (isClickedTwiceCount.length === 0) {
      this.setState(
        prevState => ({
          checkBoxInputs: [...prevState.checkBoxInputs, event.target.id],
        }),
        this.getJobsData,
      )
    } else {
      const filteredData = checkBoxInputs.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState({checkBoxInputs: filteredData}, this.getJobsData)
    }
  }

  getCheckBoxesView = () => (
    <ul>
      {employmentTypesList.map(eachItem => (
        <li className="li-container" key={eachItem.employmentTypeId}>
          <input
            className="input"
            id={eachItem.employmentTypeId}
            type="checkbox"
            onChange={this.onGetInputOption}
          />
          <label className="label" htmlFor={eachItem.employmentTypeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetRadioOption = event => {
    this.setState({radioInput: event.target.id}, this.getJobsData)
  }

  getRadioButtonFilter = () => (
    <ul className="radio-button-container">
      {salaryRangesList.map(eachItem => (
        <li className="li-container" key={eachItem.salaryRangeId}>
          <input
            className="radio"
            id={eachItem.salaryRangeId}
            type="radio"
            name="option"
            onChange={this.onGetRadioOption}
          />
          <label className="label" htmlFor={eachItem.salaryRangeId}>
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onKeyDownEnter = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  render() {
    const {searchInput, checkBoxInputs} = this.state
    console.log(checkBoxInputs)
    return (
      <>
        <Header />
        <div className="all-jobs-container">
          <div className="sidebar-container">
            {this.renderProfileStatus()}
            <hr className="hr-line" />
            <h1 className="text">Type of Employment</h1>
            {this.getCheckBoxesView()}
            <h1 className="text">Salary Range</h1>
            {this.getRadioButtonFilter()}
          </div>
          <div className="jobs-container">
            <div className="input-search">
              <input
                type="search"
                value={searchInput}
                className="search-input"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onKeyDownEnter}
              />
              <button
                className="search-button"
                data-testid="searchButton"
                type="button"
                onClick={this.getJobsData}
              >
                <BsSearch size="25" />
              </button>
            </div>
            {this.renderJobsContainer()}
          </div>
        </div>
      </>
    )
  }
}

export default Job

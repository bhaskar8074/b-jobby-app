import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobItem = props => {
  const {jobItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobItemDetails
  return (
    <>
      <div className="img-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="description-heading">Description</h1>
      <p className="description">{jobDescription}</p>
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
    </>
  )
}

export default SimilarJobItem

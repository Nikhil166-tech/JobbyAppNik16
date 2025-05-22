import './index.css'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

const SimilarJobs = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    employmentType,
    location,
    jobDescription,
  } = jobDetails
  return (
    <li className="list-items3">
      <div className="jobs-structure">
        <div className="about-company">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="title">{title}</h1>
            <div className="rating-ctn">
              <BsStarFill className="star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-ctn">
          <div className="location-ctn1">
            <MdLocationOn className="icons" />
            <p>{location}</p>
          </div>
          <div className="location-ctn1">
            <BsFillBriefcaseFill className="icons" />
            <p>{employmentType}</p>
          </div>
        </div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
    </li>
  )
}

export default SimilarJobs

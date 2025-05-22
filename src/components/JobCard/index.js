import './index.css'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {Link} from 'react-router-dom'
const JobCard = props => {
  const {jobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobsData

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="list-items2">
        <div className="jobs-structure">
          <div className="about-company">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="tsp-ctn">
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
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr />
        </div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard

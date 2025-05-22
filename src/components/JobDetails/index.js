import {Component} from 'react'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDataDetails: [],
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async props => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const optionJobData = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseJobsData = await fetch(jobDetailsApiUrl, optionJobData)
    if (responseJobsData.ok === true) {
      const fetchedJobData = await responseJobsData.json()
      console.log(fetchedJobData)
      const updatedJobsData = [fetchedJobData.job_details].map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        companyWebsiteUrl: eachItem.company_website_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        lifeAtCompany: {
          description: eachItem.life_at_company.description,
          imageUrl: eachItem.life_at_company.image_url,
        },
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        skills: eachItem.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: eachItem.title,
      }))

      const updatedSimilarJobsData = fetchedJobData.similar_jobs.map(
        eachItem => ({
          id: eachItem.id, // added
          title: eachItem.title, // added
          rating: eachItem.rating, // added
          location: eachItem.location, // added
          employmentType: eachItem.employment_type, // added
          jobDescription: eachItem.job_description,
          companyLogoUrl: eachItem.company_logo_url,
        }),
      )
      this.setState({
        jobDataDetails: updatedJobsData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsView = () => {
    const {jobDataDetails, similarJobsData} = this.state
    if (jobDataDetails.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        id,
        rating,
        jobDescription,
        location,
        lifeAtCompany,
        packagePerAnnum,
        title,
        skills,
      } = jobDataDetails[0]
      return (
        <>
          <div className='bg-card'>
            <div>
              <div className='about-company'>
                <img
                  src={companyLogoUrl}
                  alt='company logo'
                  className='company-logo'
                />
                <div className='tsp-ctn'>
                  <h1 className='title1'>{title}</h1>
                  <div className='rating-ctn'>
                    <BsStarFill className='star' />
                    <p>{rating}</p>
                  </div>
                </div>
              </div>
              <div className='location-ctn'>
                <div className='location-ctn1'>
                  <MdLocationOn className='icons' />
                  <p>{location}</p>
                </div>
                <div className='location-ctn1'>
                  <BsFillBriefcaseFill className='icons' />
                  <p>{employmentType}</p>
                </div>
                <p className='package'>{packagePerAnnum}</p>
              </div>
              <hr />
            </div>
            <div className='description'>
              <h1>Description</h1>
              <a className='h-link' href={companyWebsiteUrl}>
                Visit <BiLinkExternal />
              </a>
            </div>
            <p>{jobDescription}</p>
            <div>
              <h1>Skills</h1>
              <ul className='skills-items'>
                {skills.map(eachItem => (
                  <li key={eachItem.name} className='skills-items1'>
                    <img
                      src={eachItem.imageUrl}
                      alt={eachItem.name}
                      className='skill-logo'
                    />
                    <p>{eachItem.name}</p>
                  </li>
                ))}
              </ul>
              <div className='company-ctn'>
                <div className='company-bg'>
                  <h1>Lift at Company</h1>
                  <p>{lifeAtCompany.description}</p>
                </div>
                <img src={lifeAtCompany.imageUrl} />
              </div>
            </div>
          </div>

          <h1> Similar Jobs</h1>
          <ul className='similar-jobs'>
            {similarJobsData.map(eachItem => (
              <SimilarJobs
                key={eachItem.id}
                jobDetails={eachItem}
                employmentType={employmentType}
              />
            ))}
          </ul>
        </>
      )
    }
  }

  onRetryJobDetails = () => {
    this.getJobData()
  }

  renderJobFailureView = () => (
    <div>
      <img
        src='https://assets.ccbp.in/frontend/react-js/failure-img.png'
        alt='failure view'
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>

      <div>
        <button
          type='button'
          onClick={this.onRetryJobDetails}
          data-testid='button'
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderJobLoadingView = () => (
    <div data-testid='loader'>
      <Loader type='ThreeDots' height='50' width='50' />
    </div>
  )

  renderJobStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className='job-details-ctn'>
          <div>{this.renderJobStatus()}</div>
        </div>
      </>
    )
  }
}

export default JobDetails

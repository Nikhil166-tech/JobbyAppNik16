import {Component} from 'react'
import Header from '../Header'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import {AiOutlineSearch} from 'react-icons/ai'
import JobCard from '../JobCard'
import Loader from 'react-loader-spinner'
const apiConstantstatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const apiJobConstantstatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

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

class Jobs extends Component {
  state = {
    profileData: [],
    jobsData: [],
    apiStatus: apiConstantstatus.initial,
    apiJobsStatus: apiJobConstantstatus.initial,
    checkboxInput: [],
    radioInput: '',
    searchInput: '',
  }

  componentDidMount = () => {
    this.getProfileDetails()
    this.onGetJobDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiConstantstatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const optionProfile = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const responseProfile = await fetch(profileApiUrl, optionProfile)
    if (responseProfile.ok === true) {
      const fetchDataProfile = [await responseProfile.json()]

      const updatedDataProfile = fetchDataProfile.map(eachItem => ({
        name: eachItem.profile_details.name,
        profileImageUrl: eachItem.profile_details.profile_image_url,
        shortBio: eachItem.profile_details.short_bio,
      }))
      this.setState({
        profileData: updatedDataProfile,
        responseSuccess: true,
        apiStatus: apiConstantstatus.success,
      })
    } else {
      this.setState({apiStatus: apiConstantstatus.failure})
    }
  }

  onGetProfileView = () => {
    const {profileData, responseSuccess} = this.state
    if (responseSuccess) {
      const {name, profileImageUrl, shortBio} = profileData[0]
      return (
        <div className="profile-ctn">
          <img src={profileImageUrl} alt={name} className="profile-img" />
          <h1 className="employment-name">{name}</h1>
          <p className="bio">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  onRetryProfile = () => {
    this.getProfileDetails()
  }

  onProfileViewFailure = () => (
    <div>
      <button onClick={this.onRetryProfile}>Retry</button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRenderProfileStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantstatus.success:
        return this.onGetProfileView()
      case apiConstantstatus.failure:
        return this.onProfileViewFailure()
      case apiConstantstatus.inProgress:
        return this.onProfileViewFailure()
      default:
        return null
    }
  }

  onGetCheckbox = () => (
    <ul className="list-items1">
      {employmentTypesList.map(eachItem => (
        <li key={eachItem.employmentTypeId}>
          <input
            id={eachItem.employmentTypeId}
            type="checkbox"
            onChange={this.onGetInputOption}
          />
          <label htmlFor={eachItem.employmentTypeId} className="items1">
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetRadioButtons = () => (
    <ul className="list-items1">
      {salaryRangesList.map(eachItem => (
        <li key={eachItem.salaryRangeId}>
          <input
            id={eachItem.salaryRangeId}
            type="radio"
            name="option"
            onChange={this.onGetRadioOption}
          />
          <label htmlFor={eachItem.salaryRangeId} className="items1">
            {eachItem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetJobDetails = async () => {
    this.setState({apiJobsStatus: apiJobConstantstatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {checkboxInput, radioInput, searchInput} = this.state
    const jobApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInput}&minimum_package=${radioInput}&search=${searchInput}`
    const optionsJobs = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const responseJobs = await fetch(jobApiUrl, optionsJobs)
    if (responseJobs.ok === true) {
      const fetchedJobData = await responseJobs.json()
      const updatedJobsData = fetchedJobData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsData: updatedJobsData,
        apiJobsStatus: apiJobConstantstatus.success,
      })
    } else {
      this.setState({
        apiJobsStatus: apiJobConstantstatus.failure,
      })
    }
  }

  onGetRadioOption = event => {
    this.setState({radioInput: event.target.id})
  }

  onGetInputOption = event => {
    const {checkboxInput} = this.state
    const inputNotInList = checkboxInput.filter(
      eachItem => eachItem === event.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInput: [...prevState.checkboxInput, event.target.id],
        }),
        this.onGetJobDetails,
      )
    } else {
      const filteredData = checkboxInput.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState(
        prevState => ({checkboxInput: filteredData}),
        this.onGetJobDetails,
      )
    }
  }

  onGetJobsview = () => {
    const {jobsData} = this.state
    const nojobs = jobsData.length === 0
    return nojobs ? (
      <div className="load-pg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>no jobs found</h1>
        <p> We could not find any jobs. Try other filters</p>
      </div>
    ) : (
      <ul className="ul-jobs-list">
        {jobsData.map(eachItem => (
          <JobCard key={eachItem.id} jobsData={eachItem} />
        ))}
      </ul>
    )
  }

  onRetryJobs = () => {
    this.onGetJobDetails()
  }

  onGetJobFailureView = () => (
    <div>
      <h1>Retry</h1>
    </div>
  )

  onRenderJobsStatus = () => {
    const {apiJobsStatus} = this.state
    switch (apiJobsStatus) {
      case apiJobConstantstatus.success:
        return this.onGetJobsview()
      case apiJobConstantstatus.failure:
        return this.onGetJobFailureView()
      case apiJobConstantstatus.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onGetSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitSearchInput = () => {
    this.onGetJobDetails()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.onGetJobDetails()
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-ctn">
          <div className="jobs-ctn1">
            <div className="profile-ctn">{this.onRenderProfileStatus()}</div>
            <hr className="hr" />
            <h1>Types of Employment</h1>
            {this.onGetCheckbox()}
            <hr className="hr" />
            <h1>Salary Range</h1>
            {this.onGetRadioButtons()}
          </div>
          <div className="jobs-ctn2">
            <input
              className="input1"
              type="search"
              placeholder="Search"
              onChange={this.onGetSearchInput}
              onKeyDown={this.onEnterSearchInput}
            />
            <button
              className="button2"
              data-testid="searchButton"
              onClick={this.onSubmitSearchInput}
            >
              <AiOutlineSearch />
            </button>
            <div className="load-pg">{this.onRenderJobsStatus()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs

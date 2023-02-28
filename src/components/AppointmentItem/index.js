import './index.css'

const AppointmentItem = props => {
  const {eachDetails, onStarChange} = props
  const {id, title, date, isFavorite} = eachDetails

  const imageChanges = () => {
    onStarChange(id)
  }

  const starImage = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-ele">
      <div className="title-para">
        <p>{title}</p>
        <button
          className="btn-one"
          type="button"
          data-testid="star"
          onClick={imageChanges}
        >
          <img src={starImage} alt="star" className="stars" />
        </button>
      </div>

      <p>date:{date}</p>
    </li>
  )
}

export default AppointmentItem

// Write your code here
import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    title: '',
    date: '1998 - 02 - 02',
    contactsList: [],
    starred: false,
  }

  addButton = event => {
    event.preventDefault()
    const {title, date, contactsList} = this.state
    const newContact = {
      id: uuidv4(),
      title,
      date,
      isFavorite: false,
    }

    this.setState(prevState => ({
      contactsList: [...prevState.contactsList, newContact],
      title: '',
      date: '',
    }))
  }

  onStarChange = id => {
    this.setState(prevState => ({
      contactsList: prevState.contactsList.map(eachContact => {
        if (id === eachContact.id) {
          return {...eachContact, isFavorite: !eachContact.isFavorite}
        }
        return eachContact
      }),
    }))
  }

  onChangeTitle = event => {
    const newTitle = event.target.value === ' ' ? 'naresh' : event.target.value
    this.setState({title: newTitle})
  }

  onChangeDate = event => {
    console.log(event.target.value)
    this.setState({
      date: format(new Date(event.target.value), 'dd MMMM yyyy, EEEE'),
    })
  }

  onDemandList = () => {
    const {starred} = this.state

    this.setState(preveState => ({starred: !preveState.starred}))
  }

  render() {
    const {title, date, contactsList, starred} = this.state
    const tb = contactsList.filter(eachStar => eachStar.isFavorite === true)
    const newContactsList = starred ? tb : contactsList

    return (
      <div className="container">
        <div className="bg-container">
          <div className="two-container">
            <form>
              <h1>Add Appointment</h1>
              <label htmlFor="title">TITLE</label>
              <br />
              <input id="title" type="text" onChange={this.onChangeTitle} />
              <br />

              <label htmlFor="date">DATE</label>
              <br />
              <input id="date" type="date" onChange={this.onChangeDate} />
              <br />

              <button type="submit" onClick={this.addButton}>
                Add
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="imgEle"
              />
            </div>
          </div>
          <hr />
          <div>
            <div className="appointment">
              <h1>Appointments</h1>
              <button type="button" onClick={this.onDemandList}>
                Starred
              </button>
            </div>

            <ul>
              {newContactsList.map(eachOne => (
                <AppointmentItem
                  key={eachOne.id}
                  eachDetails={eachOne}
                  onStarChange={this.onStarChange}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments

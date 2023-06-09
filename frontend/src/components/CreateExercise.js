
import axios from 'axios';
import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class CreateExercise extends Component {

  constructor(props) {
    super(props)

    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeDuration= this.onChangeDuration.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  
    this.state = {
        username:'',
        description:"",
        duration:0,
        date:new Date(),
        users:[]   
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/users/')
          .then(res => {
            if(res.data.length > 0){
              this.setState({
                users: res.data.map(user => user.username)
              })
            }
          })
          .catch(err => console.log(err))
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

    onSubmit(e) {
      e.preventDefault();
      const exercise ={
        username:this.state.username,
        description:this.state.description,
        duration:this.state.duration,
        date:this.state.date,
      }
      console.log(exercise);
      axios.post('http://localhost:8080/excercises/add', exercise)
          .then(res => console.log(res.data), alert('Created successfully'))
          .catch(err => console.log(err))

        this.setState({
          username:'',
          description:"",
          duration:0,
          date:new Date(),
      })
    }
  render() {
    return (
      <div>
       <h3>Create New Exercise Log</h3>
         <form onSubmit={this.onSubmit}>
           <div className='from-group'>
             <label>Username: </label>
            
             <select ref="userInput"  value={this.state.username} onChange={this.onChangeUsername} className="form-control" >
               {
                this.state.users.map(function(user){
                  return <option key={user} value={user}>{user}</option>
                 })
              }
            </select>
            
          </div>
          <div className='form-group'>
            <label>Description:</label>
            <input type="text" className='form-control' value={this.state.description} onChange={this.onChangeDescription} />
          </div>
          <div className='form-group'>
            <label>Duration (in minutes):</label>
            <input type="text" className='form-control' value={this.state.duration} onChange={this.onChangeDuration} />
          </div>
          <div className='form-group'>
            <label>Date:</label>
            <div>
            <DatePicker
            selected={this.state.date}
            onChange={this.onChangeDate}
            
            />
            </div>
          </div>
          <div className='form-group'>
            <input type="submit" value="Create Exercise Log" className='btn btn-primary mt-2' />
          </div>
        </form>
    </div>
    )
  }
}

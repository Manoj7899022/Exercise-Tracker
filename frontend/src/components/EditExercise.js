import axios from 'axios';
import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

import { useParams } from 'react-router-dom';

export const EditExercise = () => {
  const {id} = useParams()
  return (
    <CreateExercise id={id} />
  )
}


 class CreateExercise extends Component {

  constructor(props) {
    super(props)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeDuration= this.onChangeDuration.bind(this)
    this.onChangeDate = this.onChangeDate.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  
    this.state = {
        username:'',
        description:"",
        duration:0,
        date:new Date()
        
    }
    
  }
  
  componentDidMount() {
    axios.get('http://localhost:8080/excercises/'+this.props.id)
          .then(res => {
            if(res.data){
              this.setState({
                username:res.data.username,
                description:res.data.description,
                duration:res.data.duration,
                date:new Date(),
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

    onSubmit(e) {
      e.preventDefault();
      const exercise ={
        username:this.state.username,
        description:this.state.description,
        duration:this.state.duration,
        date:this.state.date,
      }
      console.log(exercise);
      axios.post('http://localhost:8080/excercises/update/'+this.props.id, exercise)
          .then(res => console.log(res.data), alert('Updated successfully'))
          .catch(err => console.log(err))
    }
  render() {
    return (
      <div>
       <h3 className='mt-2'>Update Exercise Log</h3>
         <form onSubmit={this.onSubmit}>
           <div className='from-group'>
             <label>Username: </label>
             <input type="text" className='form-control' value={this.state.username} disabled={true} />
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
            <input type="submit" value="Update Exercise Log" className='btn btn-primary mt-2' />
          </div>
        </form>
    </div>
    )
  }
}

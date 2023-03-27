import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

const Exercise = props =>(
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+ props.exercise._id}>edit</Link> | <a href='#' onClick={() => {{props.deleteExercise(props.exercise._id)} alert('Deleted successfully')}}>delete</a>
    </td>
  </tr>
)
export default class ExercisesList extends Component {
  constructor(props) {
    super(props)
  
    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { Exercises: [] }
  }

  componentDidMount(){
    axios.get("http://localhost:8080/excercises/")
          .then(res => {
            this.setState({Exercises: res.data})
            
          })
          .catch(err => {
            console.log(err)
          })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:8080/excercises/'+id)
          .then(res => console.log(res.data));
    this.setState({
    Exercises: this.state.Exercises.filter(ele => ele._id !== id)
  })
  }
  exerciseList() {
    
    return this.state.Exercises.map(currentexercises =>{
      // console.log(currentexercises)
      return <Exercise exercise={currentexercises} deleteExercise ={this.deleteExercise} key={currentexercises._id} />
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
          <table className='table'>
              <thead className='thead-light'>
                <tr>
                  <th>Username</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                { this.exerciseList()}
              </tbody>
          </table>
      </div>
    )
  }
}

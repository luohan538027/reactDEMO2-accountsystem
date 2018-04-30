import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import * as RecordsApi from '../utils/ReacordsAPI'


class Record extends Component{
  constructor(props){
    super(props)
    this.state = {
      recordToggle : false
    }
  }

  recordRow(){
    return (
      <tr >
      <td>{this.props.date}</td>
      <td>{this.props.title}</td>
      <td>{this.props.amount}</td>
      <td>
        <button className='btn btn-info mr-2' onClick={this.handleToggle.bind(this)}>Edit</button>
        <button className='btn btn-danger' onClick={this.handleDelete.bind(this)}>Delete</button>
      </td>
    </tr>
    )
  }

  handleDelete(){
    RecordsApi.remove(this.props.id).then(
      response => this.props.deleteRecord(this.props.id)
    ).catch(
      error => console.log(error.message)
    )
  }

  recordForm() {
    return (
      <tr >
      <td><input type="text" defaultValue={this.props.date} className='form-control' ref='date'/></td>
      <td><input type="text" defaultValue={this.props.title} className='form-control' ref='title'/></td> 
      <td><input type="text" defaultValue={this.props.amount} className='form-control' ref='amount'/></td>
      <td>
        <button className='btn btn-info mr-2' onClick={this.recordUpdate.bind(this)}>Update</button>
        <button className='btn btn-danger' onClick={this.handleToggle.bind(this)}>Cancle</button>
      </td>
    </tr>
    )
  }
  recordUpdate(event){
    let body = {
      date:this.refs.date.value,
      title:this.refs.title.value,
      amount:Number.parseInt(this.refs.amount.value,0),
    }

  RecordsApi.update(this.props.id,body).then(
    (response) =>{
      const data = response.data
      this.props.handleUpdate(data.id,data)
      this.setState({
       recordToggle:false
      })
    }
  ).catch(
    error => console.log(error.message)
  )

  }
  handleToggle(){
    this.setState({
      recordToggle:!this.state.recordToggle
    })
  }

  render(){
      if(!this.state.recordToggle) {
        return this.recordRow()
      }else {
        return this.recordForm()
      }

      
  }
}

Record.propTypes = {
  id:PropTypes.string,
  title:PropTypes.string,
  amount:PropTypes.number,
  date:PropTypes.string
}

export default Record;
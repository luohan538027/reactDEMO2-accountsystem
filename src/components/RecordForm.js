import React, { Component } from 'react';
import * as RecordApi from '../utils/ReacordsAPI'



 export default class RecordForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            date:'',
            title:'',
            amount:''
        }
    }

    void(){
        return  this.state.date && this.state.title && this.state.amount
        }

    handleChange(event) {
        let name = event.target.name;
        let obj = {};
        obj[name] = event.target.value;
        this.setState(obj);
        
    }  
    
    handleSubmit(event){
        event.preventDefault();
        const date = {
            ...this.state,
            amount:Number.parseInt(this.state.amount,0)
        }
        RecordApi.create(date).then(
            response => {
                this.props.addRecord(response.data)
            }
        ).catch(
            error => console.los(error.message)
        )

        this.setState({
            date:'',
            title:'',
            amount:''
        })

    }
    render(){

        return (
            <form className='form-inline mb-3' onSubmit={this.handleSubmit.bind(this)}>
              <div className='form-group mr-1'>
                <input type="text" placeholder='date' name='date' className='form-control' value={this.state.date} onChange={this.handleChange.bind(this)}/>
              </div>
              <div className='form-group mr-1'>
                <input type="text" placeholder='title' name='title' className='form-control' value={this.state.title} onChange={this.handleChange.bind(this)} />
              </div>
              <div className='form-group mr-1'>
                <input type="text" placeholder='amount' name='amount' className='form-control' value={this.state.amount} onChange={this.handleChange.bind(this)}/>
              </div>
              <button type='submit' className='btn btn-primary' disabled={!this.void()} >CreateNew</button>
            </form>
            
        )
    }
 }
import React, { Component } from 'react';
import Record from './Record';
import ReactForm from './RecordForm'
import axios from 'axios';
import { SSL_OP_PKCS1_CHECK_1 } from 'constants';
import * as RecordApi from '../utils/ReacordsAPI'
 

class Records extends Component {
constructor(props){
  super(props);
  this.state = {
    isloading:false,
    err:null,
    records:[]
  }

}
componentDidMount() {
  
  RecordApi.getAll()
  .then(res => this.setState({
    records:res.data,
    isloading:true,
  }))
  .catch(err => this.setState({
    err:err,
    isloading:true
  }))

}

addRecord(record){
  this.setState({
    records:[
      ...this.state.records,
      record
    ]
  })
}

handleUpdate(id,newRecord){
    let recordsAfter =[];
   recordsAfter = this.state.records.map((item,i)=>{
    if(item.id !== id) {
      return item
    }else {
      return {
        ...item,
        ...newRecord
      }
            
    }
  }) 
 this.setState({

  records:recordsAfter
 })

}


deleteRecord(id) {

   const newRecord = this.state.records.filter((item,i) => item.id != id )
   this.setState({
     records:newRecord
   })
}

render() {
 const {err,isloading,records}  = this.state;
 let recordComponent;
 


  if(!isloading) {
    recordComponent =  <h1> Loading .....</h1>
  }
  else if (err !== null) {
    recordComponent =  <h1>{err.message}</h1>
  }
 else {
  recordComponent =  (
      <div>
        <table className="table table-bordered">
        <thead>
          <tr>
           <th>Date</th>
           <th>Title</th>
           <th>Amount</th>  
           <th>Actions</th>         
          </tr>
        </thead>
        <tbody>
          {records.map((record,i) => <Record key={record.id} {...record} handleUpdate={this.handleUpdate.bind(this)} deleteRecord={this.deleteRecord.bind(this)}/>)}
        </tbody>
        </table>
      
     
      </div>
    );}


    return (
      <div>
         <h2>Records</h2>     
          <ReactForm addRecord={this.addRecord.bind(this)}/>
          {recordComponent}
      </div>
    )
  }
}

export default Records;

import axios from "axios"
import { useEffect, useState } from "react"

export const TodosInput=()=>{
const [todos,setTodos]=useState([])
const [text,setText]=useState("")
// const [data,setData]=useState([])
const [page, setPage] = useState(1);
const [loading,setLoading]=useState(false)
useEffect(()=>{
//    fetch("http://localhost:3001/todos")
//    .then((d)=>d.json())
//    .then((res)=>{
//        setTodos(res)
//    })
getData();
},[page])

const getData=()=>{
    setLoading(true)
    axios.get(`http://localhost:3001/todos?_page=${page}&_limit=10`, {
      todos
    })
    .then(function (response) {
      setTodos(response.data)
      setLoading(false)
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    }); 
}
    return(
        < >
            <h1 className="title">Todo...</h1>
          <input className="inputTitle" type="text" placeholder="To do..." 
           onChange={(e)=>setText(e.target.value)}></input>
          <input className="inputBody" type="text" placeholder="Add Task..." onChange={(e)=>setText(e.target.value)}></input>
          <button className="addBtn" onClick={()=>{
            // setTodos([...todos,{status:false,title:text}])

            const data={status:false, title:text }

            axios.post("http://localhost:3001/todos",data)
            .then(function () {
                getData()
              });
        
           
        }}>Add</button>
        
          <div className="container">
        {todos.map((e)=> (<div key={e.id}
        >{e.title} - {e.status ? "Done": "Not Done"}</div>))}
     

          </div>
        
        <div className="pagination">
        <button className="prev"  onClick={() => {
          setPage(page - 1);
        
        }}>Prev</button>
        <button className="next"
         onClick={() => {
            setPage(page +1);
            
          }}>Next</button>
        </div>
         
        </>
    )
}
let url="https://todos-65f6a-default-rtdb.firebaseio.com/users.json";
import { useEffect, useState } from "react";
import axios from "axios"
export const ShowData=()=>{
        let initState={
            username:"",
            email:"",
        }
    
        let [user,setUser]=useState(initState);
       let [editId,setEditId]=useState(null)
        let [users,setUsers]=useState([])

        let [updatedUser,setUpadateUser]=useState({
            username:"",
            email:""
        })

        
       
       
       
        function handlechange(e){
            let {name,value}=e.target
            setUser({...user,
             [name]:value
            }
            )
        }
      
       async function submitform(e){
            e.preventDefault()
            await axios.post(url,user)
            setUser(initState)
           
        }

         async function dodelete(id) {
            axios.delete(`https://todos-65f6a-default-rtdb.firebaseio.com/users/${id}.json`)
            users.filter((ele)=>ele.id!=id)
         }

         useEffect(()=>{

            async function fetchuser(){
                let res= await axios.get(url);
                let data=Object.entries(res.data)
                setUsers(data)
            }
            fetchuser()
       },[users])
       
       


       function edituser(id){
       setEditId(id)
       }
       function handleupdateduser(e){
        let {name,value}=e.target;
        setUpadateUser({...updatedUser,
            [name]:value
        })
       }
       async function submitupdateduser(e,id){
           e.preventDefault()
          await axios.patch(`https://todos-65f6a-default-rtdb.firebaseio.com/users/${id}.json`,updatedUser)
          setEditId(null)
          setUpadateUser({
            username:"",
            email:""
        })
      }
        
       
        
    
        return(
            <>
            <form onSubmit={submitform}>
                <h1>Add User</h1>
                <input name="username" placeholder="enter name" value={user.username} onChange={(e)=>handlechange(e)}/>
                <input name="email" placeholder="enter email" value={user.email} onChange={(e)=>handlechange(e)} />
                <button type="submit">Submit</button>
            </form>
          
            {   
              
                users.map(([id,ele])=>{
                 return(
                    <div key={id} style={{border:"1px solid black", padding:"20px" ,margin:"10px", width:"100%"}}>
                      <h1>Username:-{ele.username}</h1>
                      <h1>Email:-{ele.email}</h1>
                      <button onClick={()=>dodelete(id)}>Delete</button>
                      <button onClick={()=>edituser(id,ele.username,ele.email)} >Edit</button>
                    {
                        editId==id && <div>
                            <form onSubmit={(e)=>submitupdateduser(e,id)}>
                                <input name="username" placeholder="Enter username" value={updatedUser.username} onChange={(e)=>handleupdateduser(e)}/>
                                <input name="email" placeholder="Enter email" value={updatedUser.email} onChange={(e)=>handleupdateduser(e)}/>
                                <input type="submit"/>
                            </form>
                        </div>

                    }
                    </div>
                 )
                })

            }
            

            
            
            </>
           
        )
    
}
 
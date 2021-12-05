import { useEffect, useState } from "react";
import axios from "axios"
function User(){
    let def_user={
            id:"",
            name:"",
            city:"",
            email:"",
            image:""
    }
    let[details,setdetails]=useState(def_user);

    let [user, setUser]=useState([]);

    // renders the information of the users
    useEffect(()=>{
      const fetchData=async()=>{
        const result= await axios.get(`https://61aa28bfbfb110001773f0f4.mockapi.io/user`)
        setUser(result.data);
        console.log(user);
        }
        fetchData();
    },[])


    //Update the User
    const patchUser=async(event,id)=>{
        event.preventDefault();
        await axios.put(`https://61aa28bfbfb110001773f0f4.mockapi.io/user/${id}`,{
            name:details.name,
            city:details.city,
            email:details.email,
            image:details.image,           
        })
       let response= await axios.get(`https://61aa28bfbfb110001773f0f4.mockapi.io/user`);
       setUser(response.data);
       let temp={id:"",name:"",email:"",image:"",city:""}
       setdetails({...temp});
       const divElement= document.getElementById(id);
       divElement.scrollIntoView({behavior:"smooth"});
    
    }
     
    
    //adds the new User
    const addUser=async(event)=>{
        event.preventDefault();
        await axios.post(`https://61aa28bfbfb110001773f0f4.mockapi.io/user`,{
            name:details.name,
            city:details.city,
            email:details.email,
            image:details.image,           
        })
       let response= await axios.get(`https://61aa28bfbfb110001773f0f4.mockapi.io/user`);
       setUser(response.data);
       let temp={id:"",name:"",email:"",image:"",city:""}
       setdetails({...temp})
       const divElement= document.getElementById("bottom");
       divElement.scrollIntoView({behavior:"smooth"});


    }


    
    //Deletes the selected user
    const Deleteuser=async(id)=>{
      await axios.delete(`https://61aa28bfbfb110001773f0f4.mockapi.io/user/${id}`);
      let response= await axios.get(`https://61aa28bfbfb110001773f0f4.mockapi.io/user`);
      setUser(response.data);
    }
    
    //lists the information of the selected user
    const handleupdate=(id,name,city,email,image)=>{
        console.log("clicked");
         let temp={id:id,name:name,city:city,email:email,image:image};
         console.log(temp)
         setdetails({...temp});
         const divElement= document.getElementById("top");
         divElement.scrollIntoView({behavior:"smooth"});

    }

    //marks down the values of the user
    const handleChange=(e)=>{
        let temp={...details};
       temp[e.target.name]=e.target.value;
        setdetails({...temp});
    }

    //onSubmit if id is available patchuser is called else adduser is called.
    const handleSubmit=(event)=>{
        if(details.id)patchUser(event,details.id)
        else
        addUser(event)
    }

    return(
        <>
        <div id="top"></div>
        <div className="page_top">

            
            <label>Name:</label>
            <input className="form-control" onChange={handleChange} name="name" type="text" value={details.name}/>
            <label>city:</label>
            <input className="form-control" onChange={handleChange} name="city" type="text" value={details.city}/>
            <label>Email:</label>
            <input  className="form-control"  onChange={handleChange} name="email" type="email" value={details.email}/>
            <label>Image:</label>
            <input  className="form-control" onChange={handleChange} name="image" type="url" value={details.image}/>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            
            
        </div>


          <div className="main_contain">
    {/* renders the every information of the user */}
   {user.map(({id,name,city,email,image })=>{
    return(
    <div key={id} id={id}>
        <div className="container">
            <div>
     <p><strong>Id:</strong>{id}</p>
     <p><strong>Name:</strong>{name}</p>
     <p><strong>city:</strong>{city}</p>
     <p><strong>Email:</strong><br/>{email}</p>
     </div>
     <div>
     <img className="img_user" src={image} alt="user_img"></img><br/>
     <button onClick={()=>handleupdate(id,name,city,email,image)}  className="btn btn-success">Update</button>
     <button onClick={()=>Deleteuser(id)} className="btn btn-danger" >Delete</button>
     </div>
    </div>
    </div>
    );
   })} 
    <div>

    </div>


    
          
         </div>

         <div id="bottom">

         </div>
        </>
    )
}

export default User;
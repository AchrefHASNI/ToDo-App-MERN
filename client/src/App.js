import './App.css';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';




function App() {
   const [itemText,setItemText]=useState('') 
   const [itemStatue,setItemStatue]=useState('todo') 
   const [itemList,setItemList]=useState([]) 
 
const [openEmp, setOpenEmp] = useState(false);
const themeEm = useTheme();
const fullScreenEm = useMediaQuery(themeEm.breakpoints.down('md'));

const handleClickOpenEm = () => {
  setOpenEmp(true);
};

const handleCloseEmp = () => {
  setOpenEmp(false);
};


/* add  new  item*/ 
  const addNewItem =async(e)=>{
    e.preventDefault()
    
      try {
        if (itemText!=='') {
          
          const res = await  axios.post('http://localhost:5100/api/item',{item:itemText,statue:[itemStatue]})
          console.log(res);
          setItemList(prev=>[...prev,res.data] )
          setItemText('');
          setItemStatue('todo')
        } else {
          handleClickOpenEm()
        }
      } catch (error) {
       console.log(error);
      }
    
  }

  /* get  all items */

  useEffect(()=>{
    const getItems= async ()=>{
      try {
         const res = await axios.get('http://localhost:5100/api/items');
         setItemList(res.data);
         
      } catch (error) {
        console.log(error);
      }
    }
    getItems()
  },[])


/*delete  item */

const deleteItem = async(id)=>{

  try {
     const res = axios.delete(`http://localhost:5100/api/item/${id}`)
     console.log(res.data);
     const newItemList = itemList.filter((item)=>item._id !==id);
     setItemList(newItemList)
  } catch (error) {
    console.log(error);
  }
}


/* delete all items */

const [open, setOpen] = useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const deleteAllItems = async()=>{
  try {
    const res = axios.delete(`http://localhost:5100/api/item`)
    console.log(res.data);
    
    setItemList([])
 } catch (error) {
   console.log(error);
 }
 setOpen(false);
}


/* Update items */
const [isUpdating,setIsUpdating]=useState('')
const [updateText,setUpdateText]=useState('')


const updateItem = async(e)=>{
  e.preventDefault()
  try {
    
    const res = await axios.put(`http://localhost:5100/api/item/${isUpdating}`,{item:updateText,statue:[itemStatue]})
    
    console.log(res.data);
    
    const updatedItemIndex =   itemList.findIndex(item=>item._id===isUpdating);
    itemList[updatedItemIndex].item = updateText
    itemList[updatedItemIndex].statue[0] = itemStatue
    setUpdateText('');
    setIsUpdating('');
  } catch (error) {
    console.log(error);
  }
}

// const [selectedValue, setSelectedValue] = useState('');

const handleChange = (event) => {
  setItemStatue(event.target.value);
}
const updatingForm =()=>(
  <form className="update-form" >
    <input className="update-new" id="az" type="text" placeholder={itemList[ itemList.findIndex(item=>item._id===isUpdating)].item} 
    onChange={(e)=>setUpdateText(e.target.value)} 
    value={updateText} />

<select className="select-update" value={itemStatue} onChange={handleChange}>
    <option value="todo" selected>todo</option>
    <option value="doing">doing</option>
    <option value="done">done</option>
  </select>
    <button className="update" onClick={(e)=>{updateItem(e)}}> <UpdateIcon /> Update</button>
  </form>
)


  return (
    <div className='view'>
    <div className="App">
      <h1>Todo App List</h1>
      <form className="form">
      <TextField id="outlined-basic" 
      label="Add task todo" 
      className="todo-input"
       variant="outlined"  
       onChange={e=>{setItemText(e.target.value)}} value={itemText}/>
      <button  className="btn"  onClick={e=>addNewItem(e)}>
        <AddCircleIcon className="icon-add"/> <span>Add item</span> 
      </button>


      <Dialog
        fullScreen={fullScreenEm}
        open={openEmp}
        onClose={handleCloseEmp}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Your add task list is empty"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ass  task item  is  empty you  should write your task  there clic on <b>I get it</b> to continue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="cancel" autoFocus onClick={handleCloseEmp}>
            I get it
          </button>
        </DialogActions>
      </Dialog>




      </form>
     
      <div className="todo-listItem" >
        <div className='titles'>
          <h3 className='mini-title'>Task</h3>
          <h3 className='mini-title'>Statue</h3>
          <h3 className='mini-title'>Action</h3>
        </div>
      {
        itemList.map((item)=>(
          <div className="todo-item">
            {
              isUpdating ===item._id
              ? updatingForm()
              :<>
              <p className="item-content">{item.item}</p>
            <p className="item-content-statue">{item.statue}</p>
            <div className="gb">
    
              <button className="update" onClick={()=>{setIsUpdating(item._id);setUpdateText(item.item)}}> <UpdateIcon /> Update</button>
              <button className="delete" onClick={()=>{deleteItem(item._id)}}> <DeleteIcon /> Delete</button>
            </div>
              </>
            }
           
          </div>
        ))
      }
          </div>


       <div>
       <button className="delete"  onClick={handleClickOpen}> <DeleteIcon /> Delete All</button>
      
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure that you want  to delete all tasks?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Selecting <b>Cancel</b>  will save  all your  data without deleting any of them but  
            selection <b>Delete all</b> will remove everything , be careful in your choice.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="cancel" autoFocus onClick={handleClose}>
            Cancel
          </button>
          <button className="delete-all" onClick={deleteAllItems} autoFocus>
            Delete all
          </button>
        </DialogActions>
      </Dialog>
    </div>
      </div>

      <footer className="footer">
      <div>
        <p className='copyr'> &copy; Copyrights. All rights reserved. </p>
              </div>
              <div className="icons">
              <a href="https://github.com/AchrefHASNI" target={"blank"}>
                <GitHubIcon  className="icon"/>
              </a>
              <a href="https://facebook.com/achref.AR11" target={"blank"}>
                <FacebookIcon  className="icon"/>
              </a>
              <a href="https://www.linkedin.com/in/achref-hasni-688b4b230/" target={"blank"}>
                <LinkedInIcon  className="icon"/>
              </a>
       </div>
      </footer>
    </div>
  );
}

export default App;

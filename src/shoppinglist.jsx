import React, {useState} from "react";

function shoppinglist() {

    const [list, setList] = useState(["Milk", "Eggs", "Bread"]);
    const [newList,setNewList] = useState("");
    const [editList,setEditList] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    
    function handleInputChange(event) {
        setNewList(event.target.value);
    }

    function addTask(){
        
        if(newList.trim() !== ""){
        setList(t => [...t,newList]);
        setNewList("");
    }
    }

    function editTask(index){
        setEditingIndex(index);
        setEditList(list[index]);
    }
    function saveTask(index){
        const updatedList = [...list];
        updatedList[index] = editList;
        setList(updatedList);
        setEditingIndex(null);
        setEditList("");
    }
    function cancelEdit(){
        setEditingIndex(null);
        setEditList("");
    }
    
    function deleteTask(index){
    
        const updatedList = list.filter((_,i) => i !== index);
        setList(updatedList);
    }

    function moveTaskUp(index){
        if(index > 0){
            const updatedList = [...list];
            [updatedList[index], updatedList[index - 1]]=
            [updatedList[index - 1], updatedList[index]];
            setList(updatedList);
        }
    }
    
    function moveTaskDown(index){
        if(index < list.length - 1){
            const updatedList = [...list];
            [updatedList[index], updatedList[index + 1]]=
            [updatedList[index + 1], updatedList[index]];
            setList(updatedList);
        }

    }
    
    return (<div className="shopping-list">   

        <h1>Shopping List</h1>

        <div>
            <input type="text" 
            value={newList} 
            onChange={handleInputChange} 
            placeholder="Enter a new item" />

            <button
            className="add-button"
            onClick={addTask}>Add</button>
        </div>

        <ol>
            {list.map((task,index)=>
                <li key={index}>
                    
                {editingIndex === index ? (
                
                <input
                type="text"
                value={editList}
                onChange={(event) => setEditList(event.target.value)}
                />
                ) : (
                
                <span className="text">{task}</span>
                )}

                {editingIndex === index && (
            <>
                   <button className="confirm-button" 
                   onClick={() => saveTask(index)}>
                   Confirm
                   </button>

                  <button className="cancel-button" 
                   onClick={cancelEdit}>
                   Cancel
                   </button>
                </>
                )}
                    <button className="edit-button"
                    onClick={() => editTask(index)}>
                    Edit
                    </button>
                     
                    <button className="delete-button"
                    onClick={() => deleteTask(index)}>
                    Delete
                    </button>
                    <button className="moveup-button"
                    onClick={() => moveTaskUp(index)}>
                    Move Up
                    </button>
                    <button className="movedown-button"
                    onClick={() => moveTaskDown(index)}>
                    Move Down
                    </button>
                </li>
            )}
        </ol>
    </div>)
}

export default shoppinglist
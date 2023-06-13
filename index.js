
function fetchToDoList() {
    fetch('https://dummyjson.com/todos')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('todoTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';
  
        const dataArray = Array.isArray(data) ? data : [data]; 
  
        dataArray.forEach(item => {
          const row = tableBody.insertRow();
          row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.completed}</td>
            <td>
              <button onclick="removeTask(${item.id})">Remove</button>
              <button onclick="updateTask(${item.id})">Update</button>
            </td>
          `;
        });
      })
      .catch(error => {
        console.error('Error fetching the to-do list:', error);
    
      });
  }
  

  function addTask(userId,title, completed) {
    const newTask = [{ userId,title, completed }];
  
    fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then(response => response.json())
      .then(data => {
        console.log('New Task:', data);
        fetchToDoList(); 
      })
      .catch(error => {
        console.error('Error adding the task:', error);
     
      });
  }
  
  function removeTask(taskId) {
    fetch(`https://dummyjson.com/todos/${taskId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Task removed successfully');
          fetchToDoList();
        } else {
          console.error('Error removing the task:', response.status);
  
        }
      })
      .catch(error => {
        console.error('Error removing the task:', error);
  
      });
  }

  function updateTask(taskId, updatedTask) {
    fetch(`https://dummyjson.com/todos/${taskId}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Updated Task:', data);
        fetchToDoList();
      })
      .catch(error => {
        console.error('Error updating the task:', error);
    
      });
  }
  
 
  fetchToDoList();
  
  addTask(48,'Go to the mall',true);
  
  removeTask(1);
  
  updateTask(2, { title: 'Visit grandma', completed: false });
  
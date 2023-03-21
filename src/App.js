import './App.css';
import React, { useEffect, useState } from 'react'
import User from './components/User';
import AddUser from './components/AddUser';

const App = () => {
  // Variables and USEState
  const [users, setUsers] = useState([]);
  const [upperLimit, addupperLimit] = useState(200);
  const jsonLink = 'https://jsonplaceholder.typicode.com/todos'
  var lowerLimit = 195;

  // useEffect for fetching  api
  useEffect(() => {
    fetchData();

  }, [])


  // Fetching data 
  const fetchData = async () => {

    await fetch(jsonLink)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log(err);
      })
  }

  // ADDING NEW TODO
  const onAdd = async (name) => {

    await fetch(jsonLink, {
      method: 'POST',
      body: JSON.stringify({
        title: name,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          return
        }
        else {
          return response.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
        
        addupperLimit(upperLimit + 1);
      })
      .catch((err) => {
        console.log(err)
      });

  }

  // DELETING TODO
  const onDelete = async (id) => {
    await fetch(jsonLink + `/${id}`, {
      method: 'DELETE'
    }).then((response) => {
      if (response.status !== 200) {
        return
      }

      else {
        setUsers(users.filter((user) => {
          return user.id !== id;
        }))
        addupperLimit(upperLimit - 1);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  // EDITING THE TODO(DUMMY)
  const handleEditTodos = async (editvalue, id) => {

    await fetch(jsonLink + `/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        title: editvalue
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
      
        setUsers((users) => [...users, data])
        alert(data.title + "  Edited at id-" + id)
      })
      .catch((err) => {
        console.log(err)
      });
  }

  // CHECK(YES or NO)
  const switchComplete = id => {
    const newUser = [...users];
    newUser.forEach((user, index) => {
      if (index + 1 === id) {
        user.completed = !user.completed;
      }
    })
    setUsers(newUser)
  }
  return (
    <div className='App'>
      
      <br />
      <AddUser onAdd={onAdd} />
      <div className='allList'>
        {
          users.slice(lowerLimit, upperLimit).map((user) => (
            <User
              id={user.id}
              key={user.id}
              title={user.title}
              completed={user.completed}
              onDelete={onDelete}
              handleEditTodos={handleEditTodos}
              checkComplete={switchComplete}
            />
          ))}
      </div>
    </div>
  )
}

export default App
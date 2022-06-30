import { useState, useEffect } from "react"
import "./App.css"
import { db } from "./firebaseConfig"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore"
import { async } from "@firebase/util"

function App() {
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState("")
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "users")

  const deleteUser = async id => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc)
  }

  const incrementAge = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newFields = { age: age + 1 }
    await updateDoc(userDoc, newFields)
  }

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) })
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }

    getUsers()
  }, [])

  return (
    <div className='App text-center box-border'>
      {/* CREATE */}
      <div>
        <h1 className='bg-red-500'>CREATE</h1>
        <input
          className='border-2 border-grey-900/50 rounded '
          placeholder='Username'
          onChange={event => {
            setNewName(event.target.value)
          }}
        />
        <input
          className='border-2 border-grey-900/50 rounded'
          placeholder='Age'
          onChange={event => {
            setNewAge(event.target.value)
          }}
        />
        <br />
        <button onClick={createUser} className='bg-green-500 rounded p-1'>
          Create User
        </button>
      </div>

      {/* READ */}
      <div>
        <h1 className='bg-red-500'>READ</h1>
        <h1 className=''>
          {users.map(user => {
            return (
              <div>
                <p>Name: {user.name} </p>
                <p>Age: {user.age}</p>
              </div>
            )
          })}
        </h1>
      </div>

      {/* UPDATE */}
      <div>
        <h1 className='bg-red-500'>UPDATE</h1>
        <h1 className=''>
          {users.map(user => {
            return (
              <div>
                <p>Name: {user.name} </p>
                <p>Age: {user.age}</p>
                <button
                  onClick={() => {
                    incrementAge(user.id, user.age)
                  }}
                  className='bg-green-500 rounded p-1'
                >
                  Increment Age
                </button>
                <button
                  onClick={() => {
                    deleteUser(user.id)
                  }}
                  className='bg-orange-500 rounded p-1'
                >
                  Delete User
                </button>
              </div>
            )
          })}
        </h1>
      </div>

      {/* DELETE */}
    </div>
  )
}
export default App

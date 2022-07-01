import { useState, useEffect } from "react"
import "./Assets/icons8-add-50.png"
import "./Assets/icons8-delete-100.png"
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
    <div className='App flex justify-center items-center h-screen'>
      <div className='w-4/12 h-fit align-middle border-2 border-grey-900 rounded-md p-2'>
        <h1 className='text-center'>⚛️ React x Firebase 🔥</h1>
        {/* READ */}
        <div>
          <div class='grid grid-cols-4 gap-4 underline underline-offset-2'>
            <div className='justify-self-center'>Name</div>
            <div className='justify-self-center'>Age</div>
            <div className='justify-self-center'>Increment Age</div>
            <div className='justify-self-center'>Delete User</div>
          </div>

          {users.map(user => {
            return (
              <div class='grid grid-cols-4 gap-4'>
                <div className='justify-self-center'>{user.name} </div>
                <div className='justify-self-center'>{user.age}</div>
                <button
                  onClick={() => {
                    incrementAge(user.id, user.age)
                  }}
                  className='justify-self-center'
                >
                  ➕
                </button>
                <button
                  onClick={() => {
                    deleteUser(user.id)
                  }}
                  className='justify-self-center'
                >
                  🗑️
                </button>
              </div>
            )
          })}
        </div>

        {/* CREATE */}
        <div className='flex justify-center m-1'>
          <input
            className='border-2 border-grey-900/50 rounded p-1'
            placeholder='Username'
            onChange={event => {
              setNewName(event.target.value)
            }}
          />
          <input
            className='border-2 border-grey-900/50 rounded ml-2'
            placeholder='Age'
            onChange={event => {
              setNewAge(event.target.value)
            }}
          />
          <button onClick={createUser} className='bg-green-400 rounded ml-2'>
            ➕🙋‍♂️{" "}
          </button>
        </div>
      </div>
    </div>
  )
}
export default App

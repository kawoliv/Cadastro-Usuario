import{ use, useEffect, useState, useRef} from "react";
import "./style.css";
import Trash from "../../assets/trash.svg"; 
import api from "../../services/api";

function Home() {
const [ users, setUsers] = useState([])

const inputName = useRef()
const inputSurname = useRef()
const inputAge = useRef()
const inputEmail = useRef()
const inputAddress = useRef()



  async function getUsers(){         

    const usersFromApi = await api.get('/cadastrados')

    setUsers(usersFromApi.data)  
  }

   async function createUsers(){      

    await api.post('/cadastrados', {
      name: inputName.current.value,
      surname: inputSurname.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
      address: inputAddress.current.value
    })
    
    getUsers()

  }

  async function deleteUsers(id){         

    await api.delete(`/cadastrados/${id}`)
    getUsers()
  
  }
  
  useEffect(() => {
     getUsers()
  }, [])


  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de Usuário</h1>
        <input type="text" name="Primeiro Nome" placeholder="Nome" ref={inputName}/>
        <input type="text" name="Sobrenome" placeholder="Sobrenome" ref={inputSurname} />
        <input type="number" name="Idade" placeholder="Idade" ref={inputAge}/>
        <input type="email" name="E-Mail" placeholder="E-mail" ref={inputEmail}/>
        <input type="text" name="Endereço" placeholder="Endereço" ref={inputAddress} />
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="users-card">
          <div>
            <p>Primeiro Nome: <span>{user.name}</span></p>
            <p>Sobrenome:     <span>{user.surname}</span></p>
            <p>Idade:         <span>{user.age}</span></p>
            <p>E-Mail:        <span>{user.email}</span></p>
            <p>Endereço:      <span>{user.address}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;

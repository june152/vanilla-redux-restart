import { createStore } from "redux"
//Store는 state(변경되는 data)를 넣는 곳이라는 개념

export const Index = ():void => {
}

const ADD_TODO:string = "ADD_TODO"
const DEL_TODO:string = "DEL_TODO"

interface ListItem {
  payload:string
  id:number
}

const addToDo = (payload:string):any => {
  return {type: ADD_TODO, payload}
}

const delToDo = (id:number):any => {
  return {type: DEL_TODO, id}
}

const todoform = document.querySelector("#todoform") as HTMLFormElement
const todoinput = document.querySelector("#todoinput") as HTMLInputElement
const todoul = document.querySelector("#todoul") as HTMLUListElement

const reducer = (state:ListItem[] = [], action:any):ListItem[] => {
  switch(action.type) {
    case ADD_TODO :
      return [...state, {payload : action.payload, id: Date.now()}]
    case DEL_TODO :
      return state.filter(item => item.id !== action.id)
    default :
      return state
  }
}

const store = createStore(reducer)

const dispatchAddToDo = (payload:string):void => {
  store.dispatch(addToDo(payload))
}

const dispatchDelToDo = (e:any):void => {
  const id:number = parseInt(e.target.parentNode.id)
  store.dispatch(delToDo(id))
}

const paintToDo = ():void => {
  const toDos:ListItem[] = store.getState()
  todoul.innerText = ""
  toDos.forEach((toDo) => {
    const li = document.createElement("li")
    const btn = document.createElement("button")
    btn.innerText = "DEL"
    btn.addEventListener("click", dispatchDelToDo)
    li.id = toDo.id.toString()
    li.innerText = toDo.payload
    li.appendChild(btn)
    todoul.appendChild(li)
  })
}

store.subscribe(paintToDo)

const onSubmit = (e:any):void => {
  e.preventDefault();
  const toDo:string = todoinput.value
  todoinput.value = ""
  dispatchAddToDo(toDo);
}

todoform.addEventListener("submit", onSubmit)
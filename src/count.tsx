import { createStore } from "redux"
//Store는 state(변경되는 data)를 넣는 곳이라는 개념

export const Count = ():void => {
}

const ADD:string = "ADD"
const SUB:string = "SUB"

const add = document.querySelector("#add") as HTMLButtonElement //Dom 타입단언
const sub = document.querySelector("#sub") as HTMLButtonElement
const rst = document.querySelector("#rst") as HTMLSpanElement

const reducer = (state:number = 0, action:any):number => {
  switch(action.type) {
    case ADD :
      return state + 1
    case SUB :
      return state - 1
    default :
      return state
  }
}
const store = createStore(reducer);  //인자로서 reducer를 기본적으로 요구한다.
//reducer가 store 안의 data를 바꿔줄 함수이다. state를 바꾸는 것은 Action이 한다.

const onChange = ():void => {
  rst.innerText = store.getState().toString()
}

store.subscribe(onChange) //state의 변화를 구독하고 변화 시 함수 실행

const handleAdd = ():void => {
  store.dispatch({type:ADD})
}
const handleSub = ():void => {
  store.dispatch({type:SUB})
}

add.addEventListener("click", handleAdd)
sub.addEventListener("click", handleSub)
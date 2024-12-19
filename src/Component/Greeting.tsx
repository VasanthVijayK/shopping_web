import * as React from "react"

type NameArr = {
    name : string,
    Arr : {
        name:string,
        age:number,
        boolean:Boolean
    }[],
    children:React.ReactNode
}
const Greeting = ({children,name,Arr}:NameArr) => {
  return (
      <>
    <div>Hello Every one {name}</div>
    {children}
  {Arr.map((e,i)=>{
      return(
          <div key={i}>{`The NAme is ${e.name} and the age is ${e.age}`}</div>
      )
  })}      
      </>
  )
}

export default Greeting
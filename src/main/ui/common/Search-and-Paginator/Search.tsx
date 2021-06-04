import React, {useState} from "react";
import SuperDoubleRange from "../c8-SuperDoubleRange/SuperDoubleRange";

type StudentType = {
    id: number
    name: string
    age: number
}
const StudentItem = (props: StudentType)=>{
    return <div>
        {props.name}
        {props.age}
    </div>
}

const Search =()=>{
    const [name, setName] = useState('')
    const [value1, setValue1] = useState(1)
    const [value2, setValue2] = useState(105)
    const [students, setStudents] = useState<Array<StudentType>>([
        {id: 1, name:"Vova", age: 20},
        {id: 2, name:"Dima", age: 62},
        {id: 3, name:"Alex", age: 41},
        {id: 4, name:"Mike", age: 13},
        {id: 1, name:"Vova", age: 20},
        {id: 2, name:"Dima", age: 62},
        {id: 3, name:"Alex", age: 41},
        {id: 4, name:"Mike", age: 13},
        {id: 1, name:"Vova", age: 20},
        {id: 2, name:"Dima", age: 62},
    ])

    const filteredName = students.filter(s => {
        return s.name.toLowerCase().includes(name.toLowerCase())
    })

    const setValue = (value: [number, number]) => {
        setValue1(value[0])
        setValue2(value[1])
    }
    const searchAge =()=>{
        const filterAge = filteredName.filter(s=> s.age>value1 && s.age < value2)
        setStudents(filterAge)
    }

    return(
        <div>
            <input type={'text'}
                   placeholder='student name'
                   onChange={(e)=>{setName(e.target.value)}}
            />
            <SuperDoubleRange value={[value1, value2]} onChangeRange={setValue} />
            <button onClick={searchAge}>Search</button>
            {
                filteredName.map((s, index) =><StudentItem id={s.id} age={s.age} name={s.name} />)
            }
        </div>
    )
}

export default Search
import React from "react";

const ReadOnlyRow = ({ stroke,  array,change, urovenPravil, index, pravila, changeCoeff }) => {
 
  let rowNumber = index
let rightSide = pravila.split("...")[1].split("-")

if(rightSide == null)
rightSide= "1_1-1_1"

/* 
  <td>{stroke[0]}</td>
      <td>{stroke[1]}</td>
      <td>{stroke[2]}</td>
      <td>{stroke[3]}</td>
      <td>1
       {/* <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
        </td>
        <td>1</td>
*/

let models= [
  {
      id: 1,
      name: '',
  },

]
if(typeof(stroke[1]) == "string" &&array.length >0)
for(let i =0;i < array[0].length; i++)
{
models[i] = {id:(i+1),
name:array[0][i]
}

}

    // при выборе нового значения в категории
    const onCategoriesSelectChange = (e) => {

      // преобразуем выбранное значение опции списка в число - идентификатор категории
      const categoryId = parseInt(e.target.options[e.target.selectedIndex].value);
  
      console.log(e.target.options[e.target.selectedIndex].label)
  }




// компонент пользовательского выпадающего списка
const CustomSelect = ({ id, options, onChange, poryadok }) => {
  let b
  return (
      <select className="custom-select" id={id} onChange={change} defaultValue={options[rightSide[poryadok].split("_")[0]-1].name}>
          { options.map((option, index) =>
             <option key={id + index} id={option.id} value = {option.name}>{option.name}</option>
          ) }

      </select>
  )
}
  let arr = []
  let start = true
  for (let i = 0; i < stroke.length; i ++)
  {
if(start && typeof(stroke[i])=='string')
{arr[0] =<td>{stroke[i]}</td>


}

   else {
    arr.push(<td>{stroke[i]}</td>)
   }
   
   
start = false

  }
  if(typeof(stroke[1]) == "string" &&array.length >0)
  for(let i =0; i <array.length; i++)
  {
    let temp = urovenPravil+"_"+rowNumber+"_"+"_"+(i+1)+"/" +array.length
    arr.push(<td><CustomSelect id={temp} options={array[i]}  poryadok ={i}/>
    <input  class = "plotInput" onInput={changeCoeff}  type='number' step="0.1" min='0' max='1'  id = {temp} name="d"  value={rightSide[i].split("_")[1]} />
    </td>)
  }

  return (
    <tr>
      {arr}
    
    </tr>
  );
};
//  } 
export default ReadOnlyRow;

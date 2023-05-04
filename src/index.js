import Graph from "react-graph-vis";
import React, {  useState,useEffect } from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from './Plots.js';
import Table from './Table.js';
import "react-vis/dist/style.css";
import axios from "axios";
const { XMLParser} = require("fast-xml-parser");

let inputLevelCounter = 0;
let input_Name;


 function FlmTree() {

  function randomColor() {
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
  }
  const createNode = (x, y) => {
    const color = randomColor();

    esModel.counter++
    setEsModel(esModel)
    esModel.graph.nodes.push({ x: x, y: y,color: "#F5DEB3", id: esModel.counter, font: { size: 10 }, size: 30, label: "", title: "", shape: 'dot', physics: 'false', group:3 }       
    )
  };
  function fl(){

    console.log( networks.network);

  }
  const options =  {
    locale: 'ru',
      interaction: {
        hover: true,
        tooltipDelay: 10,
        selectable: true,
        multiselect: true,
        dragView: true,  
      },
      manipulation: {
        enabled: true,
         initiallyActive: true,
          addNode: false,
          editEdge: false,
          addEdge: function (data, callback) {
            esModel.graph.edges.push(data)
            callback(data);           
        let colorChanges = {}
        for(let i = 0; i < esModel.graph.nodes.length; i++)
{
  colorChanges[esModel.graph.nodes[i].id] = [0,0]
}
for(let i = 0; i < esModel.graph.edges.length; i++)
{colorChanges[esModel.graph.edges[i].to][1]=1
  colorChanges[esModel.graph.edges[i].from][0]=1
  

}

esModel.pravila_end = []
setEsModel(esModel)
for(let i = 0; i <esModel.graph.nodes.length; i++)
{
  
  if(colorChanges[esModel.graph.nodes[i].id][0]== 1&&colorChanges[esModel.graph.nodes[i].id][1]== 0 )
  {
    esModel.graph.nodes[i].color = "#008000" 

  }
  if(colorChanges[esModel.graph.nodes[i].id][0]== 1&&colorChanges[esModel.graph.nodes[i].id][1]== 1 )
  {
    esModel.graph.nodes[i].color = "#DA70D6" 
  }
  if(colorChanges[esModel.graph.nodes[i].id][0]== 0&&colorChanges[esModel.graph.nodes[i].id][1]== 1 )
  {
    esModel.graph.nodes[i].color = "#FF0000"
  }

}
for(let i = 0; i <esModel.graph.nodes.length; i++)
{ console.log(esModel.graph.nodes[i].color)
if(String(esModel.graph.nodes[i].color) == "#FF0000" || String(esModel.graph.nodes[i].color) == "#DA70D6"  )
  {   
    esModel.methods.UpdatePravila(esModel.graph.nodes[i].id)
}
}
setEsModel(esModel)
setEsModel(esModel)
networks.network.setData({nodes:esModel.graph.nodes, edges:esModel.graph.edges})
            networks.network.addEdgeMode();            
        },
        deleteEdge: function (data, callback) {

          callback(data);
          
          for(let i = 0; i < esModel.graph.edges.length; i++)
          {
            if (esModel.graph.edges[i].id == data.edges[0]) {
              esModel.graph.edges.splice(i,1)
              break
            }          
          }
          
          let colorChanges = {}

          for(let i = 0; i < esModel.graph.nodes.length; i++)
  {
    colorChanges[esModel.graph.nodes[i].id] = [0,0]
  }
  for(let i = 0; i < esModel.graph.edges.length; i++)
  {colorChanges[esModel.graph.edges[i].to][1]=1
    colorChanges[esModel.graph.edges[i].from][0]=1  
  }
 
  esModel.pravila_end = []
  setEsModel(esModel)
  for(let i = 0; i <esModel.graph.nodes.length; i++)
  {    
    if(colorChanges[esModel.graph.nodes[i].id][0]== 1&&colorChanges[esModel.graph.nodes[i].id][1]== 0 )
    {
      esModel.graph.nodes[i].color = "#008000" 
    }
    if(colorChanges[esModel.graph.nodes[i].id][0]== 1&&colorChanges[esModel.graph.nodes[i].id][1]== 1 )
    {
      esModel.graph.nodes[i].color = "#DA70D6" 
    }
    if(colorChanges[esModel.graph.nodes[i].id][0]== 0&&colorChanges[esModel.graph.nodes[i].id][1]== 1 )
    {
      esModel.graph.nodes[i].color = "#FF0000"
    }
    if(colorChanges[esModel.graph.nodes[i].id][0]== 0&&colorChanges[esModel.graph.nodes[i].id][1]== 0 )
    {
      esModel.graph.nodes[i].color = "#F5DEB3"
    }
  
  }
  for(let i = 0; i <esModel.graph.nodes.length; i++)
  {
  if(String(esModel.graph.nodes[i].color) == "#FF0000" || String(esModel.graph.nodes[i].color) == "#DA70D6"  )
    {

      esModel.methods.UpdatePravila(esModel.graph.nodes[i].id)
  }
}
  setEsModel(esModel)
      networks.network.setData({nodes:esModel.graph.nodes, edges:esModel.graph.edges})          
      },
        deleteNode: function (data, callback) {          
          callback(data);
          let toUninstall = []
          
          let willUpdate = false
         for(let i = 0; i < esModel.graph.edges.length; i++)
         {if( esModel.graph.edges[i].from == data.nodes[0]  ||esModel.graph.edges[i].to == data.nodes[0]  )
            { 
              toUninstall.push(i)              
            }   
         }         
         for(let i = 0; i <esModel.graph.nodes.length; i++)
         {
          if( esModel.graph.nodes[i].id == data.nodes[0] && esModel.graph.nodes[i].color == "#F5DEB3")
          {
            willUpdate = true          
          }

          if(esModel.graph.nodes[i].id == data.nodes[0] && (esModel.graph.nodes[i].color == "#008000" || esModel.graph.nodes[i].color == "#DA70D6"|| esModel.graph.nodes[i].color == "#FF0000"))
          {
            esModel.pravila_end = []
          }
         }
       
         for(let i = 0; i < toUninstall.length; i++)
         {
          esModel.graph.edges.splice(toUninstall[toUninstall.length-1-i], 1);
         }
         console.log(esModel.graph.edges)
        // esModel.graph.edges.splice(i, 1);
          for(let i = 0; i <esModel.graph.nodes.length; i++ )
          {
            if(esModel.graph.nodes[i].id == data.nodes[0])
            {
              esModel.graph.nodes.splice(i, 1);              
            }
          }
          for(let i = 0; i <esModel.TM.length; i++ )
          {
            if(esModel.TM[i].id == (data.nodes[0]-1))
            { 
              esModel.TM.splice(i, 1);            
            }
          }
          esModel.counter--
          
            let newNames = [{}]
          for(let i = 0; i <esModel.graph.nodes.length; i++ )
          {
            newNames[esModel.graph.nodes[i].id] = i+1
              esModel.graph.nodes[i].id = i+1;           
          }
          for(let i = 0; i <esModel.TM.length; i++ )
          {           
              esModel.TM[i].id = i            
          }
      
          setEsModel(esModel)
          for(let i = 0; i <esModel.graph.edges.length; i++ )
          {
            esModel.graph.edges[i].from= newNames[esModel.graph.edges[i].from]          
            esModel.graph.edges[i].to= newNames[esModel.graph.edges[i].to]
          }
          let colorChanges = {}

          for(let i = 0; i < esModel.graph.nodes.length; i++)
  {
    colorChanges[esModel.graph.nodes[i].id] = [0,0]
  }
 for(let i = 0; i < esModel.graph.edges.length; i++)
  {colorChanges[esModel.graph.edges[i].to][1]=1
    colorChanges[esModel.graph.edges[i].from][0]=1  
  }
  
  setEsModel(esModel)
  for(let i = 0; i <esModel.graph.nodes.length; i++)
  {
    
    if(colorChanges[esModel.graph.nodes[i].id][0]== 1&&colorChanges[esModel.graph.nodes[i].id][1]== 0 )
    {
      esModel.graph.nodes[i].color = "#008000"   
    }
    if(colorChanges[esModel.graph.nodes[i].id][0]== 1&&colorChanges[esModel.graph.nodes[i].id][1]== 1 )
    {
      esModel.graph.nodes[i].color = "#DA70D6"  
    }
    if(colorChanges[esModel.graph.nodes[i].id][0]== 0&&colorChanges[esModel.graph.nodes[i].id][1]== 1 )
    {
      esModel.graph.nodes[i].color = "#FF0000"  
    }
    if(colorChanges[esModel.graph.nodes[i].id][0]== 0&&colorChanges[esModel.graph.nodes[i].id][1]== 0 )
    {
      esModel.graph.nodes[i].color = "#F5DEB3" 
    }
  
  }
  for(let i = 0; i <esModel.graph.nodes.length; i++)
  {
if((String(esModel.graph.nodes[i].color) == "#FF0000" || String(esModel.graph.nodes[i].color) == "#DA70D6" ) && !willUpdate )
    {      esModel.methods.UpdatePravila(esModel.graph.nodes[i].id) }
}
  setEsModel(esModel)
     networks.network.setData({nodes:esModel.graph.nodes, edges:esModel.graph.edges})
  RenderSelectedTM(0)
        }
     },
      layout: {
        hierarchical: {
          enabled: false,
          direction: 'LR',
          sortMethod:'directed',
          blockShifting: false,
          levelSeparation: 180
        }
      },   
      edges: {
        color: "#000000"
      },
    };

  //const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  const [editContactId, setEditContactId] = useState(null);
  const [xmlFiles, setXmlFiles] = useState([]);
  const [xmlModeling, setxmlModeling] = useState([]);
  const [xmlName, setXmlName] = useState([]);
  const [indexBodyHtml, setindexBodyHtml] = useState([]);
  
  var o2x = require('object-to-xml');
  window.onbeforeunload = function() {
    return "A XHR request is pending, are you sure you want to leave ?";
}
  const [dataS, setData] = useState()
  /*
  useEffect(() => {
    fetch('/api')
    .then(response => response.json()
    .then(response => setData(response.message)))
  } )*/
  const [esModel, setEsModel] = useState({
    regimZaprosa:1,
    zapros :{},
    options: {
      Name:'',
      Author:'',
      userRequest:[]
    },
    structure:{},
    pravilaMode:0,
    TM:
    [
    ],
    pravila_end: 
    {1:['1_1...1_1',
    '1_2...2_0.8',
    '1_3...1_0.9',  
    '2_1...2_0.7',
    '2_2...1_0.9',
    '2_3...2_1',  
    '3_1...1_0.9',
    '3_2...1_0.8',
    '3_3...2_0.9',  
    ],},
    counter:0,
    graph: {
      nodes: [       
         ],
      edges: [       
      ],   
    },
    events: {      
     release: ({ nodes, edges }) => {
        let pos = networks.network.getPositions()
        },
      dragEnd: ({ nodes, edges }) => {
        let pos = networks.network.getPositions()
         for (let i = 0; i<esModel.graph.nodes.length; i++ )
         {
           esModel.graph.nodes[i].x = pos[esModel.graph.nodes[i].id].x
           esModel.graph.nodes[i].y = pos[esModel.graph.nodes[i].id].y 
         }
         setEsModel(esModel)
         networks.network.setData({nodes:esModel.graph.nodes, edges:esModel.graph.edges})       
        },
      click: ({ nodes, edges }) => {    
      if(nodes[0] != null)
      {
        RenderSelectedTM(nodes[0]-1)        
      }     
      },
    
      doubleClick: ({ pointer: { canvas } }) => {
      let pos = networks.network.getPositions()      
        for (let i = 0; i<esModel.graph.nodes.length; i++ )
        {
          esModel.graph.nodes[i].x = pos[esModel.graph.nodes[i].id].x
          esModel.graph.nodes[i].y = pos[esModel.graph.nodes[i].id].y
        }
        esModel.methods.AddTMInputLevel(esModel.graph.nodes.length)
        createNode(canvas.x, canvas.y);
        setEsModel(esModel)
        networks.network.setData({nodes:esModel.graph.nodes, edges:esModel.graph.edges})   
        RenderSelectedTM(esModel.graph.nodes.length-1)
      },
      showPopup: ({ nodes, edges }) => {       
      },
    },
    methods:
    
    { 
      changeRegimVivoda: (value) => {
        esModel.regimZaprosa = value
        setEsModel(esModel)
        console.log(value)
        
      },
      
      DefZapros:(TmNumber) =>
      {
        esModel.zapros[String(TmNumber)] = "1"
        setEsModel(esModel)
      },
      SetZapros:(TmNumber, value) =>
      {        
        esModel.zapros[String(TmNumber)] = value
        setEsModel(esModel)
        console.log(esModel.zapros)
        //RenderModelingMenu()

      },
      ChangeCoeff:(row, pos, value, nymberTM) =>
      {
      let urovenPrav
      urovenPrav = eval("esModel.pravila_end["+(Number(nymberTM))+"]")
      let leftSide = urovenPrav[row-1].split("...")[0]
      let rightSide = urovenPrav[row-1].split("...")[1].split("-")
      rightSide[pos-1]=""+rightSide[pos-1].split("_")[0] +'_'+value
      let peresobran = ""+leftSide+"..."
      let rightPeresobran=""
      for(let i = 0; i < rightSide.length; i++)
      {        
        rightPeresobran= rightPeresobran+rightSide[i]
        if((i+1) < rightSide.length)
        {
          rightPeresobran = ""+rightPeresobran+"-"
        } 
      }
      peresobran = ""+peresobran+""+rightPeresobran 
      urovenPrav[row-1] = peresobran
      setEsModel(esModel)
      RenderPravila((Number(nymberTM)))
      },
      ChangeX:(events) =>{
        let zelen =[]
        let fiolet = []
        let obr1 = []
        let obrabotka = {}
        let krasn = []
        for(let i = 0; i < esModel.graph.nodes.length; i ++)
        {        
          if(esModel.graph.nodes[i].color == "#008000")
          {
            esModel.graph.nodes[i].y =  0
            zelen[zelen.length] = i+1
            esModel.graph.nodes[i].x =  -300+zelen.length*150
          }
           if(esModel.graph.nodes[i].color == "#DA70D6")
           {
             esModel.graph.nodes[i].y =  -250
             fiolet[fiolet.length] = i+1
           }
          if(esModel.graph.nodes[i].color == "#FF0000")
          {
            esModel.graph.nodes[i].y =  -500
            krasn[krasn.length] = i+1
          }
        }
        obrabotka['input'] = zelen
        obrabotka['output'] = krasn
        let spisok = {}
        urovniObrabotki = {}
        for(let i =0; i<fiolet.length; i++)
        {
          pp =[]
          getLevelTMObrabotki(fiolet[i], zelen)
        }
        console.log(urovniObrabotki)
        let numberKey=50
        for(var key in urovniObrabotki)
        {
          urovniObrabotki[numberKey] =urovniObrabotki[key]
          numberKey++
          delete urovniObrabotki[key]
        }
        numberKey=1
        for(var key in urovniObrabotki)
        {
          urovniObrabotki[numberKey] =urovniObrabotki[key]
          numberKey++
          delete urovniObrabotki[key]
        }
       
        for(var key in urovniObrabotki)
        {          
          for(let i =0; i < urovniObrabotki[key].length; i++)
          {          
            for(let y=0; y< esModel.graph.nodes.length; y++)
            {
              if( esModel.graph.nodes[y].id ==urovniObrabotki[key][i] )              
              {
                esModel.graph.nodes[y].y = (-100 * Number(key))
                esModel.graph.nodes[y].x =-225+(150* (i+1))                             
              }  
            }
          }
        }
        let outCounter =0
        for(let i = 0; i < esModel.graph.nodes.length; i ++)
        {
           if(esModel.graph.nodes[i].color == "#FF0000")
          {            
            esModel.graph.nodes[i].y =  Object.keys(urovniObrabotki).length* (-100) -100
            esModel.graph.nodes[i].x = -150+ (150* (outCounter+1))
            outCounter++
          }  
        }
        outCounter =0
        urovniObrabotki['input'] = zelen
        urovniObrabotki['output'] = krasn
        console.log( urovniObrabotki)
        esModel.structure = urovniObrabotki

        setEsModel(esModel)
        networks.network.setData({nodes:esModel.graph.nodes, edges:esModel.graph.edges})       
        RenderSelectedTM(0)
      },
      UpdatePravila:(events) => 
      {
      let toNode
      if(events.target != undefined)
       toNode = Number(events.target.id)+1
       else  toNode=events   
       esModel.pravilaMode =1

let otKokogo = []
let massivFrom =[]
for(let i = 0; i < esModel.graph.edges.length; i ++)
      {
        if(esModel.graph.edges[esModel.graph.edges.length-i-1].to == Number(toNode))
        {
          massivFrom.push(esModel.graph.edges[esModel.graph.edges.length-i-1].from )
        }
      }
      for(let i = 0; i <massivFrom.length; i ++)
      {for(let j = 0; j <esModel.TM.length; j ++)
        {
          if(esModel.TM[esModel.TM.length-j-1].id == Number(massivFrom[i]-1))
        {
          otKokogo.push(esModel.TM[esModel.TM.length-j-1])
        }}
      }
if(otKokogo<=0)
return;

let leftArray = []
       for(let i = 0; i < otKokogo.length; i ++)
      { 
        leftArray.push([])
        for(let j = 0; j <otKokogo[otKokogo.length-1-i].termsCount; j++ )
        {
          leftArray[i][j] = (String(j+1))
        }
      }

      let arr = []
      let cartes = cartesian(leftArray)
      let start2 = false
      for(let i =0; i <cartes.length; i++ )
      {
        if(!start2)arr.push([])
        arr[i] =""
        for(let j =0; j< cartes[i].length; j++)
        { 
          arr[i] +=cartes[i][j]
          if(j+1 <cartes[i].length )
          arr[i] +="_" 
          else arr[i]+= "..."
        }
          start2 = true 
      }
      let doKokogo = []

      for(let i = 0; i < esModel.TM.length; i ++)
      {
        if(esModel.TM[i].id == Number(toNode-1))
        { 
          doKokogo.push(esModel.TM[i])
        }
      }
      
      let start3 = false
      let rSide = []

      for(let i = 0; i < cartes.length; i ++)
      { 
        if(!start3)leftArray.push([])
        rSide[i]=''
        for(let j = 0; j <doKokogo.length; j++ )
        {
          rSide[i] += "1_1"
          if(j+1 < doKokogo.length)
          rSide[i] += "-"
        }        
        start3 = true
      }  
      for(let i = 0; i < cartes.length; i ++)
      {
        arr[i] += rSide[i] 
      }     
      esModel.pravila_end[String(toNode)] = arr
setEsModel(esModel)
},
changeEsName: (value) => {       
  esModel.options.Name= String(value.target.value)
  setEsModel(esModel)
  RenderOptionsMenu()
 },
 changeEsAuthor: (value) => { 
  esModel.options.Author= String(value)
  esModel.options.Author= String(value.target.value)
  setEsModel(esModel)
  RenderOptionsMenu()
 },
      ChangePravila:(row, pos, value,urovenObrabotki) =>
      {
        let urovenPrav
        urovenPrav = esModel.pravila_end[urovenObrabotki]
        let leftSide = urovenPrav[row-1].split("...")[0]
        let rightSide = urovenPrav[row-1].split("...")[1].split("-")
       rightSide[pos-1]=""+value +'_'+rightSide[pos-1].split("_")[1] 
   
      let peresobran = ""+leftSide+"..."
      let rightPeresobran=""
      for(let i = 0; i < rightSide.length; i++)
      {       
        rightPeresobran= rightPeresobran+rightSide[i]
        if((i+1) < rightSide.length)
        {
          rightPeresobran = ""+rightPeresobran+"-"
        } 
      }
      peresobran = ""+peresobran+""+rightPeresobran
      urovenPrav[row-1] = peresobran
      setEsModel(esModel)      
      },
      ChangePlotColor:(TmNumber, TermNumber, color) =>
      {
        esModel.TM[TmNumber].plotsColors[TermNumber] = color
        setEsModel(esModel)
        RenderSelectedTM(Number(TmNumber))
      },
       deletePointplot: (TmNumber, TermNumber) => {       
        let deleteNumber = Object.keys(esModel.TM[TmNumber].coords[TermNumber]).length/2; 
        delete esModel.TM[TmNumber].coords[TermNumber]["x"+deleteNumber]
        delete esModel.TM[TmNumber].coords[TermNumber]["y"+deleteNumber]
        setEsModel(esModel)
        RenderSelectedTM(Number(TmNumber))
       },
        addNewPointPlot: (TmNumber, TermNumber) => {
          let newPointNumber = Object.keys(esModel.TM[TmNumber].coords[TermNumber]).length/2+1;
          let newCoordsNameX = "x"+newPointNumber;
          let newCoordsNameY = "y"+newPointNumber;
          esModel.TM[TmNumber].coords[TermNumber][newCoordsNameX] = 0;
          esModel.TM[TmNumber].coords[TermNumber][newCoordsNameY] = 0;
          setEsModel(esModel) 
          RenderSelectedTM(Number(TmNumber))
         },
       changeCoordsValue: (TmNumber, TermNumber, key,value) => {       
          esModel.TM[TmNumber].coords[TermNumber][key] = Number(value)
          setEsModel(esModel)
          RenderSelectedTM(Number(TmNumber))
         },
      deleteTerm: (TmNumber) => {
        
        if ( esModel.TM[TmNumber].termsCount == 1)
        return

        let willUpdate = false
        for(let i = 0; i <esModel.graph.nodes.length; i++)
        {
         if( esModel.graph.nodes[i].id == (Number(TmNumber)+1) && esModel.graph.nodes[i].color == "#F5DEB3")
         {
          willUpdate = true          
         }

         if(esModel.graph.nodes[i].id == (Number(TmNumber)+1) && (esModel.graph.nodes[i].color == "#008000" || esModel.graph.nodes[i].color == "#DA70D6"|| esModel.graph.nodes[i].color == "#FF0000"))
         {
           esModel.pravila_end = []
         }
        }
        esModel.TM[TmNumber].termsCount = esModel.TM[TmNumber].termsCount-1
        //
        let newTermName = "term"+ (Object.keys(esModel.TM[TmNumber].termsNames).length);
      delete esModel.TM[TmNumber].termsNames[newTermName]
       esModel.TM[TmNumber].coords.splice(esModel.TM[TmNumber].coords.length-1,1)  
        esModel.TM[TmNumber].plotsColors.pop()
        let popup = ""
        for(let i =0; i< esModel.TM[TmNumber].termsCount; i++)
        {
          popup+=""+esModel.TM[TmNumber].termsNames["term"+String(i+1)]+"\n"
        }
        esModel.graph.nodes[TmNumber].title=popup
        networks.network.setData({nodes:esModel.graph.nodes, edges:esModel.graph.edges})

        setEsModel(esModel)
        for(let i = 0; i <esModel.graph.nodes.length; i++)
        {
     if((String(esModel.graph.nodes[i].color) == "#FF0000" || String(esModel.graph.nodes[i].color) == "#DA70D6" )&&!willUpdate )
          {      
            esModel.methods.UpdatePravila(esModel.graph.nodes[i].id)
          }
      }
        setEsModel(esModel)
       RenderSelectedTM(Number(TmNumber))

       },
      addNewTerm: (TmNumber) => {        
        let willUpdate = false
        for(let i = 0; i <esModel.graph.nodes.length; i++)
        {
         if( esModel.graph.nodes[i].id == (Number(TmNumber)+1) && esModel.graph.nodes[i].color == "#F5DEB3")
         {
          willUpdate = true
         }

         if(esModel.graph.nodes[i].id == (Number(TmNumber)+1) && (esModel.graph.nodes[i].color == "#008000" || esModel.graph.nodes[i].color == "#DA70D6"|| esModel.graph.nodes[i].color == "#FF0000"))
         {
           esModel.pravila_end = []
         }
        }
        esModel.TM[TmNumber].termsCount = esModel.TM[TmNumber].termsCount+1
       let newTermName = "term"+ (Object.keys(esModel.TM[TmNumber].termsNames).length+1);
        esModel.TM[TmNumber].termsNames[newTermName] = "new_term"
        let t= {x1:0,y1:0,x2:0,y2:0,x3:0,y3:0,x4:0,y4:0};
         esModel.TM[TmNumber].coords.push(t);
         esModel.TM[TmNumber].plotsColors.push("#000000");
         let popup = ""
        for(let i =0; i< esModel.TM[TmNumber].termsCount; i++)
        {
          popup+=""+esModel.TM[TmNumber].termsNames["term"+String(i+1)]+"\n"
        }
        esModel.graph.nodes[TmNumber].title=popup
        networks.network.setData({nodes:esModel.graph.nodes, edges:esModel.graph.edges})
        
        
        for(let i = 0; i <esModel.graph.nodes.length; i++)
        {
     if((String(esModel.graph.nodes[i].color) == "#FF0000" || String(esModel.graph.nodes[i].color) == "#DA70D6")&& !willUpdate )
          {      
            esModel.methods.UpdatePravila(esModel.graph.nodes[i].id)
        }
      }   
        setEsModel(esModel)
         RenderSelectedTM(Number(TmNumber))         
       },
      changeTermName: (TmNumber, TermNumber, newName) => {       
        esModel.TM[TmNumber].termsNames["term"+TermNumber] = newName
        setEsModel(esModel)
        let popup = ""
        for(let i =0; i< esModel.TM[TmNumber].termsCount; i++)
        {
          popup+=""+esModel.TM[TmNumber].termsNames["term"+String(i+1)]+"\n"
        }
        esModel.graph.nodes[TmNumber].title=popup
        networks.network.setData({nodes:esModel.graph.nodes, edges:esModel.graph.edges})
        RenderSelectedTM(Number(TmNumber))
       },

      AddTMInputLevel:(id) =>
      {
          esModel.TM.push({
          id: id,
          name: '',
          termsCount:2,
          termsNames: {term1: '', term2: '',},
          coords:[{x1:0, y1:0, x2:0, y2:1, x3:1, y3:1,x4:1,y4:0},
                  {x1:1, y1:0, x2:1, y2:1, x3:2, y3:1,x4:2,y4:0 },       
                ],    
                plotsColors:['#000000','#000000',] ,   
        },)
        setEsModel(esModel)
      },      
      ChangeSelectedTMName:(id,name) =>
      {
         esModel.TM[id].name = String(name)
         esModel.graph.nodes[id].label = name
         setEsModel(esModel)
         RenderSelectedTM(Number(id))
         networks.network.setData({nodes:esModel.graph.nodes, edges:esModel.graph.edges})         
      },
    } })
    const [indexBodyHtml2, setindexBodyHtml2] = useState([['НАСТРОЙКИ'],[
    <div>НАЗВАНИЕ ЭС: <input class = "EsNameInput"  value = {esModel.options.Name}  onInput={esModel.methods.changeEsName} />
   АВТОР ЭС: <input class = "EsAuthorInput"   value = {esModel.options.Author}  onInput={esModel.methods.changeEsAuthor} />
  </div>]]);
    
    
  const { graph, events } = esModel;
  const [ networks, setNetwork ] = useState({network: {}});
  let states = { network: {} };
  

let uroven =0
let zz
let pp=[]
let start 
let urovniObrabotki={}
function getLevelTMObrabotki(obj, zelen) {
 
  
  if(zz == undefined)
  {
    zz = zelen
    start = obj
  }
  

  for(let i =0; i < esModel.graph.edges.length; i++)
  {
    if(start == obj)
    uroven =0
    if(esModel.graph.edges[i].to == obj  )
      {uroven = uroven +1        
        if(zz.includes(esModel.graph.edges[i].from))
        { 
          pp[pp.length]=(uroven)
          uroven= uroven-1    
        } else getLevelTMObrabotki(esModel.graph.edges[i].from)
      }     
  }
  if(start == obj)
  {
    console.log(pp)
    if(urovniObrabotki[Math.max(...pp)] == undefined)
    {
      urovniObrabotki[Math.max(...pp)] = []
      urovniObrabotki[Math.max(...pp)][urovniObrabotki[Math.max(...pp)].length] =obj
      start =undefined
      zz = undefined
    }
    else {urovniObrabotki[Math.max(...pp)][urovniObrabotki[Math.max(...pp)].length] =obj
      start =undefined
      zz = undefined    
    }  
  }
}

  function  changePravila (row, pos, value, coeff ) { 

   esModel.methods.ChangePravila(row, pos, value, coeff)};
  function  changeCoeff (row, pos, coeff, urObr ) {esModel.methods.ChangeCoeff(row, pos,  coeff, urObr)
  };

  function cartesian(arg) {
    var r = [], args = arg;
    args.reduceRight(function(cont, factor, i) {
        return function(arr) {
            for (var j=0, l=factor.length; j<l; j++) {
                var a = arr.slice(); // clone arr
                a[i] = factor[j];
                cont(a);
            }
        };
    }, Array.prototype.push.bind(r))(new Array(args.length));
let t = r.length 
    return r;
}

function SendXmlModelling()
{
 let tempXML = {}
 if(esModel.TM.length == 1 )
 {
   tempXML["TM"]= []
   tempXML["TM"].push(esModel.TM)
 }
 else tempXML["TM"] = esModel.TM
 let pravilaDict = {}
 let pravilaDict1 = {}
 for(let t = 0; t< esModel.pravila_end.length; t++){
let st = ""+t
pravilaDict[st] = esModel.pravila_end[t]
 }
 pravilaDict1 = pravilaDict
 for (var key in pravilaDict)
 {

if(pravilaDict[key] == "")
{pravilaDict[key] = ''
}
pravilaDict['n'+key] = pravilaDict[key]
delete pravilaDict[key]
 }
 tempXML["pravila_end"] = pravilaDict1
 tempXML["pravila_temp"] = pravilaDict
 tempXML["graph"] = esModel.graph
 tempXML["counter"] = esModel.counter
 tempXML["options"] = esModel.options


let tempStructure = {} // esModel.structure
 for (var key in esModel.structure)
 {
   tempStructure['n_'+key] = esModel.structure[key]
 }
 tempXML["structure"] = tempStructure

     const file = new Blob([o2x(tempXML)],{ type: 'text/xml'});
     const zapros = esModel.zapros // {'1':'1.35','2':'1','3':'1'}
     setxmlModeling(file)
    const data = new FormData()
    data.append('zapros', JSON.stringify(zapros))
    data.append('file', file)
    axios.post("https://aesfu.ru/api/study/flm-builder", data, { //https://aesfu.ru/api/study/flm-builder
   })
 .then(res => { 
  console.log(dataS)
if (esModel.regimZaprosa == 1)
  {
    RenderModelingMenu("[" + res.data[0] + ","+res.data[1]+"]")
    

  } 
if (esModel.regimZaprosa == 2)
{

    RenderModelingMenu(esModel.TM[esModel.TM.length-1].termsNames["term"+res.data[0]]+ " с вероятностью " +res.data[1])

}
   

   

  })  

}

 function SaveToXMLOnComputer()
 {
  let tempXML = {}
  if(esModel.TM.length == 1 )
  {
    tempXML["TM"]= []
    tempXML["TM"].push(esModel.TM)
  }
  else tempXML["TM"] = esModel.TM



console.log(esModel.pravila_end)
  let pravilaDict = {}
  let pravilaDict1 = {}
  for(let t = 0; t< esModel.pravila_end.length; t++){
let st = ""+t
pravilaDict[st] = esModel.pravila_end[t]
  }
  pravilaDict1 = pravilaDict
  for (var key in pravilaDict)
  {

if(pravilaDict[key] == "")
{pravilaDict[key] = ''
}
pravilaDict['n'+key] = pravilaDict[key]
delete pravilaDict[key]
  }
  console.log(pravilaDict)
  tempXML["pravila_end"] = pravilaDict1
  tempXML["pravila_temp"] = pravilaDict
  tempXML["graph"] = esModel.graph
  tempXML["counter"] = esModel.counter
  tempXML["options"] = esModel.options


 let tempStructure = {} // esModel.structure
  for (var key in esModel.structure)
  {
    tempStructure['n_'+key] = esModel.structure[key]
  }
  tempXML["structure"] = tempStructure

  const element = document.createElement("a");
  document.body.appendChild(element); 
  
      const file = new Blob([o2x(tempXML)],{ type: 'text/xml'});
      element.href = URL.createObjectURL(file);
      element.download = "myFile654.xml";      
      element.click();
     

 }
 function Pravila(arg)
 {
 let uroven = 0
 let urovniPravil = []
  let okolo = [] 
  okolo.push(<div class = "Blochek">
 
    {Table(esModel, 2,changePravila,changeCoeff,arg)  }
 
    </div>)

  setindexBodyHtml2(okolo)

 }
 function ConsoleXml(xmlStr)
{
console.log(xmlStr)
const a = document.createElement("a");
document.body.appendChild(a); 
a.download = "FLMmodel.xml"
    const file = new File([xmlStr], "FLMmodel.xml",{ type: 'text/xml'});
    sendToServer( file)
} 
function XmlOnServer()
{
//let f = new File("./temp.xml")
const iconv = require('iconv-lite');
const encodedData =  iconv.decode(Buffer.from(xmlFiles), 'utf-8')//windows-1251 //Buffer.from(response.data)
const parser = new XMLParser()
let jObj = parser.parse(encodedData)
console.log(jObj);
/*

const axios = require('axios').default;
axios.get("/xmlS/filedddd.xml", {  
    responseType: 'arraybuffer',
    responseEncoding: 'binary'  

}).then((response) => {


})
.catch((response) => {
  console.log('FAILURE!!'+response);
}); */
}

const changeTermName = event => {    
  input_Name = event.target.value

  if(event.target.name.split("_")[0].match(/[a-zA-Z]+/g)[0] == "termInput")
  {  
    esModel.methods.changeTermName(event.target.name.split("_")[0].match(/\d+/g)[0],event.target.name.split("_")[1],event.target.value)   
  }
};


const ChangeColor = event => 
{
if(event.target.id.split("_")[0].match(/[a-zA-Z]+/g)[0] == 'termInput')
    {  
      esModel.methods.ChangePlotColor( event.target.id.split("_")[0].match(/\d+/g)[0],event.target.id.split("_")[1] - 1,event.target.value)     
    }
};
const DeletePointPlot = event => {  
 if(event.target.id.split("_")[0].match(/[a-zA-Z]+/g)[0] == "termInput"){
 esModel.methods.deletePointplot(event.target.id.split("_")[0].match(/\d+/g)[0],event.target.id.split("_")[1]-1);
}
 }
const changeCoordsValues = event => {  
    input_Name = event.target.name
  if(event.target.id.split("_")[0].match(/[a-zA-Z]+/g)[0] == "termInput"){    
    esModel.methods.changeCoordsValue(event.target.id.split("_")[0].match(/\d+/g)[0],event.target.id.split("_")[1] - 1,event.target.name.split("_")[0],event.target.value)     
    }
  };
  const addNewPointPlot= event => { 
    if(event.target.id.split("_")[0].match(/[a-zA-Z]+/g)[0] == "termInput"){
    esModel.methods.addNewPointPlot(event.target.id.split("_")[0].match(/\d+/g)[0],event.target.id.split("_")[1]-1);        
  }        
  }

const AddNewTerm = event => {esModel.methods.addNewTerm(event.target.id)};
const DeleteTerm = event => {esModel.methods.deleteTerm(event.target.id)};




const RenderOptionsMenu = selectedIndex => {

  let indexB= []
  indexB= ['OPTIONS']
  indexB.push (
    <div>NAME ES:<input class = "EsNameInput"  value = {esModel.options.Name} onInput={esModel.methods.changeEsName} />
    AUTHOR ES:<input class = "EsAuthorInput"   value = {esModel.options.Author}  onInput={esModel.methods.changeEsAuthor} />
   </div>
    )
  setindexBodyHtml2(indexB)

  //
}
const ChangeZapros = selectedIndex => {
  
 // console.log(selectedIndex.target.id + " value = "+String(selectedIndex.target.selectedIndex+1))

 esModel.methods.SetZapros(selectedIndex.target.id, String(selectedIndex.target.selectedIndex+1))
}


//режим вывода в окне моделирования
const ChangeRegimZaprosa = selectedIndex => {
  
  // console.log(selectedIndex.target.id + " value = "+String(selectedIndex.target.selectedIndex+1))
  console.log(selectedIndex.target.value);
  esModel.methods.changeRegimVivoda(selectedIndex.target.value)

 
  //esModel.methods.SetZapros(selectedIndex.target.id, String(selectedIndex.target.selectedIndex+1))
 }
 
const ChangeZaprosInput = selectedIndex => {
  
 //console.log(selectedIndex.target.name+"   "+String(selectedIndex.target.value))
 
  esModel.methods.SetZapros(selectedIndex.target.name, String(selectedIndex.target.value))
 }


  const RenderModelingMenu = data => {
    let indexB= []
    indexB= ['МОДЕЛИРОВАНИЕ']
    console.log(esModel.structure)
     //onChange={}  console.log(esModel.TM[x].name)
     indexB.push(<div><select onChange={ChangeRegimZaprosa} >
      <option value="1">Значение</option>
      <option value="2">Значение+Расшифровка</option> 
    </select>
    </div>);
    
    for(let i =0; i < esModel.structure['input'].length; i++)
    {
      let nameTM = ''
      let number = 0
      
      for(let x = 0; x < esModel.TM.length; x++)
      {
        if(esModel.TM[x].id == String(esModel.structure['input'][i] -1))
        {     
          nameTM += esModel.TM[x].name
          number = x
        }
      }
     

if(esModel.zapros[esModel.structure['input'][i]] == undefined)
      esModel.methods.DefZapros(esModel.structure['input'][i])
        //решаем вывести  выпадающий список или поле ввода
        if (Object.keys(esModel.TM[number].coords[0]).length == 2 )
        {
          indexB.push (        
            <div>ТЕРМ - МНОЖЕСТВО ( {esModel.structure['input'][i]} ) ({nameTM}):
            <select className="custom-select" id={esModel.structure['input'][i]} onChange={ChangeZapros} defaultValue = {esModel.TM[esModel.structure['input'][i]-1].termsNames["term"+esModel.zapros[esModel.structure['input'][i]]]}>
               {Object.values(esModel.TM[number].termsNames).map((option, index) =>
                 <option key={ index} id={option} value = {option}>{option}</option>
              ) }
          </select>
           </div>)
        }
        else {
indexB.push (        
  <div>ТЕРМ - МНОЖЕСТВО ( {esModel.structure['input'][i]} ) ({nameTM}):
 <input type="text" 
            className="form-control" 
            placeholder="..." 
            name ={esModel.structure['input'][i]}
            onChange={ChangeZaprosInput}/ >


 </div>)

        }
     
     
    }    
    
    indexB.push ( <div><button  onClick={SendXmlModelling} > МОДЕЛИРОВАТЬ</button></div>)

    console.log( data)
   if(typeof data == "string")   
    indexB.push (<div>{data} </div>) 
       setindexBodyHtml2(indexB) 
    
    }

const changeSelectedTMName = event => {   
  input_Name = event.target.id
if(event.target.id.split("_")[0].match(/[a-zA-Z]+/g)[0] == "term")
{ 
    esModel.methods.ChangeSelectedTMName(event.target.id.split("_")[1],event.target.value)
}

};  

const RenderSelectedTM = selectedIndex => {
  //console.log(esModel)
  let tm 
  
   tm = selectedIndex
  let arrayTerms =[]
  let temp =[]
  let points4Plots =[]
  let points ;
  inputLevelCounter = 0
  let pravilaButton = []
  
 for(let i = 0; i < esModel.graph.nodes.length;i++)
 {
  if(esModel.graph.nodes[i].id == (selectedIndex+1) && (esModel.graph.nodes[i].color == '#DA70D6' || esModel.graph.nodes[i].color == '#FF0000'))
  {
    pravilaButton = [<button  id = {tm} onClick={RenderPravila}> ПРАВИЛА: </button>]

  }

 }
  for(let i=0; i <esModel.TM.length; i++)  
  {
        if(esModel.TM[i].id == (tm))
    {

      tm = i
    }
  }
 
  
    let nm = "term_"+tm
  temp.push(     <div>

    <div> <label class="myLabel" > ТЕРМ - МНОЖЕСТВО №{tm + 1} </label></div>
     <label class="myLabel" >НАЗВАНИЕ ТМ: </label>
        <input type="text" 
                  value= {esModel.TM[tm].name}
                  className="form-control" 
                  id= {nm}
                  placeholder="..." 
                  onChange={changeSelectedTMName}/ >
                  <div></div>
        <label class="myLabel" > ТЕРМОВ В ТМ:  </label>
        <input type="text" 
                  value= {esModel.TM[tm].termsCount}
                  className="form-control" 
                  placeholder="..." / >
<button id = {tm} onClick={AddNewTerm}> ДОБАВИТЬ ТЕРМ</button>
<button  id = {tm} onClick={DeleteTerm}> УДАЛИТЬ ТЕРМ</button>
{pravilaButton}
<div></div>

    </div>)
    let TMindex = 0
  for(let i=0; i <esModel.TM[tm].coords.length; i++)  
  {
    let j = i + 1
    let stringLabel = "ТЕРМ №" + j
    let stringNameTerm = "termInput"+tm+"_"+j
    points4Plots = []

   for(let j=0; j <Object.keys(esModel.TM[tm].coords[i]).length/2; j++)  
  {   
      let xName = "x"+(j+1)+ "_input"
      let yName = "y"+(j+1)+ "_input"

    points4Plots.push (
    <div>x{j+1}: <input class = "plotInput"  type='number' step="0.1" min='-1000' value = {esModel.TM[tm].coords[i]["x"+(j+1)]}  id = {stringNameTerm} name={xName} onInput={changeCoordsValues} />
     y{j+1}: <input class = "plotInput"  type='number' step="0.1" min='0' value = {esModel.TM[tm].coords[i]["y"+(j+1)]} id = {stringNameTerm} name={yName} onInput={changeCoordsValues} />
   </div>
    )
  
  }
  temp.push(
    <div  class="blockMy">
    <div class="blockMy" >
    <div > {stringLabel} </div><div><input name= {stringNameTerm} value = {esModel.TM[tm].termsNames["term"+(i+1)]} type="text" onInput = {changeTermName}  /> </div>

    <div  class="blockMy"><button onClick={addNewPointPlot} id= {stringNameTerm}>+</button>
    <button onClick={DeletePointPlot} id= {stringNameTerm}>-</button>
    <input type="color" class ="odin" id= {stringNameTerm}  onChange={ChangeColor}  value ={esModel.TM[tm].plotsColors[i]}/></div>
    {points4Plots}  
    </div>    
    </div>  )
    }

temp.push( <div class="Plot">
  <div ></div>
  <div >{App(esModel.TM[tm].coords,esModel.TM[tm].termsCount, 
  esModel.TM[tm].plotsColors)}</div>
  
   </div>)
  let okolo = [] 
  okolo.push(<div class = "Blochek">
  {temp}
    </div>)
  setindexBodyHtml2(okolo)
inputLevelCounter++
/* <div class = "Razrez" >. </div>*/
}

function GoToPravila(index)
{
esModel.pravilaMode = index

}

const RenderPravila = (events) => {
  GoToPravila(1)
  setEsModel(esModel)
  
   let uroven  
   if(events.target == undefined)
   uroven = events
   else uroven = Number(events.target.id)+1


   console.log(uroven)
 Pravila(uroven)
  }
function sendToServer(file)
{
const data = new FormData()
data.append('file', file)
axios.post("http://localhost:8000/upload", data, { 
   // receive two    parameter endpoint url ,form data
})
.then(res => { // then print response status
  XmlOnServer()
setXmlName( ""+xmlFiles.name)
})
}





 const handleSubmit =(event) => {

event.preventDefault();

const iconv = require('iconv-lite');
const fileToArrayBuffer = require('file-to-array-buffer')
const reader = new FileReader()
var encodedData = ""

const parser = new XMLParser()
reader.readAsText(xmlFiles)
reader.onload = _event => {
    const content = _event.target.result
    let jObj = parser.parse(content)
    
    console.log(jObj)
    if(jObj.TM.length == undefined)
  {esModel.TM =[]
   esModel.TM[0] = jObj.TM
  }
  else   esModel.TM = jObj.TM

  esModel.graph= jObj.graph
  esModel.counter = jObj.counter
  esModel.options = jObj.options
  let tempStructure = {}
  for (let i =0; i < Object.keys(jObj.structure).length; i++)
  {   
  tempStructure[Object.keys(jObj.structure)[i].split('_')[1]] = jObj.structure[Object.keys(jObj.structure)[i]]
  }
  
  esModel.structure = tempStructure
  esModel.pravila_end = []//jObj.pravila_end
  for (let i =0; i < Object.keys(jObj.pravila_temp).length; i++)
  {   
    esModel.pravila_end[i] = jObj.pravila_temp['n'+(i)]
  }
  setEsModel(esModel)  
  RenderOptionsMenu()
    // Do the parsing with content
} 
  }
  const handleFileSelect = (event) => {
    setXmlFiles(event.target.files[0])
  }
let inp_termMn_1 = 8;
/*
<button  onClick={ConsoleXml}> XML</button>
    <button  onClick={SaveModelToXML}> TO XML</button>
    <input type="file" id="myFile" onChange={(e)=>UploadXML(e)} />
*/
  return (    
    <div>
    <button  onClick={SaveToXMLOnComputer} >SAVE MODEL TO COMPUTER</button>
    <button  onClick={esModel.methods.ChangeX} >SORT</button>    
    <button  onClick={RenderOptionsMenu} >OPTIONS</button>
    <button  onClick={RenderModelingMenu} > MODELING</button> 
    <input type="file" onChange={handleFileSelect}/>
    <button type="button"  onClick={handleSubmit}> Загрузить  </button> 
     
     
  <div class="Blochek" > <Graph id="graph" getNetwork={(network) => 
   {networks.network= network
  setNetwork(networks)
  }}
   graph={esModel.graph} options={options} events={esModel.events} style={{ width: "800px", height: "600px",position: "absolute",right: "0",border: "solid" }} /></div>
    <div class="blockMy" >   {indexBodyHtml2}
    
     </div >    
     </div>     
      );
}ReactDOM.render(<FlmTree />, document.getElementById("root"));



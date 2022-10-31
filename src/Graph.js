
const ReadOnlyRow = ({ stroke,  array,change, urovenPravil, index, pravila, changeCoeff }) => {
    const [graphStaet, setGraphState] = useState({
        counter:0,
        counter2:12,
        counter3:20,
        graph: {
          nodes: [
            { x: 1, y: 1, id: 7, font: { size: 10 }, size: 30, label: "Пройденные операции (3)", title: "Регистрация\nРегистрация/Багаж\nРегистрация/Багаж/Предполетный досмотр", shape: 'dot', physics: 'false', group:1 },        
            { x: 1, y: 1, id: 8, font: { size: 10 }, size: 30, label: "Тип рейса (2)", title: "Внутренний\nМеждународный", shape: 'dot', physics: 'false', group:1 },
            { x: 1, y: 1, id: 11, font: { size: 10 }, size: 30, label: "Промежуточный-1 (2)", title: "Терм-1\nТерм-2", shape: 'dot', physics: 'false', group:2 },
            { x: 1, y: 1, id: 12, font: { size: 10 }, size: 30, label: "Промежуточный-2 (2)", title: "Терм-1\nТерм-2", shape: 'dot', physics: 'false', group:2 },        
            { x: 1, y: 1,id: 9, font: { size: 10 }, size: 30, label: "Наличие иждивенцев (2)", title: "Дети\nИнвалиды", shape: 'dot', physics: 'false', group: 1 },
            { x: 1, y: 1,id: 6, font: { size: 10 }, size: 30, label: "Время до вылета (3)", title: "Мало\nНормально\nМного", shape: 'dot', physics: 'false', group: 1 },        
            { x: 1, y: 1,id: 21, font: { size: 10 }, size: 30, label: "Пункт назначения (6)", title: "Стойка регистрации\nПредполетный досмотр\nУпаковка багажа\nПолиция\nТуалеты\nКомната матери и ребенка", shape: 'dot', physics: 'false', group: 3 }
          ],
          edges: [
            { from: 6, to: 11 },
            { from: 7, to: 11 },
            { from: 8, to:11 },
            { from: 9, to:11 },
            { from: 6, to: 12 },
            { from: 7, to: 12 },
            { from: 8, to:12 },
            { from: 9, to:12 },
            { from: 11, to:21 },
            { from: 12, to:21 },
          ]
        },
        events: {
          click: ({ nodes, edges }) => {
           
            console.log(nodes);
         
          },
          doubleClick: ({ pointer: { canvas } }) => {
            /* createNode(canvas.x, canvas.y);*/
          },
    
          showPopup: ({ nodes, edges }) => {
            console.log(nodes);
          },
        }
      });
    const options =  {
        interaction: {
          hover: true,
          tooltipDelay: 10,
          selectable: true,
    
          multiselect: true,
          dragView: true
    
        },
        manipulation: {
          enabled: true,
        },
        layout: {
          hierarchical: {
            enabled: true,
            direction: 'UD',
            sortMethod: 'directed',
            levelSeparation: 180
          }
        },
        edges: {
          color: "#000000"
        },
      };
    
<Graph id="graph" graph={state.graph} options={options} events={events} style={{ width: "640px", height: "480px" }} />


}
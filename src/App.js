import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { Container,Col,Row, Button} from 'react-bootstrap';
import memoize from 'memoize-one';
import { Chart } from 'react-charts'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const { generateModel } = require('fake-data-generator')
// Requires a model
const model = require('./models/employee')
const amountArg = 100000
const modelArg = model
const inputType = 'object'
const outputType = 'object'
var generatedModel =[];
const data=[];
const axes = [
  { primary: true, type: 'ordinal', position: 'left' },
  { position: 'bottom', type: 'linear', stacked: true  }
]

const series = {
    type: 'bar'
  }
const columns =[
  {
    name: 'ID',
    selector: 'ID',
    sortable: true,
  },
  {
    name: 'Job Title',
    selector: 'JobTitle',
    sortable: true,
  },
  {
    name: 'Email Address',
    selector: 'EmailAddress',
    sortable: true,
  },
  {
    name: 'Name',
    selector: 'Name',
    sortable: true,
  },
  {
    name: 'Country',
    selector: 'Country',
    sortable: true,
  },
  {
    name: 'Salary in Q1',
    selector: 'SalaryQ1',
    sortable: true,
  },
  {
    name: 'Salary in Q2',
    selector: 'SalaryQ2',
    sortable: true,
  },
  {
    name: 'Salary in Q3',
    selector: 'SalaryQ3',
    sortable: true,
  },
  {
    name: 'Salary in Q4',
    selector: 'SalaryQ4',
    sortable: true,
  },
  {
    name: 'Total Salary',
    selector: 'SalaryQ4',
    sortable: true,
  },
  {
    name: 'Total Hours',
    selector: 'SalaryQ4',
    sortable: true,
  },
  {
    cell: row  =>  <Popup trigger={<Button variant="primary" color="primary">View</Button>} position="right center" modal><div className="popup">{row.Name }<Chart data={{"lable" : "Salary VS Working hour","data"  : [[row.SalaryQ1, row.WorkingHourQ1], [row.SalaryQ2, row.WorkingHourQ2], [row.SalaryQ3, row.WorkingHourQ3], [row.SalaryQ4, row.WorkingHourQ4]]}} series={series} axes={axes} tooltip /></div></Popup>,
    button: true,
  },
  {
    cell: row  => <Button  data-type={row} variant="secondary" color="primary">Edit</Button>,
    button: true,
  },
  {
    cell: row  => <Button  data-type={row} variant="danger" color="primary">Delete</Button>,
    button: true,
  },
  
]


//declare search
const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
        columns={columns}
        columns={columns}
  .add('Show Table Head', () => <ProgressPendingIndeterminateHeader />);
    cursor: pointer;
  }
`;
const ClearButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  .add('Show Table Head', () => <ProgressPendingIndeterminateHeader />);
  .add('Server-Side', () => <SortingServerSide />);
        columns={columns}
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField id="search" type="text" placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={onFilter} />
    <ClearButton type="button" onClick={onClear}>X</ClearButton>
  </>
);




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {data: [],chartdata:[]};
  
 
    }
  
  _renderCounter = () => () => {
    const [hideDirector, setHideDirector] = React.useState(false);
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = this.state.data.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
  
   this.state.subHeaderComponentMemo = React.useMemo(() => {
      const handleClear = () => {
        if (filterText) {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText('');
        }
      };
      return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
    }, [filterText, resetPaginationToggle]);
  
   
  }

  

  

 randomizedata(){
  generatedModel=generateModel({ amountArg, modelArg, inputType, outputType });
  console.log(generatedModel);
  let tempchart=[];
 
  this.setState({data: generatedModel});

}
  render(props) {
  
const MyInlineHook = this._renderCounter();


  return (
    
    <div className="App">
<p></p>
      <Container>
  <Row>
  <Col xs={12}>
       
        <Button variant="success" onClick={this.randomizedata.bind(this, "Goal")}>
          Randomize Data
        </Button>

        <DataTable
        title="Emplyee List"
        columns={columns}
        data={this.state.data}
        pagination={true}
        subHeader={true}
        subHeaderComponent={this.state.subHeaderComponentMemo}
      />
      </Col>
      </Row>
      </Container>
    </div>
  );
}
}
export default App;



import { CCard } from '@coreui/react';
import { CCardBody } from '@coreui/react';
import { CCardTitle } from '@coreui/react';
import { CCardSubtitle } from '@coreui/react';
import { CCardText } from '@coreui/react';
import { CCardLink } from '@coreui/react';
import moment from 'moment'

import DoneAllIcon from '@material-ui/icons/DoneAll';
import EditIcon from '@material-ui/icons/Edit';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';

const Card = (props) => {
    const divStyle = {
        display: 'flex',
        justifyContent : 'space-between'     
    };
    const current = new Date();
    const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;
    const timeEnd = moment(props.dueDate);
    const startDate = moment(date);
    const estimate = parseInt(timeEnd.diff(startDate) / (3600000*24));
    const str = "days";
     
    return (
      <>
            <CCard style={{ width: '18rem' }}>
                <CCardBody>
                    
                    <CCardTitle>{props.title }</CCardTitle>

                    <div style={divStyle}>

                        <CCardSubtitle className="mb-2 text-medium-emphasis">Category</CCardSubtitle>
                        <CCardSubtitle className="mb-2 text-medium-emphasis">{props.category }</CCardSubtitle>
                    </div>
                    <div style={divStyle}>

                        <CCardSubtitle className="mb-2 text-medium-emphasis">Due Date</CCardSubtitle>
                        <CCardSubtitle className="mb-2 text-medium-emphasis">{moment(props.dueDate).format("DD/MM/YYYY")}</CCardSubtitle>
                    </div>
                    <div style={divStyle}>

                        <CCardSubtitle className="mb-2 text-medium-emphasis">Estimate</CCardSubtitle>
                        <CCardSubtitle className="mb-2 text-medium-emphasis">{estimate + " " + str}</CCardSubtitle>
                    </div>
                    <div style={divStyle}>

                        <CCardSubtitle className="mb-2 text-medium-emphasis">Importance</CCardSubtitle>
                        {props.importance == 'Medium' && 
                            <CCardSubtitle className="mb-2 text-medium-emphasis" style={{ background: 'yellow' }}>{props.importance}</CCardSubtitle>}
                        {props.importance == 'low' && 
                            <CCardSubtitle className="mb-2 text-medium-emphasis" style={{ background: 'blue' }}>{props.importance}</CCardSubtitle>}
                        {props.importance == 'High' && 
                            <CCardSubtitle className="mb-2 text-medium-emphasis" style={{ background: 'red' }}>{props.importance}</CCardSubtitle>}
           
                    </div>

                    {(props.type=='To Do') &&
                        <div style={divStyle}>
                            <IconButton aria-label="start" onClick={() => props.startTodo(props.id,"Doing")}>
                                <PlayCircleOutline />
                            </IconButton>

                            <IconButton aria-label="edit" onClick={() => props.editTodo(props.id)}>
                           
                                <EditIcon   />
                            </IconButton>
                    </div>      
                    }

                    {(props.type=="Doing")&&
                        <div style={divStyle}>
                            <IconButton aria-label="done" onClick={() => props.doneTodo(props.id,"Done")}>
                                <DoneAllIcon />
                            </IconButton>

                            <IconButton aria-label="edit" onClick={() => props.editTodo(props.id)}>
                                <EditIcon />
                            </IconButton>
                        
                    </div>
                    }
                   
                </CCardBody>
            </CCard>
            
            
        </>

    );
};

export default Card;
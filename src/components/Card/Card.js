import { CCard } from '@coreui/react';
import { CCardBody } from '@coreui/react';
import { CCardTitle } from '@coreui/react';
import { CCardSubtitle } from '@coreui/react';
import { CCardText } from '@coreui/react';
import { CCardLink } from '@coreui/react';
import Done from '@material-ui/icons/Done';
import List from '@material-ui/icons/List';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';

const divStyle = {
    display: 'flex',
    alignItems: 'center'
  };

const Card = (props) => {

    
    return (
      <>
            <CCard style={{ width: '18rem' }}>
                <CCardBody>
                    <div style={divStyle}>

                        {props.text=="Done" &&
                            
                            <Done></Done>
                        }
                        {props.text=="To Do" &&
                            <List></List>
                        }
                        {props.text=="Doing" &&
                            <PlaylistAddCheck></PlaylistAddCheck>
                        }
                    
                    <h5 >{props.text}</h5>
                        
                </div>
                
                </CCardBody>
            </CCard>
            
            
        </>

    );
};

export default Card;
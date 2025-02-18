import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Icon from '../UndrawDesigner/IconSVG'
import diseseaApi from '../../../api/diseseaApi'
import TimelineDot from './TimelineDot'
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));
//<Icon.LaIcon /><Icon.HatIcon /><Icon.ThanIcon /><Icon.ReIcon />
/*<TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              LÁ
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="secondary">
              <Icon.LaIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography>Because you need strength</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant="body2" color="textSecondary">
              10:00 am
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot className="blue lighten-2">
              <Icon.ThanIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Code
              </Typography>
              <Typography>Because it&apos;s awesome!</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className="lime lighten-3">
             <Icon.HatIcon/>
            </TimelineDot>
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Sleep
              </Typography>
              <Typography>Because you need rest</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className="yellow lighten-3">
            <Icon.ReIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Repeat
              </Typography>
                <Typography>Because this is the life you love! {props.uri_benh}</Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
const vitri = ()=>{ let vitri = [{icon : <Icon.LaIcon /> , op: ['Bẹ lá' , 'Lá', 'Chóp lá', 'Phiến lá'] },
                    {icon:'Than' , op: ['Thân'] },
                    {icon:'Hat' ,  op: ['Vỏ hạt','Hạt'] },
                    {icon: 'Re', op: ['Rễ'] },
                    {icon:'Quan the', op: ['Quần thể'] },
                    {icon:'Bong', op: ['Bông','Cổ bông'] }]
                    return vitri
                  }*/

export default function CustomizedTimeline(props) {
  const classes = useStyles();
  const [trieuchung, settrieuchung] = useState([])
  useEffect(() => {
    const fetchTrieuChung = async ()=>{
      try {
        const respose = await diseseaApi.getTrieuChung({uri_benh: props.uri_benh})
        settrieuchung(respose)
      } catch (error) {
      }
    }
    fetchTrieuChung()
  }, [props.uri_benh])
  if(trieuchung.length > 0) {
    return (
      <Timeline align="alternate" className="pt-4">
        {
          trieuchung.map((x,key)=>{
            return(
              <TimelineItem key={key}>
                <TimelineOppositeContent>
                  <Typography variant="body2" color="textSecondary">
                    {x.vitri.value}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot option={x.vitri.value.toLowerCase()}/>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography>{x.ten_trieuchung.value}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>

            )
          })
        }
      </Timeline>
    );
  }else{
    return(
      <>
      </>
    )
  }
}

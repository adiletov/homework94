import React, {Component} from 'react';
import {connect} from "react-redux";
import {getPublications} from "../../Store/Action/actionPublications";
import CardPublication from "../../Component/Card/Card";
import Grid from "@material-ui/core/Grid";

class PublicationPage extends Component {
    componentDidMount() {
        this.props.getPublications()
    }
    cardPublication = (publications) => {
       if (!publications[0]){
           return <Grid item xs>
                No publications
           </Grid>
       }else{
           return  <Grid container spacing={1} direction="column">
               {publications && publications.map(obj =>
                   <CardPublication
                       key={obj._id}
                       publications={obj}
                   />
               )}
           </Grid>
       }
    };
    render() {
        return (
            <>
                {this.props.user ?
                    this.cardPublication(this.props.publicationsId) :
                    this.cardPublication(this.props.publications)
                }
            </>
        );
    }
}

const mapStateToProps = state => ({
    publications: state.publications.publications,
    publicationsId: state.publications.publicationsId
});
const mapDispatchToProps = dispatch => ({
    getPublications: () => dispatch(getPublications()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicationPage);
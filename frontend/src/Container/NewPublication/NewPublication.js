import React, {Component} from 'react';
import {Container} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormElement from "../../Component/FormElement/FormElement";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {addPublication, getTags} from "../../Store/Action/actionPublications";
import Alert from "@material-ui/lab/Alert";

class NewPublication extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        tags: '[]',
    };

    componentDidMount() {
        this.props.getTags()
    }

    inputChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };
    fileChangeHandler = (e) => {
        this.setState({[e.target.name]: e.target.files[0]})
    };
    tagsChangeHandler = (e, tags) => {
        this.setState({tags: JSON.stringify(tags)})
    };
    submitChangeHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key])
        });
        this.props.addPublication(formData);
    };
    errorChangeHandler = (fieldName) =>{
        return this.props.error &&
            this.props.error.errors &&
            this.props.error.errors[fieldName].message
    };
    render() {
        return (
            <Container>
                <form onSubmit={this.submitChangeHandler}>
                    <Grid container direction="column">
                        <Grid item xs>
                            <FormElement
                                type="text"
                                value={this.state.title}
                                propertyName="title"
                                title="Заголовок"
                                onChange={this.inputChangeHandler}
                                error={this.errorChangeHandler('title')}
                            />
                        </Grid>
                        <Grid item xs>
                            <FormElement
                                type="text"
                                value={this.state.description}
                                propertyName="description"
                                title="Описание"
                                onChange={this.inputChangeHandler}
                            />
                        </Grid>
                        <Grid item xs>
                           {this.props.error && <Alert severity="error">{this.props.error.errors.image.message}</Alert>}
                            <FormElement
                                type="file"
                                propertyName="image"
                                onChange={this.fileChangeHandler}
                            />
                        </Grid>
                        <Grid item xs>
                            <FormElement
                                propertyName="tags"
                                title="Tags"
                                tags={this.props.tags}
                                value={JSON.parse(this.state.tags)}
                                onChange={this.tagsChangeHandler}
                                type="tags"
                            />
                        </Grid>
                        <Grid item xs>
                            <Button color="primary" type="submit">Добавить</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    error: state.publications.addPubError,
    tags: state.publications.tags
});
const mapDispatchToProps = dispatch => ({
    addPublication: (publication) => dispatch(addPublication(publication)),
    getTags: () => dispatch(getTags())
});
export default connect(mapStateToProps, mapDispatchToProps)(NewPublication);
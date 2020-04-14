import React from 'react';
import TextField from "@material-ui/core/TextField";
import PropTypes from 'prop-types';
import FileInput from "../FileInput/FileInput";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";


const FormElement = (props) => {
       let inputComponent = (<TextField
            fullWidth
            id={props.propertyName}
            name={props.propertyName}
            type={props.type}
            error={!!props.error}
            label={props.title}
            variant="outlined"
            required={props.required}
            value={props.value}
            autoComplete={props.autoComplete}
            helperText={props.error}
            onChange={props.onChange}
        />);
    if (props.type === 'file') {
        inputComponent = (
            <FileInput
                label={props.title}
                name={props.propertyName}
                onChange={props.onChange}
            />
        )
    }
    if (props.type === 'tags'){
        inputComponent =  (
            <Autocomplete
            multiple
            id="tags-filled"
            options={props.tags}
            value={props.value}
            onChange={props.onChange}
            freeSolo
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
            }
            renderInput={(params) => (
                <TextField {...params} variant="filled" label={props.title} placeholder="Favorites" />
            )}
        />)
    }
       return inputComponent;
};
FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    title: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    helperText: PropTypes.string,
    label: PropTypes.string,
    tags:  PropTypes.arrayOf(PropTypes.string)
};

export default FormElement;
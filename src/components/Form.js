import React, { useState } from 'react';
import Error from './Error';

const Form = ({saveInput}) => {
    const [search, saveSearch] = useState('');
    const [error, saveError] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        // Validate form
        if(search === '') {
            saveError(true);
            return;
        }
        saveError(false);

        // Send the search to main component
        saveInput(search);
    }
    return ( 
        <form
            onSubmit={handleSubmit}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search an image, example: football or coffee"
                        onChange={e => saveSearch(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Search"
                    />
                </div>
            </div>
            { error ? <Error message="You must enter something in the search field" /> : null }
        </form>
    );
}
 
export default Form;
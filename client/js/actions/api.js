export const API_ERROR = 'API_ERROR';

export const error = _error=>{
    return {
        type:API_ERROR,
        error:_error
    }
};

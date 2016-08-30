import actions from './actions';

let initialWordState = {

};

let wordReducer = (state, action) => {
  state = state || initialWordState;

  if ( action.type === actions.GET_PAIR ) {
    return Object.assign( {}, state, {
    	action.word
    });
  } 

    return Object.assign( {}, state, {

    } );
    return state;
};


export default wordReducer;
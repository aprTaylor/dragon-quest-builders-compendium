// @flow
import type { GetState, Dispatch } from '../reducers/types';

export const ACTIONS = {
  LOAD: "Load"
}
/*
export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
*/
export function load(data: any) {
  return (dispatch: Dispatch, getState: GetState) => {
    console.log("Call action load", data);
    dispatch({
      type: ACTIONS.LOAD,
      payload: processData(data)
    });
  };
}


const processData = (data) => {
  data.Rooms = processRooms(data.Rooms);
  return data;
}

const processRooms = (rooms) => {
  const states = {
    CAT: "CAT",
    TITLE: "TITLE",
    DET: "DETAILS",
    END: "END"
  }
  let last = null;
  let state = states.CAT;
  let cat = null;
  let title = "";
  let processed = {};
  let item = {};

  const nextState = (rows, i) => {
    last = state;
    const next = (i !== rows.length-1) && rows[i+1];
    if(next && next.meta === "cat") state = states.CAT;
    else if(next && next.meta === "yes") state = states.TITLE;
    else if(next && next.meta === "end") state = states.END;
    else state = states.DET;
    if(i < 5) console.log("nextState", i, rows[i], next, state)
  }

  rooms.forEach((row, i, rows) => {
    if(i < 5) console.log("LOG", row, i, state, last)
    switch(state) {
      case states.CAT:
        item = {};
        title = row.Title
        processed[title] = [];

        nextState(rows, i);
        break;
      case states.TITLE:
        item = {
          title: row.Title,
          desc: [],
          types:[]
        }
        item = addDetails(item, row, i);
        processed[title].push(item);

        nextState(rows, i);
        break;
      case states.DET:

        item = addDetails(item, row, i);

        nextState(rows, i);
        break;
      case states.END:
        break;
    }
  })
  return processed;
} 

//Add fields to the item object
const addDetails = (item, row, i, count = 1) => {
  const str = "Type "+count;

  //Add description once, if not title
  if(count === 1 && row.meta !== "yes" && row.Title) {
    if(row.Title.includes("DLC")) item.dlc = row.Title.splice()
    else item.desc.push(row.Title);
  }
  //There are details for type to add
  if(row[str]) {
    if(!item.types[count-1]) item.types[count-1] = [];
    item.types[count-1].push({
      object: row[str],
      count: row["count"+count]
    })
    return addDetails(item, row, i, ++count)
  }
  else return item;
  
} 
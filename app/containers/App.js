// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import xlsxParser from 'xlsx-parse-json';
const fs = require('fs');
import { load as aLoad } from '../actions/data'


type Props = {
  load: Function,
  children: React.Node
};

class App extends React.Component<Props> {
  props: Props;

  constructor(props:Props){
    super(props);
    loadData(props.load);
  }

  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}

const mapDispatch = (dispatch:Function) => ({
  load: (data) => dispatch(aLoad(data))
})

export default connect(null, mapDispatch)(App)

function loadData(load: Function) {
  var myFile = __dirname+'/containers/sample.xlsx';
  var ab = fs.readFileSync(myFile).buffer;
  console.log("Begin Load...");

  xlsxParser.onFileSelection(new Blob([ab]))
  .then(data => {
    load(data)
  })
  .catch(err => console.error("ERROR", err))
  .finally(() => console.log("...End Load"))
}




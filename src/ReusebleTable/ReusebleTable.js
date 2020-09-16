import React from "react";
import template from "./ReusebleTable.jsx";

class ReusebleTable extends React.Component {
  constructor(props) {
    super(props);
    this.timer;
    this.state = {
      data: [],
      tableData: [],
      perpage: 5,
      currPage: 1,
      totalPages: 0,
      isSearching: false,
      formated24Hours: [],
    };
    this.fnPrepareData = this.fnPrepareData.bind(this);
  }
  /*this is used to collect the data at every loading */
  static getDerivedStateFromProps(props, state) {
    if (
      props.data &&
      props.data.length > 5 &&
      !state.isSearching &&
      state.tableData.length == 0
    ) {
      return {
        data: props.data,
        formated24Hours: props.data,
        tableData: props.data.slice(0, 5),
        totalPages: Math.ceil(props.data.length / 5),
      };
    }
    return null;
  }

  /*this method is used to jump a page from current page*/
  fnGoPage() {
    const { goPageRef } = this.refs;
    let goPageNo = parseInt(goPageRef.value);
    this.setState(
      {
        currPage: goPageNo,
      },
      this.fnPrepareData
    );
  }

  render() {
    return template.call(this);
  }

  /*this method is usesd to go previous page from current page*/
  prev() {
    const { currPage } = this.state;
    if (currPage == 1) return;

    this.setState(
      {
        currPage: currPage - 1,
      },
      this.fnPrepareData
    );
  }

  /*this method is usesd to go next page from current page*/
  next() {
    const { currPage, totalPages } = this.state;
    if (currPage == totalPages) return;
    this.setState(
      {
        currPage: currPage + 1,
      },
      this.fnPrepareData
    );
  }

  /*this method is used to preare the data to the table at the time of using pagination*/
  fnPrepareData() {
    const { perpage, currPage } = this.state;
    let end = perpage * currPage;
    let start = end - perpage;
    let data = this.state.data.slice(start, end);
    this.setState({
      tableData: data,
    });
  }

  /*this method is take time input from the fnDateFormatChange method and format and convert the 24 Hours time to 12 Hours Format */
  tConvert(time, format) {
    if (format == 12) {
      let timeArr = time.split(":");
      let hours = timeArr[0];
      let _ext = "AM";
      if (hours >= 12) {
        hours = timeArr[0] % 12;
        _ext = "PM";
      }
      return hours + ":" + timeArr[1] + ":" + timeArr[2] + " " + _ext;
    } else {
    }
  }

  /*this is used to change the time format in  the table data*/
  fnDateFormatChange(eve) {
    debugger;
    let timeFormat = eve.target.value;
    let data = [];
    if (timeFormat == 12) {
      data = this.state.data.map((obj) => {
        let _obj = Object.assign({}, obj);
        let _date = obj.createdDate;
        let _dateArr = _date.split("T");
        let _time = _dateArr[1];
        let _timeArr = _time.split(".");
        _time = this.tConvert(_timeArr[0], 12) + "." + _timeArr[1];
        _date = _dateArr[0] + "T" + _time;
        _obj.createdDate = _date;
        return _obj;
      });
    } else {
      data = this.state.formated24Hours;
    }

    this.setState({
      data: data,
      tableData: data.slice(0, 5),
      totalPages: Math.ceil(data.length / 5),
      currPage: 1,
      isSearching: true,
    });
  }

  /* this method is used to search records from the table */
  fnSearch = () => {
    const { data } = this.props;
    const { serachText, dropdownRef } = this.refs;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      let text = serachText.value;
      let serachData = data.filter((obj) => {
        return obj.id.includes(text);
      });

      this.setState({
        data: serachData,
        formated24Hours: serachData,
        tableData: serachData.slice(0, 5),
        totalPages: Math.ceil(serachData.length / 5),
        currPage: 1,
        isSearching: true,
      });
      dropdownRef.value = "24";
    }, 500);
  };

  /* this method is used to sort the table data in ascending order by using date  */
  fnAsc() {
    let sortData = this.state.data.sort((obj1, obj2) => {
      return obj1.createdDate > obj2.createdDate ? -1 : 1;
    });
    this.setState({
      data: sortData,
      tableData: sortData.slice(0, 5),
      totalPages: Math.ceil(sortData.length / 5),
      currPage: 1,
    });
    let AscButton = document.getElementById("Asc");
    AscButton.disabled = true;
    let DecButton = document.getElementById("Dec");
    DecButton.disabled = false;
  }
  /* this method is used to sort the table data in decending order by using date  */
  fnDec() {
    debugger;
    let sortData = this.state.data.sort((obj1, obj2) => {
      return obj1.createdDate > obj2.createdDate ? 1 : -1;
    });
    this.setState({
      data: sortData,
      tableData: sortData.slice(0, 5),
      totalPages: Math.ceil(sortData.length / 5),
      currPage: 1,
    });
    let AscButton = document.getElementById("Asc");
    AscButton.disabled = false;
    let DecButton = document.getElementById("Dec");
    DecButton.disabled = true;
  }
}

export default ReusebleTable;

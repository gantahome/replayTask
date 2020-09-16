import "./ReusebleTable.css";
import React from "react";

function template() {
  const { currPage } = this.state;
  return (
    <div className="reuseble-table">
      <select
        onChange={this.fnDateFormatChange.bind(this)}
        className="form-control marginElement"
        ref="dropdownRef"
      >
        <option value="24">24 Hours Format</option>
        <option value="12">12 Hours Format</option>
      </select>

      <table className="table table-bordered">
        <tbody>
          <tr>
            <td>
              ID
              <input
                className="form-control"
                ref="serachText"
                placeholder="search"
                onChange={this.fnSearch.bind(this)}
              />
            </td>
            <td>Role</td>
            <td>
              Date-time-local{" "}
              <input
                className="btn btn-primary"
                type="button"
                value="asc"
                id="Asc"
                onClick={this.fnAsc.bind(this)}
              />{" "}
              <input
                className="btn btn-primary"
                type="button"
                value="dec"
                id="Dec"
                onClick={this.fnDec.bind(this)}
              />
            </td>
            <td>First Name</td>
            <td>Last Name</td>
          </tr>
          {this.state.tableData.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.id}</td>
                <td>{value.role}</td>
                <td>{value.createdDate}</td>
                <td>{value.firstName}</td>
                <td>{value.lastName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* pagination   code */}
      <div className="page">
        <span>
          <input type="text" ref="goPageRef" />
          <input
            className="btn btn-primary"
            type="button"
            value="go"
            onClick={this.fnGoPage.bind(this)}
          />
        </span>
        <span>
          <input
            className="btn btn-primary"
            type="button"
            value="prev"
            id="Prev"
            onClick={this.prev.bind(this)}
          />
          {currPage}
          <input
            className="btn btn-primary"
            type="button"
            value="next"
            onClick={this.next.bind(this)}
          />
        </span>
        <span>Total Pages:{this.state.totalPages}</span>
      </div>
    </div>
  );
}

export default template;

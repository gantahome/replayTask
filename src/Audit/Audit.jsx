import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../_actions";

import { Navbar, Nav, Pagination } from "react-bootstrap";
import ReusableTable from "../ReusebleTable/index";

class Auditpage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleDeleteUser(id) {
    debugger;
    return (e) => this.props.deleteUser(id);
  }

  fnDateFormatChange() {
    alert("ss");
  }

  render() {
    debugger;
    const { user, users } = this.props;

    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand></Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="#features">Auditor</Nav.Link>
            <Nav.Link>
              {" "}
              <Link to="/login">Logout</Link>
            </Nav.Link>
          </Nav>
        </Navbar>
        <div className="col-md-9 col-md-offset-1">
          <h1>Hi {user.firstName}!</h1>
          <p>You're logged in with React!!</p>
          <h3>All login audit :</h3>

          <ReusableTable
            data={users.items}
            delete={this.handleDeleteUser.bind(this)}
          />
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

const connectedAuditPage = connect(mapState, actionCreators)(Auditpage);
export { connectedAuditPage as Auditpage };
